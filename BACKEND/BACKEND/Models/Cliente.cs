using BACKEND.Models;
using System.ComponentModel.DataAnnotations;
// ENTIDAD CLIENTE 
public class Cliente
{
    [Key]
    [Required]
    public string Cedula { get; set; }

    [Required]
    [MaxLength(100)]
    public string Nombre { get; set; }
    [Required]
    [MaxLength(50)]
    public string PrimerApellido { get; set; }

    [Required]
    [MaxLength(50)]
    public string SegundoApellido { get; set; }

    [Required]
    [MaxLength(20)]
    public string TipoPersona { get; set; }

    public DateTime FechaNacimiento { get; set; }
}
