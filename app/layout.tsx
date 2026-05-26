import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';
const h = Playfair_Display({ subsets: ['latin'], variable: '--font-h' });
const b = Inter({ subsets: ['latin'], variable: '--font-b' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${h.variable} ${b.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}