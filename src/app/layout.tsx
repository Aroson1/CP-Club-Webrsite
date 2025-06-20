import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import Script from "next/script";
import { GSAPProvider } from "@/components/providers/GSAPProvider";

// Importing CSS files for styling
import "@/assets/css/nucleo-icons.css";
// import "@/assets/scss/blk-design-system-react.scss";
import "@/assets/css/blk-design-system-react.css";
import "@/assets/css/blog.css";
import "@/assets/css/base-theme.css";
import "@/assets/css/sidebar.css";

// Importing GSAP and its plugins
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
if (typeof window !== "undefined") {
  gsap.registerPlugin(
    useGSAP,
    ScrollTrigger,
    ScrollSmoother,
    ScrollToPlugin,
    CustomEase
  );
}

// Exporting metadata for the application
export const metadata: Metadata = {
  title: "Coders' Club IIITK",
  description:
    "Coders' Club IIITK is a student-run club at IIIT Kottayam that aims to promote competitive programming and problem-solving skills among students.",
  keywords:
    "Coders' Club IIITK, Competitive Programming, IIIT Kottayam, Competitive Programming Club, Coders' Club",
  themeColor: "#000000",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="perfect-scrollbar-off nav-open"
    >
      <head>
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon.png" />
        <link rel="stylesheet" href="/bootstrap.min.css" />
        <link
          href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,600,700,800"
          rel="stylesheet"
        />
        <link
          href="https://use.fontawesome.com/releases/v5.0.6/css/all.css"
          rel="stylesheet"
        />
        <link
          href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
        />
      </head>
      <body className={`dark index-page`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <GSAPProvider
            smoothConfig={{
              smooth: 1.5, // Adjust smoothness (0-3)
              effects: true, // Enable data-speed attributes
              normalizeScroll: true, // Better mobile support
              ignoreMobileResize: true,
            }}
          >
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              {/* <Footer /> */}
            </div>
            <Toaster />
            <SonnerToaster />
          </GSAPProvider>
        </ThemeProvider>
        {/* <Script src="/bootstrap.bundle.min.js" /> */}
        <Script src="/wow.min.js" />
        <Script src="/events.js" />
        <Script src="https://kit.fontawesome.com/eeecb13881.js" />
      </body>
    </html>
  );
}
