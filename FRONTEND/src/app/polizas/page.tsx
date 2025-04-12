'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { polizaService } from '@/Services/polizaService';
import { FaTrash, FaEdit, FaPlus, FaSearch } from 'react-icons/fa';
import { Poliza } from '@/Interfaces/Polizas';

const Polizas: React.FC = () => {
  const [polizas, setPolizas] = useState<Poliza[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Protección de ruta
  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated');
    if (isAuth !== 'true') {
      router.push('/login');
    }
  }, [router]);

  // Obtener pólizas al cargar
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

  // Eliminar póliza
  const handleEliminar = async (numeroPoliza: string) => {
    const confirmar = confirm('¿Estás seguro que deseas eliminar esta póliza?');

    if (confirmar) {
      try {
        await polizaService.deletePoliza(numeroPoliza);
        setPolizas((prev) => prev.filter((p) => p.numeroPoliza !== numeroPoliza));
        alert('¡Póliza eliminada correctamente!');
      } catch (error) {
        console.error('Error al eliminar la póliza:', error);
        alert('Hubo un problema al intentar eliminar la póliza.');
      }
    }
  };

  if (loading) return <div className="text-center mt-4">Cargando pólizas...</div>;

  return (
    <div className="container mt-4">
      <h2 style={{ color: '#F57921' }} className="mb-4">Listado de Pólizas</h2>

      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn text-white d-flex align-items-center gap-2"
          style={{ backgroundColor: '#F57921' }}
          onClick={() => router.push('/polizas/consultar')}
        >
          <FaSearch />
          Consultar póliza
        </button>
      </div>

      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn text-white d-flex align-items-center gap-2"
          style={{ backgroundColor: '#F57921' }}
          onClick={() => router.push('/polizas/crear')}
        >
          <FaPlus /> Crear nueva póliza
        </button>
      </div>

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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {polizas.length === 0 ? (
            <tr>
              <td colSpan={13} className="text-center text-muted">
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
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => router.push(`/polizas/editar/${p.numeroPoliza}`)}
                    title="Editar"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleEliminar(p.numeroPoliza)}
                    title="Eliminar"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Polizas;
