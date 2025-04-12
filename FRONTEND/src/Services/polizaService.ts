// src/services/polizaService.ts
import axios from "axios";
import { Poliza } from "../Interfaces/Polizas";

// VARIABLE RUTA
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

//OBTENER POLIZAS
export const polizaService = {
  // Obtener Pólizas
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
