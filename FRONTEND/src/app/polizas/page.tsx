'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Para redirección en app router
import { Poliza } from '../../Interfaces/Polizas';
import { polizaService } from '../../Services/polizaService';

const Polizas: React.FC = () => {
  const [polizas, setPolizas] = useState<Poliza[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Protegemos la ruta: si no está logueado, redirigimos al login
  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated');
    if (isAuth !== 'true') {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    const fetchPolizas = async () => {
      try {
        const data = await polizaService.getPolizas();
        setPolizas(data);
      } catch (error) {
        console.error('Error fetching pólizas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolizas();
  }, []);

  if (loading) return <div className="text-center mt-4">Cargando pólizas...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Listado de Pólizas</h2>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Número</th>
            <th>Cédula Asegurado</th>
            <th>Monto Asegurado</th>
            <th>Prima</th>
            <th>Aseguradora</th>
            <th>Fecha Emisión</th>
            <th>Vencimiento</th>
            <th>Periodo</th>
            <th>Fecha Inclusión</th>
            <th>Tipo Póliza</th>
            <th>Cobertura</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {polizas.length === 0 ? (
            <tr>
              <td colSpan={12} className="text-center text-muted">
                Aún no hay datos registrados.
              </td>
            </tr>
          ) : (
            polizas.map((p) => (
              <tr key={p.numeroPoliza}>
                <td>{p.numeroPoliza}</td>
                <td>{p.cedulaAsegurado}</td>
                <td>₡{p.montoAsegurado.toLocaleString()}</td>
                <td>₡{p.prima.toLocaleString()}</td>
                <td>{p.aseguradora}</td>
                <td>{new Date(p.fechaEmision).toLocaleDateString()}</td>
                <td>{new Date(p.fechaVencimiento).toLocaleDateString()}</td>
                <td>{new Date(p.periodo).toLocaleDateString()}</td>
                <td>{new Date(p.fechaInclusion).toLocaleDateString()}</td>
                <td>{p.tipoPoliza?.nombre ?? 'Sin datos'}</td>
                <td>{p.cobertura?.nombre ?? 'Sin datos'}</td>
                <td>{p.estadoPoliza?.nombre ?? 'Sin datos'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Polizas;
