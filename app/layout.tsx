import type { Metadata } from 'next';
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import './globals.css';

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Alpha Maverick | You built your wealth with discipline',
  description: 'An automated system that trades gold inside your own account. Your money never leaves your hands. You stay in control.',
  openGraph: {
    title: 'Alpha Maverick | You built your wealth with discipline',
    description: 'An automated system that trades gold inside your own account. Your money never leaves your hands. You stay in control.',
    url: 'https://alphamaverick.io',
    siteName: 'Alpha Maverick',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
