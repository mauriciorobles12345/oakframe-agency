"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

interface RotatingEarthProps {
  width?: number
  height?: number
  className?: string
  dotColor?: string
  lineColor?: string
  oceanColor?: string
}

export default function RotatingEarth({
  width = 600,
  height = 600,
  className = "",
  dotColor = "rgba(125,223,255,0.5)",
  lineColor = "rgba(125,223,255,0.15)",
  oceanColor = "#070707",
}: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    if (!context) return

    const containerWidth = Math.min(width, window.innerWidth - 40)
    const containerHeight = Math.min(height, containerWidth)
    const radius = Math.min(containerWidth, containerHeight) / 2.2

    const dpr = window.devicePixelRatio || 1
    canvas.width = containerWidth * dpr
    canvas.height = containerHeight * dpr
    canvas.style.width = `${containerWidth}px`
    canvas.style.height = `${containerHeight}px`
    context.scale(dpr, dpr)

    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90)

    const path = d3.geoPath().projection(projection).context(context)

    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point
      let inside = false
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i]
        const [xj, yj] = polygon[j]
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside
        }
      }
      return inside
    }

    const pointInFeature = (point: [number, number], feature: GeoJSON.Feature): boolean => {
      const geometry = feature.geometry as GeoJSON.Polygon | GeoJSON.MultiPolygon
      if (geometry.type === "Polygon") {
        const coords = geometry.coordinates as number[][][]
        if (!pointInPolygon(point, coords[0])) return false
        for (let i = 1; i < coords.length; i++) {
          if (pointInPolygon(point, coords[i])) return false
        }
        return true
      } else if (geometry.type === "MultiPolygon") {
        const coords = geometry.coordinates as number[][][][]
        for (const polygon of coords) {
          if (pointInPolygon(point, polygon[0])) {
            let inHole = false
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) { inHole = true; break }
            }
            if (!inHole) return true
          }
        }
        return false
      }
      return false
    }

    const generateDotsInPolygon = (feature: GeoJSON.Feature, dotSpacing = 16) => {
      const dots: [number, number][] = []
      const bounds = d3.geoBounds(feature as GeoJSON.GeoJsonObject & d3.ExtendedFeature)
      const [[minLng, minLat], [maxLng, maxLat]] = bounds
      const stepSize = dotSpacing * 0.09
      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point: [number, number] = [lng, lat]
          if (pointInFeature(point, feature)) dots.push(point)
        }
      }
      return dots
    }

    interface DotData { lng: number; lat: number }
    const allDots: DotData[] = []
    let landFeatures: GeoJSON.FeatureCollection | null = null

    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight)
      const currentScale = projection.scale()
      const sf = currentScale / radius

      // Ocean
      context.beginPath()
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI)
      context.fillStyle = oceanColor
      context.fill()

      // Globe border glow
      context.beginPath()
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI)
      context.strokeStyle = "rgba(125,223,255,0.12)"
      context.lineWidth = 1.5 * sf
      context.stroke()

      if (landFeatures) {
        // Graticule
        const graticule = d3.geoGraticule()
        context.beginPath()
        path(graticule())
        context.strokeStyle = lineColor
        context.lineWidth = 0.5 * sf
        context.globalAlpha = 1
        context.stroke()

        // Land outlines
        context.beginPath()
        landFeatures.features.forEach((feature) => path(feature))
        context.strokeStyle = "rgba(125,223,255,0.25)"
        context.lineWidth = 0.8 * sf
        context.stroke()

        // Dots
        allDots.forEach((dot) => {
          const projected = projection([dot.lng, dot.lat])
          if (
            projected &&
            projected[0] >= 0 && projected[0] <= containerWidth &&
            projected[1] >= 0 && projected[1] <= containerHeight
          ) {
            context.beginPath()
            context.arc(projected[0], projected[1], 1.1 * sf, 0, 2 * Math.PI)
            context.fillStyle = dotColor
            context.fill()
          }
        })
      }
    }

    const loadWorldData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json"
        )
        if (!response.ok) throw new Error("Failed to load land data")
        landFeatures = await response.json() as GeoJSON.FeatureCollection
        landFeatures.features.forEach((feature) => {
          const dots = generateDotsInPolygon(feature, 16)
          dots.forEach(([lng, lat]) => allDots.push({ lng, lat }))
        })
        render()
        setIsLoading(false)
      } catch {
        setError("No se pudo cargar el mapa")
        setIsLoading(false)
      }
    }

    const rotation: [number, number] = [0, -20]
    let autoRotate = true
    const rotationSpeed = 0.18

    const rotationTimer = d3.timer(() => {
      if (autoRotate) {
        rotation[0] += rotationSpeed
        projection.rotate(rotation)
      }
      render()
    })

    const handleMouseDown = (event: MouseEvent) => {
      autoRotate = false
      const startX = event.clientX
      const startY = event.clientY
      const startRotation: [number, number] = [...rotation] as [number, number]

      const handleMouseMove = (e: MouseEvent) => {
        const sensitivity = 0.4
        rotation[0] = startRotation[0] + (e.clientX - startX) * sensitivity
        rotation[1] = Math.max(-80, Math.min(80, startRotation[1] - (e.clientY - startY) * sensitivity))
        projection.rotate(rotation)
        render()
      }

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        setTimeout(() => { autoRotate = true }, 500)
      }

      // Fallback: always resume after 3s even if mouseup didn't fire
      setTimeout(() => { autoRotate = true }, 3000)

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    canvas.addEventListener("mousedown", handleMouseDown)
    loadWorldData()

    return () => {
      rotationTimer.stop()
      canvas.removeEventListener("mousedown", handleMouseDown)
    }
  }, [width, height, dotColor, lineColor, oceanColor])

  if (error) return null

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "rgba(125,223,255,0.5)" }} />
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="rounded-full cursor-grab active:cursor-grabbing"
        style={{ opacity: isLoading ? 0 : 1, transition: "opacity 0.8s ease" }}
      />
    </div>
  )
}
