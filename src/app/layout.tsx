import Header from "@/components/Header";
import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import "@/css/main.css";
import "@/global.css";

export const metadata: Metadata = {
  title: "Animeflix",
  description: "Una pagina web dedicada a anime con el estilo netflix",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <body className="dark">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
