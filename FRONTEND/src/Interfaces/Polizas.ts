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

export interface crearPoliza {
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

export interface PolizaFormProps {
  form: Poliza;
  setForm: React.Dispatch<React.SetStateAction<Poliza>>;
  handleSubmit: (e: React.FormEvent) => Promise<void>; 
  modo: 'crear' | 'editar'; 
}