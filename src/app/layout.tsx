import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.arhamestate.com'),
  title: {
    default: 'Arham Estate | Leading Commercial & Luxury Residential Developer in Kolkata',
    template: '%s | Arham Estate',
  },
  description: 'Arham Estate is an integrated real estate advisory firm presenting curated high-end residential, commercial, and boutique properties across Kolkata with complete transparency, RERA compliance, and wellness-centric design.',
  keywords: [
    'Arham Estate',
    'Kolkata real estate',
    'luxury properties Kolkata',
    'EM Bypass apartments',
    'Alipore luxury homes',
    'New Town commercial spaces',
    'RERA certified Kolkata',
  ],
  authors: [{ name: 'Arham Estate' }],
  creator: 'Arham Estate',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.arhamestate.com',
    siteName: 'Arham Estate',
    title: 'Arham Estate | Curated Luxury Properties in Kolkata',
    description: 'Explore premier Grade-A commercial spaces and luxury condominiums in Kolkata with verified RERA documentation.',
    images: [
      {
        url: '/images/howrah_bridge_sunset.jpg',
        width: 1200,
        height: 630,
        alt: 'Arham Estate Kolkata Skyline',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arham Estate | Luxury Real Estate Kolkata',
    description: 'Curated luxury living and commercial investment advisory in Kolkata.',
    images: ['/images/howrah_bridge_sunset.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" type="image/png" href="/images/logo.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
