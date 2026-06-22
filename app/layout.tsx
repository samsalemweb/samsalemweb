import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimationProvider from "@/components/animations/AnimationProvider";
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sam-salem.com"),
  title: "Sam Salem | PREC | Sincere Real Estate Services",
  description:
    "Sam Salem — Strong focus on Presales, Condo, and luxury homes with deep market insight and polished marketing. Top 1% of all REALTORS in Greater Vancouver, President Club 2023.",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-body antialiased overflow-x-hidden">
        <Navbar />
        <AnimationProvider>
          <main className="min-h-screen">{children}</main>
        </AnimationProvider>
        <Footer />
        <GoogleTagManager gtmId="GTM-TCP6QF2H" />
      </body>
    </html>
  );
}
