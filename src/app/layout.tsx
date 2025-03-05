import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "AbdullahCXD - Portfolio",
  description: "Full Stack Developer and Beginner UI/UX Designer Portfolio",
  keywords: ["Full Stack Developer", "UI/UX Designer", "Web Development", "Portfolio"],
  authors: [{ name: "AbdullahCXD" }],
  creator: "AbdullahCXD",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abdullahcxd.is-a.dev",
    title: "AbdullahCXD - Portfolio",
    description: "Full Stack Developer and Beginner UI/UX Designer Portfolio",
    siteName: "AbdullahCXD Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "AbdullahCXD - Portfolio",
    description: "Full Stack Developer and Beginner UI/UX Designer Portfolio",
    creator: "@sabdullahcxd",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <ThemeProvider>
          <main className="flex-1">
            {children}
          </main>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
