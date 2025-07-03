// app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import Particles from "@/components/Particles";
import AuthProvider from "@/providers/auth-provider";
import { ThemeProvider } from "@/contexts/ThemeContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Xsbel Studio by Isabel Navarro",
  description:
    "xsbel studio es un estudio privado de belleza integral en Cañas, Guanacaste, Costa Rica. Servicios de belleza, quiropodia, manicura, pedicura, maquillaje y peluquería.",
  keywords: [
    "xsbel studio",
    "xsbel",
    "beauty space",
    "nails",
    "beauty",
    "spa",
    "manicura",
    "pedicura",
    "quiropodia",
    "maquillaje",
    "peluquería",
    "estética",
    "cuidado de pies",
    "cuidado de manos",
    "uñas acrílicas",
    "uñas en gel",
    "Cañas",
    "Guanacaste",
    "Costa Rica",
  ],
  openGraph: {
    title: "Xsbel Studio by Isabel Navarro",
    description:
      "Estudio privado de belleza integral en Cañas, Guanacaste, Costa Rica.",
    url: "https://xsbelstudio.vercel.app",
    images: [
      {
        url: "https://xsbelstudio.vercel.app/favicon.ico",
        width: 800,
        height: 600,
        alt: "xsbel studio logo",
      },
    ],
    siteName: "xsbel studio",
    locale: "es_CR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BeautySalon",
              name: "Xsbel Studio by Isabel Navarro",
              image: "https://xsbelstudio.vercel.app/favicon.ico",
              description:
                "Xsbel Studio es un estudio privado de belleza integral en Cañas, Guanacaste, Costa Rica. Servicios de belleza, quiropodia, manicura, pedicura, maquillaje y peluquería.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Cañas",
                addressLocality: "Guanacaste",
                addressCountry: "CR",
              },
              url: "https://xsbelstudio.vercel.app",
              telephone: "+506 8801 5998",
            }),
          }}
        />
        <meta
          name="google-site-verification"
          content="fnm6RRn3UptyQuGpDk44miu8LEas1GZ2pMN6_Air8os"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-r from-white/10 to-pink-300 dark:bg-gradient-to-r dark:from-pink-400 dark:via-black dark:to-black`}
      >
        <ThemeProvider>
          <AuthProvider>
            <Header />
            <main className="w-full mx-auto relative z-10">
              <Particles />
              {children}
              <Analytics />
            </main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
