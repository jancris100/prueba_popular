'use client';

import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { polizaService } from '@/Services/polizaService';

type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const PolizaForm: React.FC = () => {
  const [form, setForm] = useState({
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

  const [tiposPoliza, setTiposPoliza] = useState([]);
  const [coberturas, setCoberturas] = useState([]);
  const [estadosPoliza, setEstadosPoliza] = useState([]);
  const [numeroPoliza, setNumeroPoliza] = useState("POL-2025-");

  const fetchData = async () => {
    try {
      const tiposPolizaResponse = await polizaService.getTiposPoliza();
      const coberturasResponse = await polizaService.getCoberturas();
      const estadosPolizaResponse = await polizaService.getEstadosPoliza();

      setTiposPoliza(tiposPolizaResponse);
      setCoberturas(coberturasResponse);
      setEstadosPoliza(estadosPolizaResponse);
    } catch (error) {
      console.error('Error al obtener los datos de las listas desplegables', error);
    }
  };

  useEffect(() => {
    fetchData();

    const currentDate = new Date().toISOString().split('T')[0];
    setForm((prevState) => ({
      ...prevState,
      fechaEmision: currentDate,
    }));

    const fechaEmisionDate = new Date(currentDate);
    const fechaVencimiento = new Date(fechaEmisionDate.setFullYear(fechaEmisionDate.getFullYear() + 1));
    setForm((prevState) => ({
      ...prevState,
      fechaVencimiento: fechaVencimiento.toISOString().split('T')[0],
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<FormControlElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulario enviado con los siguientes datos:', form);
  };

  const handleNumeroPolizaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.startsWith("POL-2025-")) {
      setNumeroPoliza(value);
    }
  };

  return (
    <div className="container mt-4">
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          {/* Número de Póliza y Tipo de Póliza */}
          <Col md={6}>
            <Form.Group controlId="numeroPoliza">
              <Form.Label>Número de Póliza</Form.Label>
              <Form.Control
                type="text"
                name="numeroPoliza"
                value={numeroPoliza}
                onChange={handleNumeroPolizaChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="tipoPolizaId">
              <Form.Label>Tipo de Póliza</Form.Label>
              <Form.Control
                as="select"
                name="tipoPolizaId"
                value={form.tipoPolizaId}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione...</option>
                {tiposPoliza.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          {/* Cédula del Asegurado y Monto Asegurado */}
          <Col md={6}>
            <Form.Group controlId="cedulaAsegurado">
              <Form.Label>Cédula Asegurado</Form.Label>
              <Form.Control
                type="text"
                name="cedulaAsegurado"
                value={form.cedulaAsegurado}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="montoAsegurado">
              <Form.Label>Monto Asegurado</Form.Label>
              <Form.Control
                type="number"
                name="montoAsegurado"
                value={form.montoAsegurado}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          {/* Fecha de Emisión y Fecha de Vencimiento */}
          <Col md={6}>
            <Form.Group controlId="fechaEmision">
              <Form.Label>Fecha de Emisión</Form.Label>
              <Form.Control
                type="date"
                name="fechaEmision"
                value={form.fechaEmision}
                onChange={handleChange}
                required
                disabled
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="fechaVencimiento">
              <Form.Label>Fecha de Vencimiento</Form.Label>
              <Form.Control
                type="date"
                name="fechaVencimiento"
                value={form.fechaVencimiento}
                onChange={handleChange}
                required
                disabled
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          {/* Cobertura y Estado de Póliza */}
          <Col md={6}>
            <Form.Group controlId="coberturaId">
              <Form.Label>Cobertura</Form.Label>
              <Form.Control
                as="select"
                name="coberturaId"
                value={form.coberturaId}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione...</option>
                {coberturas.map((cobertura) => (
                  <option key={cobertura.id} value={cobertura.id}>
                    {cobertura.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="estadoPolizaId">
              <Form.Label>Estado de Póliza</Form.Label>
              <Form.Control
                as="select"
                name="estadoPolizaId"
                value={form.estadoPolizaId}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione...</option>
                {estadosPoliza.map((estado) => (
                  <option key={estado.id} value={estado.id}>
                    {estado.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          {/* Prima y Periodo */}
          <Col md={6}>
            <Form.Group controlId="prima">
              <Form.Label>Prima</Form.Label>
              <Form.Control
                type="number"
                name="prima"
                value={form.prima}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="periodo">
              <Form.Label>Periodo</Form.Label>
              <Form.Control
                type="date"
                name="periodo"
                value={form.periodo}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          {/* Fecha de Inclusión y Aseguradora */}
          <Col md={6}>
            <Form.Group controlId="fechaInclusion">
              <Form.Label>Fecha Inclusión</Form.Label>
              <Form.Control
                type="date"
                name="fechaInclusion"
                value={form.fechaInclusion}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="aseguradora">
              <Form.Label>Aseguradora</Form.Label>
              <Form.Control
                type="text"
                name="aseguradora"
                value={form.aseguradora}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Botón de Enviar */}
        <Button type="submit" className="mt-3">Enviar</Button>
      </Form>
    </div>
  );
};

export default PolizaForm;
