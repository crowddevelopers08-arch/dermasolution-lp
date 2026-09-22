import type { Metadata } from "next";
import { Gilda_Display, PT_Serif } from "next/font/google";
import "./globals.css";
import { ConsultationProvider } from "@/component/consultation-form";
import { cloudinaryImages } from "@/lib/cloudinary-images";

// Headings only
const gildaDisplay = Gilda_Display({
  variable: "--font-gilda",
  weight: "400",
  subsets: ["latin"],
});

// Everything else
const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const siteTitle = "Dermatologist in Banashankari, Bangalore | Dr. Sindhu's Derma Solutions";
const siteDescription =
  "Skin, hair and aesthetic care in Banashankari, Bangalore. Explore treatments for acne, pigmentation, hair loss and more with Dr Sindhu Priya.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  applicationName: "Dr. Sindhu's Derma Solutions",
  keywords: [
    "dermatologist in Banashankari",
    "skin clinic in Bangalore",
    "hair loss treatment Bangalore",
    "acne treatment Bangalore",
    "pigmentation treatment Bangalore",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Dr. Sindhu's Derma Solutions",
    title: siteTitle,
    description: siteDescription,
    images: [{ url: cloudinaryImages.logo, alt: "Dr. Sindhu's Derma Solutions logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [cloudinaryImages.logo],
  },
  icons: {
    icon: cloudinaryImages.icon,
    shortcut: cloudinaryImages.icon,
    apple: cloudinaryImages.icon,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${gildaDisplay.variable} ${ptSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ConsultationProvider>{children}</ConsultationProvider>
      </body>
    </html>
  );
}
