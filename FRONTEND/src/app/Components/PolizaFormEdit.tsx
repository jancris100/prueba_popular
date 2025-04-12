import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Poliza } from '@/Interfaces/Polizas';
import { NumericFormat } from 'react-number-format';
import { polizaService } from '@/Services/polizaService';

interface PolizaFormEditProps {
  form: Poliza;
  setForm: React.Dispatch<React.SetStateAction<Poliza>>;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

const PolizaFormEdit: React.FC<PolizaFormEditProps> = ({
  form,
  setForm,
  handleSubmit,
}) => {
  const [tiposPoliza, setTiposPoliza] = useState<any[]>([]);
  const [coberturas, setCoberturas] = useState<any[]>([]);
  const [estadosPoliza, setEstadosPoliza] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tiposPolizaResponse = await polizaService.getTiposPoliza();
        const coberturasResponse = await polizaService.getCoberturas();
        const estadosPolizaResponse = await polizaService.getEstadosPoliza();

        setTiposPoliza(tiposPolizaResponse);
        setCoberturas(coberturasResponse);
        setEstadosPoliza(estadosPolizaResponse);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (fecha: string) => {
    if (!fecha) return '';
    const d = new Date(fecha);
    return d.toISOString().split('T')[0];
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInternalSubmit = async (e: React.FormEvent) => {
    await handleSubmit(e);
    alert('Cambios guardados exitosamente');
  };

  return (
    
    <Form onSubmit={handleInternalSubmit}>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="numeroPoliza">
            <Form.Label>Número de Póliza</Form.Label>
            <Form.Control
              type="text"
              name="numeroPoliza"
              value={form.numeroPoliza}
              onChange={handleChange}
              required
              readOnly
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
            <NumericFormat
              thousandSeparator=","
              prefix="₡"
              allowNegative={false}
              name="montoAsegurado"
              value={form.montoAsegurado}
              onValueChange={(values) => {
                const { value } = values;
                setForm((prev) => ({ ...prev, montoAsegurado: value }));
              }}
              customInput={Form.Control}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="fechaEmision">
            <Form.Label>Fecha de Emisión</Form.Label>
            <Form.Control
              type="date"
              name="fechaEmision"
              value={formatDate(form.fechaEmision)}
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
              value={formatDate(form.fechaVencimiento)}
              onChange={handleChange}
              required
              disabled
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
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
        <Col md={6}>
          <Form.Group controlId="prima">
            <Form.Label>Prima</Form.Label>
            <NumericFormat
              thousandSeparator=","
              prefix="₡"
              allowNegative={false}
              name="prima"
              value={form.prima}
              onValueChange={(values) => {
                const { value } = values;
                setForm((prev) => ({ ...prev, prima: value }));
              }}
              customInput={Form.Control}
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
              value={formatDate(form.periodo)}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="fechaInclusion">
            <Form.Label>Fecha Inclusión</Form.Label>
            <Form.Control
              type="date"
              name="fechaInclusion"
              value={formatDate(form.fechaInclusion)}
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

      <Button type="submit" className="mt-3" style={{ backgroundColor: '#F57921' }}>
        Guardar Cambios
      </Button>
    </Form>
  );
};

export default PolizaFormEdit;
