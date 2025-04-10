using BACKEND.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace BACKEND.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        //CONEXION A CLIENTE
        public DbSet<Cliente> Clientes { get; set; }

        //CONEXION DE POLIZAS
        public DbSet<Poliza> Polizas { get; set; }
        //CONEXION A LOS DATOS DE PRUEBA PARA LISTAS DESPEGABLES
        public DbSet<TipoPoliza> TipoPolizas { get; set; }
        public DbSet<EstadoPoliza> EstadoPolizas { get; set; }
        public DbSet<Aseguradora> Aseguradoras { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //RELACIONES DE POLIZAS CON CLIENTE
            modelBuilder.Entity<Cliente>()
                .HasMany(c => c.Polizas)
                .WithOne(p => p.Asegurado)
                .HasForeignKey(p => p.CedulaAsegurado)
                .OnDelete(DeleteBehavior.Restrict);

            //INSERT DATOS DE PRUEBA
            //SE TOMA EN BASE AL PUNTO 
            //4.Los datos de prueba deben ser generados por el analista
            modelBuilder.Entity<TipoPoliza>().HasData(
                new TipoPoliza { Id = 1, Nombre = "Vida" },
                new TipoPoliza { Id = 2, Nombre = "Familiar" },
                new TipoPoliza { Id = 3, Nombre = "Vehículo" }
             );

            modelBuilder.Entity<Aseguradora>().HasData(
                new Aseguradora { Id = 1, Nombre = "INS" },
                new Aseguradora { Id = 2, Nombre = "CSS" },
                new Aseguradora { Id = 3, Nombre = "Popular seguros" }
             );

            modelBuilder.Entity<EstadoPoliza>().HasData(
                new EstadoPoliza { Id = 1, Nombre = "Activa" },
                new EstadoPoliza { Id = 2, Nombre = "Vencida" },
                new EstadoPoliza { Id = 3, Nombre = "Cancelada" }
             );
        }
    }

}
