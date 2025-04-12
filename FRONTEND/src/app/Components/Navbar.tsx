import React from 'react';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#F57921' }}>
      {/* IMAGEN*/}
      <Image src="/logo.jpg" alt="Logo" width={120} height={120} />


      {/* TITULO */}
      <div className="mx-auto">
        <span className="navbar-text" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>
          Bienvenido a la gestión de pólizas
        </span>
      </div>

    </nav>
  );
}

export default Navbar;
