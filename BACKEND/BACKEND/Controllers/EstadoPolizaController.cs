using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BACKEND.Data;
using BACKEND.Models;

namespace BACKEND.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstadoPolizaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EstadoPolizaController(AppDbContext context)
        {
            _context = context;
        }

        //RUTA GET
        //api/EstadoPoliza
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EstadoPoliza>>> GetEstadoPolizas()
        {
            return await _context.EstadoPolizas.ToListAsync();
        }

        //RUTA GET POR ID
        //api/EstadoPoliza/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<EstadoPoliza>> GetEstadoPoliza(int id)
        {
            var estadoPoliza = await _context.EstadoPolizas.FindAsync(id);

            if (estadoPoliza == null)
            {
                return NotFound();
            }
            return Ok(estadoPoliza);
        }

        //SOLO GET YA QUE LOS DATOS SE CREAN CON LAS MIGRATIONS
    }
}
