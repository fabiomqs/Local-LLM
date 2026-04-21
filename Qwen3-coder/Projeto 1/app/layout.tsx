import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dashboard de Hábitos',
  description: 'Acompanhe seus hábitos e construa sequências',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="h-full bg-gray-900">
      <body className={inter.className + ' h-full'}>{children}</body>
    </html>
  );
}