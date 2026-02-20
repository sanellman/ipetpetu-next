import { Fredoka } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

const fredoka = Fredoka({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata = {
  title: "ipetpetu",
  description: "Petpet Euphonie",
  icons: {
    icon: '/images/icons/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${fredoka.className} antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
