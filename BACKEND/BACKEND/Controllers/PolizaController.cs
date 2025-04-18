﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BACKEND.Data;
using BACKEND.DTOs;
using BACKEND.Models;

namespace BACKEND.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PolizaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PolizaController(AppDbContext context)
        {
            _context = context;
        }

        //RUTA GET
        //api/Poliza
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Poliza>>> GetPolizas()
        {
            //MAPEO PARA LOGRAR MOSTRARLOS EN EL GET
            var polizas = await _context.Polizas
                .Include(p => p.TipoPoliza)
                .Include(p => p.Cobertura)
                .Include(p => p.Cliente)
                .Include(p => p.EstadoPoliza)
                .ToListAsync();

            return Ok(polizas);
        }


        //RUTA GET POR ID
        //api/Poliza/{id}
        [HttpGet("{numeroPoliza}")]
        public async Task<ActionResult<Poliza>> GetPoliza(string numeroPoliza)
        {
            //MAPEO PARA LOGRAR MOSTRARLOS EN EL GET
            var poliza = await _context.Polizas
                .Include(p => p.TipoPoliza)
                .Include(p => p.Cobertura)
                .Include(p => p.Cliente)
                .Include(p => p.EstadoPoliza)
                .FirstOrDefaultAsync(p => p.NumeroPoliza == numeroPoliza);

            if (poliza == null)
            {
                return NotFound();
            }

            return Ok(poliza);
        }
        //RUTA GET PARA BUSCAR
        //buscar/Poliza/{id}
        [HttpGet("Buscar")]
        public async Task<ActionResult<IEnumerable<Poliza>>> BuscarPolizas(
            [FromQuery] string? numeroPoliza,
            [FromQuery] int? tipoPolizaId,
            [FromQuery] string? cedulaAsegurado,
            [FromQuery] string? nombreAsegurado,
            [FromQuery] string? apellidosAsegurado,
            [FromQuery] DateTime? fechaVencimientoInicio,
            [FromQuery] DateTime? fechaVencimientoFin)
        {
            IQueryable<Poliza> query = _context.Polizas
                .Include(p => p.TipoPoliza)
                .Include(p => p.Cobertura)
                .Include(p => p.Cliente)
                .Include(p => p.EstadoPoliza)
                .AsQueryable();

            //FILTROS 
            if (!string.IsNullOrEmpty(numeroPoliza))
                query = query.Where(p => p.NumeroPoliza.Contains(numeroPoliza));

            if (tipoPolizaId.HasValue)
                query = query.Where(p => p.TipoPolizaId == tipoPolizaId);

            if (!string.IsNullOrEmpty(cedulaAsegurado))
                query = query.Where(p => p.CedulaAsegurado.Contains(cedulaAsegurado));

            if (!string.IsNullOrEmpty(nombreAsegurado))
                query = query.Where(p => p.Cliente.Nombre.Contains(nombreAsegurado));

            if (!string.IsNullOrEmpty(apellidosAsegurado))
                query = query.Where(p => p.Cliente.PrimerApellido.Contains(apellidosAsegurado));

            if (fechaVencimientoInicio.HasValue && fechaVencimientoFin.HasValue)
                query = query.Where(p => p.FechaVencimiento >= fechaVencimientoInicio
                                      && p.FechaVencimiento <= fechaVencimientoFin);

  
            List<Poliza> resultados = await query.ToListAsync();

            if (!resultados.Any())
                return NotFound("No se encontraron pólizas");

            return Ok(resultados);
        }

        //RUTA POST 
        //api/Poliza
        [HttpPost]
        public async Task<ActionResult<Poliza>> PostPoliza(PolizaDto polizaDto)
        {
            //VALIDAMOS SI LA CEDULA EXISTE
            var clienteExiste = await _context.Clientes.AnyAsync(c => c.Cedula == polizaDto.CedulaAsegurado);
            if (!clienteExiste)
            {
                return BadRequest(new { message = $"No se encontró un cliente con la cédula {polizaDto.CedulaAsegurado}. Primero debe registrarlo." });
            }
            //GUARDAMOS POLIZA CON RESPECTO AL DTO CREADO
            //MAPEAMOS LAS VARIABLES PARA PROCEDER
            var poliza = new Poliza
            {
                NumeroPoliza = polizaDto.NumeroPoliza,
                TipoPolizaId = polizaDto.TipoPolizaId,
                CedulaAsegurado = polizaDto.CedulaAsegurado,
                MontoAsegurado = polizaDto.MontoAsegurado,
                FechaVencimiento = polizaDto.FechaVencimiento,
                FechaEmision = polizaDto.FechaEmision,
                CoberturaId = polizaDto.CoberturaId,
                EstadoPolizaId = polizaDto.EstadoPolizaId,
                Prima = polizaDto.Prima,
                Periodo = polizaDto.Periodo,
                FechaInclusion = polizaDto.FechaInclusion,
                Aseguradora = polizaDto.Aseguradora
            };

            _context.Polizas.Add(poliza);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPoliza), new { numeroPoliza = poliza.NumeroPoliza }, poliza);
        }

        //RUTA PUT
        //api/Poliza
        [HttpPut("{numeroPoliza}")]
        public async Task<IActionResult> PutPoliza(string numeroPoliza, PolizaDto polizaDto)
        {
            var poliza = await _context.Polizas.FindAsync(numeroPoliza);
            if (poliza == null)
            {
                return NotFound();
            }

            //MAPEAMOS CON EL DTO PARA ACTUALIZAR
            poliza.NumeroPoliza = polizaDto.NumeroPoliza;
            poliza.TipoPolizaId = polizaDto.TipoPolizaId;
            poliza.CedulaAsegurado = polizaDto.CedulaAsegurado;
            poliza.MontoAsegurado = polizaDto.MontoAsegurado;
            poliza.FechaVencimiento = polizaDto.FechaVencimiento;
            poliza.FechaEmision = polizaDto.FechaEmision;
            poliza.EstadoPolizaId = polizaDto.EstadoPolizaId;
            poliza.Prima = polizaDto.Prima;
            poliza.Periodo = polizaDto.Periodo;
            poliza.FechaInclusion = polizaDto.FechaInclusion;
            poliza.Aseguradora = polizaDto.Aseguradora;

            _context.Entry(poliza).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PolizaExists(numeroPoliza))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        //RUTA DELETE
        //api/Poliza/{numeroPoliza}
        [HttpDelete("{numeroPoliza}")]
        public async Task<IActionResult> DeleteCliente(string numeroPoliza)
        {
            var poliza = await _context.Polizas.FindAsync(numeroPoliza);
            if (poliza == null)
            {
                return NotFound();
            }

            _context.Polizas.Remove(poliza);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        //FUNCION DE COMPROBACION 
        private bool PolizaExists(string numeroPoliza)
        {
            return _context.Polizas.Any(e => e.NumeroPoliza == numeroPoliza);
        }

    }
}
