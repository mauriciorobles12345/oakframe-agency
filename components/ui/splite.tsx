'use client'

import { Suspense, lazy, useState } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

function SplinePlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="w-2 h-2 rounded-full animate-pulse"
        style={{ background: 'rgba(125,223,255,0.5)', boxShadow: '0 0 12px rgba(125,223,255,0.6)' }}
      />
    </div>
  )
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative ${className ?? ''}`} style={{ width: '100%', height: '100%' }}>
      {!loaded && (
        <div className="absolute inset-0">
          <SplinePlaceholder />
        </div>
      )}
      <Suspense fallback={<SplinePlaceholder />}>
        <Spline
          scene={scene}
          className={className}
          onLoad={() => setLoaded(true)}
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.6s ease' }}
        />
      </Suspense>
    </div>
  )
}
