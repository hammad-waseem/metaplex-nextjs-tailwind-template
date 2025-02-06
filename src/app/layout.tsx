import { ThemeProviderWrapper } from "@/providers/themeProvider";
import { WalletAdapterProvider } from "@/providers/walletAdapterProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";

import { UmiProvider } from "@/providers/umiProvider";
import { Suspense } from "react";
import Loader from "@/components/Loader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pooks",
  description: "/po͝oks/ short for pretty ordinary odd kids. it's a lifestyle.",
  icons: "/fav.png",
  openGraph: {
    images: "/1500x500.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletAdapterProvider>
          <UmiProvider>
            <Suspense fallback={<Loader />}>
              <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
            </Suspense>
          </UmiProvider>
        </WalletAdapterProvider>
      </body>
    </html>
  );
}
