import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Mumbai Nest Finder | Premium Real Estate Mumbai',
  description: 'Find your dream home in Mumbai. Curated luxury properties across South Mumbai, Western Suburbs, and more.',
  openGraph: {
    title: 'Mumbai Nest Finder',
    description: 'Luxury property finding service for Mumbai dream homes.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mumbai Nest Finder',
    description: 'Luxury property finding service for Mumbai dream homes.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://tally.so" />
        <link rel="preconnect" href="https://tally.so" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
