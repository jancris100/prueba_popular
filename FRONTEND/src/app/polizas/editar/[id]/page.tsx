'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Poliza } from '../../../../Interfaces/Polizas';
import PolizaFormEdit from '../../../Components/PolizaFormEdit';  // Importa el nuevo componente
import { polizaService } from '../../../../Services/polizaService';

export default function EditarPolizaPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState<Poliza | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const poliza = await polizaService.getPolizaById(id as string);
        console.log(poliza);
        setForm(poliza);
      } catch (err) {
        console.error('Error al cargar la póliza:', err);
        alert('No se pudo cargar la póliza.');
        router.push('/polizas');
      }
    };

    fetchData();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form) {
      try {
        await polizaService.updatePoliza(id as string, form);
        alert('Póliza actualizada con éxito');
        router.push('/');
      } catch (err) {
        console.error('Error al actualizar la póliza:', err);
        alert('Ocurrió un error al actualizar la póliza.');
      }
    }
  };

  return form ? (
    <div className="container mt-4">
      <h2 style={{ color: '#F57921' }} className="mb-4">Editar Póliza</h2>
      <PolizaFormEdit
        form={form} 
        setForm={setForm} 
        handleSubmit={handleSubmit} 
        modo="editar"
        tiposPoliza={[]} 
        coberturas={[]}   
        estadosPoliza={[]} 
      />
    </div>
  ) : (
    <p className="text-center mt-4">Cargando póliza...</p>
  );
}
