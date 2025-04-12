using System.ComponentModel.DataAnnotations;

namespace BACKEND.Models
{
    public class User
    {
        public int Id { get; set; }
        [MaxLength(20)]
        public string UserName { get; set; }
        [MaxLength(20)]
        public string Password { get; set; }
        [MaxLength(20)]
        public string Email { get; set; }

        [MaxLength(20)]
        public string Role { get; set; }
    }
}
