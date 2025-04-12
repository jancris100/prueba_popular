'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login: React.FC = () => {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('https://tuservidor.com/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName, password }),
    });

    if (response.ok) {
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/polizas');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="bg-white p-5 rounded shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
        
        <div className="text-center mb-4">
          <Image src="/logo.jpg" alt="Logo" width={100} height={100} className="rounded-circle" />
        </div>

        <h3 className="text-center mb-4" style={{ color: '#F57921' }}>
          Iniciar Sesión
        </h3>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">
              Usuario
            </label>
            <input
              type="text"
              className="form-control"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Ingrese su usuario"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              required
            />
          </div>

          <button type="submit" className="btn w-100 text-white" style={{ backgroundColor: '#F57921' }}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
