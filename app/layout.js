import { Comfortaa } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const comfortaa = Comfortaa({ subsets: ["latin"], weight: '400' });

// hydrates the meta tag in the browser html page
export const metadata = {
  title: `PokéVerse - Home`, //title for the homepage
  description: "Search your favourite Pokémon by entering its name. Also get a detailed imformation about the Pokémon by clicking on their respective cards", // application description
  keywords: ["Pokemon", "Pokedex"], // keywords to appear in the search
  author: "Hitesh Eknath Bhosale", // author
  charset: "UTF-8", // type of encoding used

  // favicons to be displayed
  icons: {
    icon: 'android-chrome-192x192.png',
    apple: 'apple-touch-icon.png',
  }
};

// viewport so the search engines should know that application is responsive
export const viewport = {
  viewport: "width=device-width, initial-scale=1.0"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${comfortaa.className} min-h-screen flex flex-col bg-gradient-to-r from-[#1e0459] via-[#662983] to-[#151332]`}>
        {/* display the navbar inside the header tag */}
        <header>
          <Navbar />
        </header>

        {/* displays the main content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* displays the application footer */}
        <footer className="mt-auto">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
