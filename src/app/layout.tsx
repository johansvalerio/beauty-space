// app/layout.tsx

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react"
import Head from 'next/head';

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
  title: "xsbelstudio - Isabel Navarro",
  description: "xsbelstudio es un [Estudio de belleza integral] en Cañas, Gte., Costa Rica. Ofrecemos servicios de belleza y cuidado integral de los pies.",
  keywords: "xsbelstudio, xsbel, beauty space, nails, beauty, spa, manicura, pedicura, quiropodia, maquillaje, peluquería, estética, cuidado de pies, cuidado de manos, uñas acrílicas, uñas en gel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>xsbelstudio - [Breve descripción del proyecto]</title>
        <meta name="description" content="xsbelstudio es un [estudio privado de belleza integralagl ]" />
        <meta name="keywords" content="xsbelstudio, [xsbel], [podia], [nails]" />
        <meta property="og:title" content="xsbelstudio" />
        <meta property="og:description" content="xsbelstudio es un [estudio privado de belleza integral]" />

        <meta property="og:url" content="https://xsbelstudio.vercel.app" />
        <meta property="og:type" content="website" />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-r from-rose-300 to-purple-300`}>
        <Header />
        <main className=" w-full mx-auto relative z-10">
          {children}
          <Analytics />
        </main>
        <Footer />
      </body>
    </html>
  );
}