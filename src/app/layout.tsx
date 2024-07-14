import Header from "@/components/Header";
import type { Metadata } from "next";
import "@/main.css";

export const metadata: Metadata = {
  title: "Animeflix",
  description: "Una pagina web dedicada a anime con el estilo netflix",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
