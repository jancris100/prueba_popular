// src/app/components/PolizaForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Form, Button, FormControlElement } from 'react-bootstrap';
import { polizaService } from '@/Services/polizaService';

// Interfaces TypeScript
interface TipoPoliza {
  id: string;
  nombre: string;
}

interface Cobertura {
  id: string;
  nombre: string;
}

interface EstadoPoliza {
  id: string;
  nombre: string;
}

interface PolizaFormState {
  numeroPoliza: string;
  tipoPolizaId: string;
  cedulaAsegurado: string;
  montoAsegurado: string;
  fechaVencimiento: string;
  fechaEmision: string;
  coberturaId: string;
  estadoPolizaId: string;
  prima: string;
  periodo: string;
  fechaInclusion: string;
  aseguradora: string;
}

const PolizaForm: React.FC = () => {
  // Estado del formulario con tipo específico
  const [form, setForm] = useState<PolizaFormState>({
    numeroPoliza: '',
    tipoPolizaId: '',
    cedulaAsegurado: '',
    montoAsegurado: '',
    fechaVencimiento: '',
    fechaEmision: '',
    coberturaId: '',
    estadoPolizaId: '',
    prima: '',
    periodo: '',
    fechaInclusion: '',
    aseguradora: ''
  });

  // Estados para las opciones con tipos específicos
  const [tiposPoliza, setTiposPoliza] = useState<TipoPoliza[]>([]);
  const [coberturas, setCoberturas] = useState<Cobertura[]>([]);
  const [estadosPoliza, setEstadosPoliza] = useState<EstadoPoliza[]>([]);

  // Obtener datos de las listas desplegables
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tipos, coberturas, estados] = await Promise.all([
          polizaService.getTiposPoliza(),
          polizaService.getCoberturas(),
          polizaService.getEstadosPoliza()
        ]);

        setTiposPoliza(tipos);
        setCoberturas(coberturas);
        setEstadosPoliza(estados);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  // Manejador de cambios genérico
  const handleChange = (e: React.ChangeEvent<FormControlElement>) => {
    const { name, value } = e.target;
    
    setForm(prev => ({
      ...prev,
      [name]: name === 'montoAsegurado' || name === 'prima' 
        ? value.replace(/[^0-9.]/g, '') // Filtra solo números
        : value
    }));
  };

  // Manejador de envío
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const data = {
        ...form,
        montoAsegurado: Number(form.montoAsegurado),
        prima: Number(form.prima)
      };

      // await polizaService.crearPoliza(data);
      console.log('Datos enviados:', data);
      alert('Póliza creada exitosamente!');
      
    } catch (error) {
      console.error('Error al crear póliza:', error);
      alert('Error al crear póliza');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Crear Nueva Póliza</h2>
      <Form onSubmit={handleSubmit} className="border p-4 rounded-3">
        <div className="row g-3">
          {/* Columna Izquierda */}
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Número de Póliza</Form.Label>
              <Form.Control
                name="numeroPoliza"
                value={form.numeroPoliza}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tipo de Póliza</Form.Label>
              <Form.Select
                name="tipoPolizaId"
                value={form.tipoPolizaId}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar...</option>
                {tiposPoliza.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cédula Asegurado</Form.Label>
              <Form.Control
                name="cedulaAsegurado"
                value={form.cedulaAsegurado}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Monto Asegurado</Form.Label>
              <Form.Control
                type="number"
                name="montoAsegurado"
                value={form.montoAsegurado}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fecha Emisión</Form.Label>
              <Form.Control
                type="date"
                name="fechaEmision"
                value={form.fechaEmision}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </div>

          {/* Columna Derecha */}
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Fecha Vencimiento</Form.Label>
              <Form.Control
                type="date"
                name="fechaVencimiento"
                value={form.fechaVencimiento}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cobertura</Form.Label>
              <Form.Select
                name="coberturaId"
                value={form.coberturaId}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar...</option>
                {coberturas.map((cobertura) => (
                  <option key={cobertura.id} value={cobertura.id}>
                    {cobertura.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Select
                name="estadoPolizaId"
                value={form.estadoPolizaId}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar...</option>
                {estadosPoliza.map((estado) => (
                  <option key={estado.id} value={estado.id}>
                    {estado.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Prima</Form.Label>
              <Form.Control
                type="number"
                name="prima"
                value={form.prima}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Aseguradora</Form.Label>
              <Form.Control
                name="aseguradora"
                value={form.aseguradora}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </div>
        </div>

        <div className="mt-4 d-flex gap-2 justify-content-end">
          <Button variant="outline-secondary">Cancelar</Button>
          <Button variant="primary" type="submit">Crear Póliza</Button>
        </div>
      </Form>
    </div>
  );
};

export default PolizaForm;