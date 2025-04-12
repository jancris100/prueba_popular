using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BACKEND.Data;
using BACKEND.Models;
using BACKEND.DTOs;

namespace BACKEND.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }
        //RUTA DE LOGIN
        //api/auth/login
        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginDto loginDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == loginDto.UserName);

            if (user == null || user.Password != loginDto.Password)
            {
                return Unauthorized("Nombre de usuario o contraseña incorrectos.");
            }

            if (user.Role != "Admin")
            {
                return Unauthorized("El usuario no tiene permisos para acceder al sistema.");
            }

            return Ok(new { message = "Login exitoso" });
        }
    }
}
