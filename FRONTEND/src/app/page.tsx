'use client';
import React, { useEffect, useState } from 'react';
import Polizas from './polizas/page';
import Login from './Components/Login';
import './globals.css';

const Page: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(auth === 'true');
  }, []);

  if (isAuthenticated === null) {
    return <div className="text-center mt-5">Cargando...</div>;
  }

  return isAuthenticated ? (
    <>
      <Polizas />
    </>
  ) : (
    <Login />
  );
};

export default Page;
