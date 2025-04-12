// app/crear-poliza/page.tsx
"use client";

import React from 'react';
import CrearPolizaForm from '../../Components/PolizaForm';

const CrearPolizaPage = () => {
  return (
    <>
      <div className="container mt-4">
        <h2 style={{ color: '#F57921' }} className="mb-4">Crear Nueva Póliza</h2>
        <CrearPolizaForm />
      </div>
    </>
  );
};

export default CrearPolizaPage;
