import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Audio Player',
  description: 'A YouTube Music-like audio player',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
