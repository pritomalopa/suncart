import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "SunCart – Summer Essentials Store",
  description: "Discover the best summer essentials – sunglasses, beach gear, skincare, outfits & more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
      </head>
      <body suppressHydrationWarning>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#0e1929",
              color: "#F9FAFB",
              border: "1px solid rgba(245,158,11,0.3)",
              fontFamily: "'DM Sans', sans-serif",
            },
            success: { iconTheme: { primary: "#F59E0B", secondary: "#0e1929" } },
            error: { iconTheme: { primary: "#FB7185", secondary: "#0e1929" } },
          }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
