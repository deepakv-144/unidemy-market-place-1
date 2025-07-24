import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AppProvider } from "@/lib/store"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Unidemy Global Marketplace - Buy & Sell Everything",
  description:
    "The world's largest local marketplace. Buy and sell everything from electronics to furniture in your neighborhood.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-auto">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Prevent scroll restoration on page load
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              
              // Prevent unwanted scrolling behavior
              document.addEventListener('DOMContentLoaded', function() {
                // Prevent focus scrolling
                document.addEventListener('focusin', function(e) {
                  e.preventDefault();
                  if (e.target && typeof e.target.focus === 'function') {
                    e.target.focus({ preventScroll: true });
                  }
                }, true);
                
                // Prevent form submission scrolling
                document.addEventListener('submit', function(e) {
                  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
                  setTimeout(() => {
                    window.scrollTo(0, currentScroll);
                  }, 0);
                });
                
                // Prevent button click scrolling
                document.addEventListener('click', function(e) {
                  if (e.target && (e.target.tagName === 'BUTTON' || e.target.closest('button'))) {
                    e.preventDefault();
                    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
                    setTimeout(() => {
                      window.scrollTo(0, currentScroll);
                    }, 0);
                  }
                });
              });
            `,
          }}
        />
      </head>
      <body className={`${inter.className} scroll-auto`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AppProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
