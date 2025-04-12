namespace BACKEND.DTOs
{
    public class PolizaDto
    {
        public string NumeroPoliza { get; set; }
        public int TipoPolizaId { get; set; }
        public string CedulaAsegurado { get; set; }
        public decimal MontoAsegurado { get; set; }
        public DateTime FechaVencimiento { get; set; }
        public DateTime FechaEmision { get; set; }
        public int CoberturaId { get; set; }
        public int EstadoPolizaId { get; set; }
        public decimal Prima { get; set; }
        public DateTime Periodo { get; set; }
        public DateTime FechaInclusion { get; set; }
        public string Aseguradora { get; set; }
    }
}
