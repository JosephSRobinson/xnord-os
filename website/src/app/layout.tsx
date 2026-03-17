import type { Metadata } from "next";
import Image from "next/image";
import { NavLinks } from "./components/NavLinks";
import "./globals.css";

export const metadata: Metadata = {
  title: "x-Nord OS",
  description: "The operating system that does not compromise. Private by design. Fast by default. Yours entirely.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body className="bg-[#000000] text-[#FFFFFF] font-mono antialiased min-h-screen flex flex-col">
        <nav className="border-b border-[#333] fixed top-0 left-0 right-0 z-[100] bg-[#000000] min-h-[56px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center">
            <div className="flex justify-between items-center w-full">
              <a href="/" className="flex items-center shrink-0">
                <Image
                  src="/xnord-logo.png"
                  alt="x-Nord"
                  height={28}
                  width={110}
                  style={{ filter: "invert(1)", objectFit: "contain" }}
                />
              </a>
              <NavLinks />
            </div>
          </div>
        </nav>
        <main className="pt-14 flex-1 flex flex-col">
          {children}
          <footer className="border-t border-[#333] mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono tracking-widest uppercase">
                <a href="/" className="flex items-center">
                  <Image
                    src="/xnord-logo.png"
                    alt="x-Nord OS"
                    height={24}
                    width={94}
                    style={{ filter: "invert(1)", objectFit: "contain" }}
                  />
                </a>
                <a href="mailto:hello@xnord.co.uk" className="text-[#FFFFFF]">
                  hello@xnord.co.uk
                </a>
                <a
                  href="https://github.com/JosephSRobinson/xnord-os"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FFFFFF]"
                >
                  github.com/JosephSRobinson/xnord-os
                </a>
              </div>
            </div>
          </footer>
        </main>
      </body>
    </html>
  );
}
