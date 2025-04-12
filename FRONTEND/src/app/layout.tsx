import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';  
import Navbar from './Components/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}