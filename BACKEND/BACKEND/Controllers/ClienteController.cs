using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BACKEND.Data;

namespace BACKEND.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ClienteController(AppDbContext context)
        {
            _context = context;
        }

        //RUTA GET
        //api/Cliente
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cliente>>> GetClientes()
        {
            return await _context.Clientes.ToListAsync();
        }

        //RUTA GET POR CEDULA
        //api/Cliente/{cedula}
        [HttpGet("{cedula}")]
        public async Task<ActionResult<Cliente>> GetCliente(string cedula)
        {
            var cliente = await _context.Clientes.FindAsync(cedula);
            //VALIDMAOS SI EXISTE EL CLIENTE
            if (cliente == null)
            {
                return NotFound();
            }
            return Ok(cliente);
        }

        //RUTA POST 
        //api/Cliente
         [HttpPost]
        public async Task<ActionResult<Cliente>> PostCliente(Cliente cliente)
        {
            _context.Clientes.Add(cliente);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCliente), new { cedula = cliente.Cedula }, cliente);
        }

        //RUTA PUT
        //api/Cliente
        [HttpPut("{cedula}")]
        public async Task<IActionResult> PutCliente(string cedula, Cliente cliente)
        {
            //SE VALIDA SI LA CEDULA EXISTE
            if (cedula != cliente.Cedula)
            {
                return BadRequest("La cédula de la ruta no coincide con la del cuerpo.");
            }

            var existe = await _context.Clientes.AnyAsync(c => c.Cedula == cedula);
            if (!existe)
            {
                return NotFound();
            }

            _context.Entry(cliente).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return NoContent();
        }

        //RUTA DELETE
        //api/Cliente/{cedula}
        [HttpDelete("{cedula}")]
        public async Task<IActionResult> DeleteCliente(string cedula)
        {
            var cliente = await _context.Clientes.FindAsync(cedula);
            if (cliente == null)
            {
                return NotFound();
            }

            _context.Clientes.Remove(cliente);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        //FUNCION DE COMPROBACION 
        private bool ClienteExists(string cedula)
        {
            return _context.Clientes.Any(e => e.Cedula == cedula);
        }

    }
}
