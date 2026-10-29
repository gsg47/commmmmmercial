import type { Metadata, Viewport } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import "./globals.css";

const display = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const spec = JetBrains_Mono({
  variable: "--font-spec",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Commercial Link Contracting Ltd. | Steel Stud, Insulation & Drywall in Alberta and BC",
  description:
    "Steel stud framing, insulation, boarding, taping and texture for builders, developers and general contractors across Alberta and British Columbia. Established 2007, based in Calgary.",
};

export const viewport: Viewport = {
  themeColor: "#0f0f0e",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-CA"
      className={`${display.variable} ${body.variable} ${spec.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col" suppressHydrationWarning>
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
