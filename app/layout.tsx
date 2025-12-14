import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MotoRepair - Find Professional Motorcycle Repair Shops",
  description: "Discover trusted motorcycle repair shops across Europe. Quality service, expert mechanics, and guaranteed results for your bike.",
  keywords: ["motorcycle repair", "bike service", "motorcycle mechanics", "repair shops"],
  authors: [{ name: "MotoRepair" }],
  openGraph: {
    title: "MotoRepair - Professional Motorcycle Repair Directory",
    description: "Find trusted motorcycle repair shops across Europe",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased bg-black text-white`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
