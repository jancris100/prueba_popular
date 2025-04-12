export interface Poliza {
  numeroPoliza: string;
  tipoPolizaId: number;
  cedulaAsegurado: string;
  montoAsegurado: number;
  fechaVencimiento: string;
  fechaEmision: string;
  coberturaId: number;
  estadoPolizaId: number;
  prima: number;
  periodo: string;
  fechaInclusion: string;
  aseguradora: string;
  tipoPoliza?: TipoPoliza;
  cobertura?: Cobertura;
  estadoPoliza?: EstadoPoliza;
}

export interface TipoPoliza {
  id: number;
  nombre: string;
}

export interface Cobertura {
  id: number;
  nombre: string;
}

export interface EstadoPoliza {
  id: number;
  nombre: string;
}
