import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const siteUrl = "https://codensleep.github.io/den.builders";
const ogImageUrl = `${siteUrl}/projects/silver-lake-residence.jpg`;

export const metadata: Metadata = {
  title: {
    default: "Den Builders | Architecture, Construction, Remodeling",
    template: "%s | Den Builders",
  },
  description:
    "Den Builders is a Los Angeles team delivering architecture, construction, and remodeling with integrity, clear communication, and craftsmanship.",
  // Ensure absolute URLs in meta/canonical point to the GitHub Pages project path
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Den Builders | Architecture, Construction, Remodeling",
    description:
      "Architecture, construction, and remodeling in Los Angeles with integrity, clear communication, and craftsmanship.",
    url: siteUrl,
    siteName: "Den Builders",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: ogImageUrl,
        alt: "Den Builders residential project",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Den Builders | Architecture, Construction, Remodeling",
    description:
      "Architecture, construction, and remodeling in Los Angeles with integrity, clear communication, and craftsmanship.",
    images: [ogImageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
