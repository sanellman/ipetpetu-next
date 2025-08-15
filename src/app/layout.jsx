import { Geist, Geist_Mono, Fredoka } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
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
  icons: {
    icon: '/images/icons/icon1.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${fredoka.className} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
