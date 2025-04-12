using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BACKEND.Models
{
    public class Poliza
    {
        [Key]
        [Required]
        [MaxLength(20)]
        public string NumeroPoliza { get; set; }

        [Required]
        public int TipoPolizaId { get; set; }

        [ForeignKey("TipoPolizaId")]
        public TipoPoliza TipoPoliza { get; set; }

        [Required]
        [MaxLength(20)]
        public string CedulaAsegurado { get; set; }

        [ForeignKey("CedulaAsegurado")]
        public Cliente Cliente { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal MontoAsegurado { get; set; }
        public DateTime FechaVencimiento { get; set; }
        public DateTime FechaEmision { get; set; }

        [Required]
        public int CoberturaId { get; set; }

        [ForeignKey("CoberturaId")]
        public Cobertura Cobertura { get; set; }

        [Required]
        public int EstadoPolizaId { get; set; }

        [ForeignKey("EstadoPolizaId")]
        public EstadoPoliza EstadoPoliza { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Prima { get; set; }
        public DateTime Periodo { get; set; }
        public DateTime FechaInclusion { get; set; }

        [Required]
        public string Aseguradora { get; set; }

    }

}
