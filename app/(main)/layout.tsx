import Provider from './provider';
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </div>
    </Provider>
  );
}
