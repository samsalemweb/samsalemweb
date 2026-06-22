import Script from "next/script";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimationProvider from "@/components/animations/AnimationProvider";


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
       
      </body>
      <Script
    id="gtm-head"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];
        w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});
        var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
        j.async=true;
        j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
        f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-TCP6QF2H');
      `,
    }}
  />
    </html>
  );
}
