"use client";

import React, { useState, useEffect } from 'react';
import { polizaService } from '@/Services/polizaService';
import { Poliza } from '@/Interfaces/Polizas';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaTrash, FaEdit, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const ConsultaPolizaPage = () => {
    const router = useRouter();
    const [searchParams, setSearchParams] = useState({
        numeroPoliza: '',
        tipoPolizaId: '',
        cedulaAsegurado: '',
        nombreAsegurado: '',
        apellidosAsegurado: '',
        fechaVencimientoInicio: null as Date | null,
        fechaVencimientoFin: null as Date | null
    });

    const [resultados, setResultados] = useState<Poliza[]>([]);
    const [loading, setLoading] = useState(false);
    const [tiposPoliza, setTiposPoliza] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {

    
        const cargarTiposPoliza = async () => {
            try {
                const data = await polizaService.getTiposPoliza();
                setTiposPoliza(data);
            } catch (error) {
                console.error('Error cargando tipos de póliza:', error);
            }
        };
        cargarTiposPoliza();
    }, []);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setHasSearched(true);
        setResultados([]);

        try {
            const resultados = await polizaService.searchPolizas(
                searchParams.numeroPoliza,
                Number(searchParams.tipoPolizaId),
                searchParams.cedulaAsegurado,
                searchParams.nombreAsegurado,
                searchParams.apellidosAsegurado,
                searchParams.fechaVencimientoInicio || undefined,
                searchParams.fechaVencimientoFin || undefined
            );

            if (resultados.length === 0) {
                setError('No se encontraron pólizas con los criterios de búsqueda');
            } else {
                setError(null);
            }

            setResultados(resultados);
        } catch (error: any) {
            let errorMessage = error.message || 'Error en la búsqueda';

            // Capturar mensajes personalizados del backend si existen
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }

            setError(errorMessage);
            setResultados([]);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: Date | string) => {
        try {
            return new Date(dateString).toLocaleDateString('es-ES');
        } catch {
            return 'Fecha inválida';
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="container mt-4">
            <button
                className="btn text-white"
                style={{ backgroundColor: '#F57921' }}
                onClick={() => router.push('/')}
            >
                Volver
            </button>
            <h2 style={{ color: '#F57921' }} className="mb-4">Consulta de Pólizas</h2>

            {error && (
                <div className="alert alert-danger mb-3">
                    {error}
                    <button
                        type="button"
                        className="btn-close float-end"
                        onClick={() => setError(null)}
                    />
                </div>
            )}

            <form onSubmit={handleSearch} className="mb-4 p-3 border rounded bg-light">
                <div className="row g-3">
                    <div className="col-md-4">
                        <label className="form-label">Número de Póliza</label>
                        <input
                            type="text"
                            className="form-control"
                            name="numeroPoliza"
                            value={searchParams.numeroPoliza}
                            onChange={handleChange}
                            placeholder="Ej: POL-1234"
                        />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Tipo de Póliza</label>
                        <select
                            className="form-select"
                            name="tipoPolizaId"
                            value={searchParams.tipoPolizaId}
                            onChange={handleChange}
                        >
                            <option value="">Todos los tipos</option>
                            {tiposPoliza.map((tipo: any) => (
                                <option key={tipo.id} value={tipo.id}>
                                    {tipo.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Cédula Asegurado</label>
                        <input
                            type="text"
                            className="form-control"
                            name="cedulaAsegurado"
                            value={searchParams.cedulaAsegurado}
                            onChange={handleChange}
                            placeholder="____-____"
                        />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Nombre Asegurado</label>
                        <input
                            type="text"
                            className="form-control"
                            name="nombreAsegurado"
                            value={searchParams.nombreAsegurado}
                            onChange={handleChange}
                            placeholder="Nombre del cliente"
                        />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Apellidos Asegurado</label>
                        <input
                            type="text"
                            className="form-control"
                            name="apellidosAsegurado"
                            value={searchParams.apellidosAsegurado}
                            onChange={handleChange}
                            placeholder="Apellidos del cliente"
                        />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Fecha Vencimiento Desde</label>
                        <DatePicker
                            selected={searchParams.fechaVencimientoInicio}
                            onChange={(date) => setSearchParams({ ...searchParams, fechaVencimientoInicio: date })}
                            className="form-control"
                            dateFormat="dd/MM/yyyy"
                            placeholderText="dd/mm/aaaa"
                            isClearable
                            onClear={() => setSearchParams({ ...searchParams, fechaVencimientoInicio: null })}
                        />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Fecha Vencimiento Hasta</label>
                        <DatePicker
                            selected={searchParams.fechaVencimientoFin}
                            onChange={(date) => setSearchParams({ ...searchParams, fechaVencimientoFin: date })}
                            className="form-control"
                            dateFormat="dd/MM/yyyy"
                            placeholderText="dd/mm/aaaa"
                            isClearable
                            onClear={() => setSearchParams({ ...searchParams, fechaVencimientoFin: null })}
                        />
                    </div>

                    <div className="col-md-12 text-end">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            <FaSearch className="me-2" />
                            {loading ? 'Buscando...' : 'Buscar'}
                        </button>
                    </div>
                </div>
            </form>

            {loading ? (
                <div className="text-center my-4">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            ) : resultados.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Número</th>
                                <th>Cédula</th>
                                <th>Monto</th>
                                <th>Prima</th>
                                <th>Aseguradora</th>
                                <th>Emisión</th>
                                <th>Vencimiento</th>
                                <th>Periodo</th>
                                <th>Inclusión</th>
                                <th>Tipo</th>
                                <th>Cobertura</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultados.map((p) => (
                                <tr key={p.numeroPoliza}>
                                    <td>{p.numeroPoliza}</td>
                                    <td>{p.cedulaAsegurado}</td>
                                    <td>₡{p.montoAsegurado?.toLocaleString() ?? 'N/A'}</td>
                                    <td>₡{p.prima?.toLocaleString() ?? 'N/A'}</td>
                                    <td>{p.aseguradora}</td>
                                    <td>{formatDate(p.fechaEmision)}</td>
                                    <td>{formatDate(p.fechaVencimiento)}</td>
                                    <td>{formatDate(p.periodo)}</td>
                                    <td>{formatDate(p.fechaInclusion)}</td>
                                    <td>{p.tipoPoliza?.nombre ?? '-'}</td>
                                    <td>{p.cobertura?.nombre ?? '-'}</td>
                                    <td>{p.estadoPoliza?.nombre ?? '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : hasSearched && !error && (
                <div className="alert alert-info">
                    No se encontraron resultados con los filtros aplicados
                </div>
            )}
        </div>
    );
};

export default ConsultaPolizaPage;