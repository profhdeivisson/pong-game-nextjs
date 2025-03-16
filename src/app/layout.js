import './globals.css';

export const metadata = {
  title: 'Jogo de Ping Pong',
  description: 'Um jogo de ping pong criado com Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}