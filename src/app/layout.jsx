import { Geist, Geist_Mono, Fredoka } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({ subsets: ['latin'], weight: ['400', '700'] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ipetpetu",
  description: "Petpet Euphonie",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${fredoka.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
