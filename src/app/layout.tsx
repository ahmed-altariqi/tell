import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { Providers } from "~/components/providers";
import { Header } from "~/components/header";
import { Toaster } from "~/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Tell | Anonymous Messages",
  description: "Send anonymous messages to friends.",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <Providers>
          <div className="container flex h-full flex-col">
            <Header />
            <main className="flex min-h-screen w-full max-w-[500px] self-center py-28">
              {children}
            </main>
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}
