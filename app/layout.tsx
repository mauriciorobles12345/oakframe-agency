import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { PageTransition } from "@/components/ui/page-transition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Oakframe Agency — Diseño y Desarrollo Web en Puebla',
  description: 'Agencia de diseño y desarrollo web en Puebla, México. Creamos sitios web que elevan tu marca y convierten visitantes en clientes.',
  icons: { icon: '/logo.png' },
  metadataBase: new URL('https://oakframe.mx'),
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://oakframe.mx',
    siteName: 'Oakframe Agency',
    title: 'Oakframe Agency — Diseño y Desarrollo Web',
    description: 'Agencia de diseño y desarrollo web en Puebla, México. La primera impresión que no se olvida.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Oakframe Agency' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oakframe Agency — Diseño y Desarrollo Web',
    description: 'Agencia de diseño y desarrollo web en Puebla, México.',
    images: ['/opengraph-image'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col cursor-none">
        <CustomCursor />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
