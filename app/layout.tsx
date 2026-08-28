import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://invitacion-boda-sileidys.vercel.app";
const sharePreviewImage = `${siteUrl}/og-dominique-sileidys-close-20260824.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Dominique & Sileidys",
  description:
    "Queremos que sean parte de uno de los días más importantes para nosotros. Nos hará muy felices compartirlo con ustedes.",
  openGraph: {
    title: "Dominique & Sileidys",
    description:
      "Queremos que sean parte de uno de los días más importantes para nosotros. Nos hará muy felices compartirlo con ustedes.",
    url: siteUrl,
    siteName: "Dominique & Sileidys",
    images: [
      {
        url: sharePreviewImage,
        width: 1200,
        height: 630,
        alt: "Dominique y Sileidys en la playa",
        type: "image/jpeg",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dominique & Sileidys",
    description:
      "Queremos que sean parte de uno de los días más importantes para nosotros. Nos hará muy felices compartirlo con ustedes.",
    images: [sharePreviewImage],
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
      <head>
        <link rel="preload" as="image" href="/foto-principal-manos.webp" fetchPriority="high" />
      </head>
      <body>{children}</body>
    </html>
  );
}
