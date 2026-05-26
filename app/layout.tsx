import { Playfair_Display, Outfit } from 'next/font/google';
import './globals.css';

const headingFont = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-heading',
  weight: ['400', '700', '900']
});

const bodyFont = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-body',
  weight: ['300', '400', '600']
});

export const metadata = {
  title: 'Dhawn Beauty Castle | Radiant Skin for Melanin',
  description: 'Expertly formulated skincare for melanin-rich skin correcting acne and hyperpigmentation.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}