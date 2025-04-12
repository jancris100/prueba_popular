using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BACKEND.Data;
using BACKEND.Models;

namespace BACKEND.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoberturaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CoberturaController(AppDbContext context)
        {
            _context = context;
        }

        //RUTA GET
        //api/Coberturas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cobertura>>> GetCoberturas()
        {
            return await _context.Coberturas.ToListAsync();
        }

        //RUTA GET POR ID
        //api/Coberturas/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Cobertura>> GetEstadoPoliza(int id)
        {
            var aseguradora = await _context.Coberturas.FindAsync(id);

            if (aseguradora == null)
            {
                return NotFound();
            }
            return Ok(aseguradora);
        }

        //SOLO GET YA QUE LOS DATOS SE CREAN CON LAS MIGRATIONS
    }
}
