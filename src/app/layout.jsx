import { Fredoka, Noto_Sans_Thai } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

const fredoka = Fredoka({ subsets: ['latin'], weight: ['400', '700'] });
const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-thai',
});

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
        className={`${fredoka.className} ${notoSansThai.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
