'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //VERIFICAMOS SI ESTA LOG IN
  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(auth === 'true');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light px-4" style={{ backgroundColor: '#F57921' }}>
      {/* IMAGEN */}
      <Image src="/logo.jpg" alt="Logo" width={120} height={120} />

      {/* TITULO */}
      <div className="mx-auto">
        <span className="navbar-text" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>
          Bienvenido a la gestión de pólizas
        </span>
      </div>

      {/* BOTÓN DE LOGOUT */}
      {isAuthenticated && (
        <button
          className="btn btn-light ms-auto"
          style={{ color: '#F57921' }}
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      )}
    </nav>
  );
};

export default Navbar;
