using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BACKEND.Models
{
    public class Poliza
    {
        [Key]
        public int NumeroPoliza { get; set; }

        [Required]
        [MaxLength(50)]
        public string TipoPoliza { get; set; }

        [Required]
        public string CedulaAsegurado { get; set; }

        [ForeignKey("CedulaAsegurado")]
        public Cliente Asegurado { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal MontoAsegurado { get; set; }
        public DateTime FechaVencimiento { get; set; }
        public DateTime FechaEmision { get; set; }

        [MaxLength(50)]
        public string Coberturas { get; set; }
        [MaxLength(50)]
        public string EstadoPoliza { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Prima { get; set; }
        public DateTime Periodo { get; set; }
        public DateTime FechaInclusion { get; set; }

        [MaxLength(100)]
        public string Aseguradora { get; set; }
    }

}
