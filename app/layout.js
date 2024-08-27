import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Script from "next/script";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: `PokéVerse`,
  description: "Search your favourite Pokémon by entering its name. Also get a detailed imformation about the Pokémon by clicking on their respective cards",
  keywords: ["Pokemon", "Pokedex"],
  author:"Hitesh Eknath Bhosale",
  charset:"UTF-8",
  icons:{
    icon:'android-chrome-512x512.png',
    apple:'apple-touch-icon.png',
  }
};

export const viewport={
  viewport:"width=device-width, initial-scale=1.0"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <header>
          <Navbar />
        </header>
        {children}
        <footer className="mt-auto">
          <Footer />
        </footer>
      </body>
      <Script src="https://kit.fontawesome.com/52afc80947.js" />
    </html>
  );
}
