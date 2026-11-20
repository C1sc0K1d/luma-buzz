import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
const inter = localFont({
  src: '../../public/fonts/inter-latin-variable.woff2',
  variable: '--font-inter',
  display: 'swap',
  weight: '100 900',
});
export const metadata: Metadata = {
  title: 'Luma — Practical learning for curious people',
  description:
    'Build skills that actually move you forward. Explore practical courses in design, technology, business and creativity with Luma.',
  icons: { icon: '/favicon.svg' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
