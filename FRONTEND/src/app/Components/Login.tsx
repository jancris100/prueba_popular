'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Login: React.FC = () => {
  //CONSTRUCTORES
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Estado para el mensaje de error
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  //FUNCION DE MANEJO DEL LOGIN
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(`${apiUrl}/api/Auth/login`, {
        userName,
        password,
      });

      localStorage.setItem('isAuthenticated', 'true');
      window.location.reload();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data;
        const errorMessage = typeof data === 'string'
          ? data
          : data?.message || 'Error desconocido al iniciar sesión.';
        setErrorMessage(errorMessage);
      } else {
        setErrorMessage('Error inesperado. Intente más tarde.');
      }
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

        {/* Muestra el mensaje de error solo si hay uno */}
        {errorMessage && (
          <div className="alert alert-danger mb-3">
            {errorMessage}
          </div>
        )}

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
