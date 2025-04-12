using System.ComponentModel.DataAnnotations;

namespace BACKEND.Models
{
    public class TipoPoliza
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(100)]
        [Required]
        public string Nombre { get; set; }
    }
}
