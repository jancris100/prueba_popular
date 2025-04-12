// src/services/polizaService.ts
import axios, { AxiosError } from "axios";
import { Poliza } from "../Interfaces/Polizas";
import { crearPoliza } from "../Interfaces/Polizas";
// VARIABLE RUTA
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

//OBTENER POLIZAS
export const polizaService = {
  //OBTENER POLIZAS
  getPolizas: async (): Promise<Poliza[]> => {
    try {
      const response = await axios.get(`${apiUrl}/api/poliza`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error al obtener pólizas desde el backend:");
        console.error("Mensaje:", error.message);
        console.error("Código:", error.code);
        console.error("URL:", error.config?.url);
        console.error("Respuesta completa:", error.response);
      } else {
        console.error("Error desconocido:", error);
      }
      throw error;
    }
  },

  getPolizaById: async (id: string) => {
    const res = await axios.get(`${apiUrl}/api/poliza/${id}`);
    return res.data;
  },
  //CREAR PÓLIZA
  createPoliza: async (
    nuevaPoliza: crearPoliza
  ): Promise<{ message: string }> => {
    try {
      console.log(nuevaPoliza);
      const response = await axios.post(`${apiUrl}/api/poliza`, nuevaPoliza);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error completo:", error);
        console.error("Response data:", error.response?.data);
        console.error("Mensaje de error:", error.response?.data?.message);
      } else {
        console.error("Error desconocido:", error);
      }
      throw error;
    }
  },

  //METODO DE BUSQEUDAD
  searchPolizas: async (
    numeroPoliza?: string,
    tipoPolizaId?: number,
    cedulaAsegurado?: string,
    nombreAsegurado?: string,
    apellidosAsegurado?: string,
    fechaVencimientoInicio?: Date,
    fechaVencimientoFin?: Date
  ): Promise<Poliza[]> => {
    try {
      const params = new URLSearchParams();

      if (numeroPoliza) params.append("numeroPoliza", numeroPoliza);
      if (tipoPolizaId) params.append("tipoPolizaId", tipoPolizaId.toString());
      if (cedulaAsegurado) params.append("cedulaAsegurado", cedulaAsegurado);
      if (nombreAsegurado) params.append("nombreAsegurado", nombreAsegurado);
      if (apellidosAsegurado)
        params.append("apellidosAsegurado", apellidosAsegurado);
      if (fechaVencimientoInicio)
        params.append(
          "fechaVencimientoInicio",
          fechaVencimientoInicio.toISOString()
        );
      if (fechaVencimientoFin)
        params.append("fechaVencimientoFin", fechaVencimientoFin.toISOString());

      const response = await axios.get(`${apiUrl}/api/poliza/Buscar`, {
        params,
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return []; 
      }
      throw new Error(error.response?.data?.message || 'Error en la búsqueda');
    }
  },

  //EDITAR PÓLIZA
  updatePoliza: async (
    numeroPoliza: string,
    datosActualizados: Partial<Poliza>
  ): Promise<void> => {
    try {
      await axios.put(
        `${apiUrl}/api/poliza/${numeroPoliza}`,
        datosActualizados
      );
    } catch (error) {
      console.error("Error al editar la póliza:", error);
      throw error;
    }
  },

  //DELETE POLIZA
  deletePoliza: async (numeroPoliza: string): Promise<void> => {
    try {
      await axios.delete(`${apiUrl}/api/poliza/${numeroPoliza}`);
    } catch (error) {
      console.error("Error al eliminar la póliza:", error);
      throw error;
    }
  },
  //OBTENER TIPO DE POLIZA
  getTiposPoliza: async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/tipoPoliza`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener los tipos de póliza", error);
      throw error;
    }
  },

  //OBTENER COBERTURAS
  getCoberturas: async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/cobertura`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener las coberturas", error);
      throw error;
    }
  },

  //OBTENER ESTADO DE POLIZA
  getEstadosPoliza: async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/estadoPoliza`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener los estados de póliza", error);
      throw error;
    }
  },
};

const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error("Error en la solicitud:", {
      message: error.message,
      code: error.code,
      url: error.config?.url,
      response: error.response?.data,
    });
  } else {
    console.error("Error desconocido:", error);
  }
};
