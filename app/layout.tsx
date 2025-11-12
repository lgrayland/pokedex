import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FavouritesProvider } from "@/context/favourites";
import { TanStackQueryProvider } from "@/context/tanStackQueryProvider";
import Link from "next/link";
import FavLink from "@/modules/pokemon/components/FavLink";
import { Button } from "@/modules/common/components/ui/button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pokedex",
  description: "Explore the world of Pokemon",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal?: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TanStackQueryProvider>
          <FavouritesProvider>
            <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
              <div className="container mx-auto px-4 pt-8">
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <Link href={"/csr"}>
                      <Button
                        variant="outline"
                        className="relative bg-transparent"
                      >
                        CSR
                      </Button>
                    </Link>
                    <Link href={"/ssr"}>
                      <Button
                        variant="outline"
                        className="relative bg-transparent"
                      >
                        SSR
                      </Button>
                    </Link>
                    <Link href={"/tanstack"}>
                      <Button
                        variant="outline"
                        className="relative bg-transparent"
                      >
                        TanStack
                      </Button>
                    </Link>
                    <Link href={"/blur"}>
                      <Button
                        variant="outline"
                        className="relative bg-transparent"
                      >
                        Blurry placeholder
                      </Button>
                    </Link>
                  </div>
                  <FavLink />
                </div>
                {children}
                {modal}
              </div>
            </main>
          </FavouritesProvider>
        </TanStackQueryProvider>
      </body>
    </html>
  );
}
