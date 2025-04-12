using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BACKEND.Data;
using BACKEND.Models;

namespace BACKEND.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoPolizaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TipoPolizaController(AppDbContext context)
        {
            _context = context;
        }

        //RUTA GET
        //api/TipoPoliza
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoPoliza>>> GetTipoPolizas()
        {
            return await _context.TipoPolizas.ToListAsync();
        }

        //RUTA GET POR ID
        //api/TipoPoliza/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TipoPoliza>> GetTipoPoliza(int id)
        {
            var tipoPoliza = await _context.TipoPolizas.FindAsync(id);

            if (tipoPoliza == null)
            {
                return NotFound();
            }
            return Ok(tipoPoliza);
        }

        //SOLO GET YA QUE LOS DATOS SE CREAN CON LAS MIGRATIONS
    }
}
