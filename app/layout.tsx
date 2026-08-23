import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://invitacion-boda-sileidys.vercel.app"),
  title: "Dominique & Sileidys",
  description:
    "Queremos que sean parte de uno de los días más importantes para nosotros. Nos hará muy felices compartirlo con ustedes.",
  openGraph: {
    title: "Dominique & Sileidys",
    description:
      "Queremos que sean parte de uno de los días más importantes para nosotros. Nos hará muy felices compartirlo con ustedes.",
    url: "https://invitacion-boda-sileidys.vercel.app",
    siteName: "Dominique & Sileidys",
    images: [
      {
        url: "/portada-anillos-flores.webp",
        width: 1200,
        height: 630,
        alt: "Invitación de boda de Dominique y Sileidys",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
