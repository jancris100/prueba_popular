using BACKEND.Models;
using Microsoft.EntityFrameworkCore;

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
        public DbSet<Cobertura> Coberturas { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //RELACIONES DE POLIZAS CON CLIENTE
            modelBuilder.Entity<Poliza>()
                .HasOne(p => p.Cliente)
                .WithMany()
                .HasForeignKey(p => p.CedulaAsegurado)
                .OnDelete(DeleteBehavior.Restrict);

            //RELACIONES DE POLIZA CON ASEGURADORA
            modelBuilder.Entity<Poliza>()
                .HasOne(p => p.Cobertura)
                .WithMany()
                .HasForeignKey(p => p.CoberturaId)
                .OnDelete(DeleteBehavior.Restrict);

            //RELACIONES DE POLIZA CON TIPO_POLIZA
            modelBuilder.Entity<Poliza>()
                .HasOne(p => p.TipoPoliza)
                .WithMany()
                .HasForeignKey(p => p.TipoPolizaId)
                .OnDelete(DeleteBehavior.Restrict);

            //RELACIONES DE POLIZA CON ESTADO_POLIZA
            modelBuilder.Entity<Poliza>()
                .HasOne(p => p.EstadoPoliza)
                .WithMany()
                .HasForeignKey(p => p.EstadoPolizaId)
                .OnDelete(DeleteBehavior.Restrict);

            //INSERT DATOS DE PRUEBA
            //SE TOMA EN BASE AL PUNTO 
            //4.Los datos de prueba deben ser generados por el analista
            modelBuilder.Entity<TipoPoliza>().HasData(
                new TipoPoliza { Id = 1, Nombre = "Vivienda" },
                new TipoPoliza { Id = 2, Nombre = "Vehículo" }
             );

            modelBuilder.Entity<Cobertura>().HasData(
                new Cobertura { Id = 1, Nombre = "Robo" },
                new Cobertura { Id = 2, Nombre = "Accidente" },
                new Cobertura { Id = 3, Nombre = "Daños por desastre natural" }
             );

            modelBuilder.Entity<EstadoPoliza>().HasData(
                new EstadoPoliza { Id = 1, Nombre = "Activa" },
                new EstadoPoliza { Id = 2, Nombre = "Vencida" },
                new EstadoPoliza { Id = 3, Nombre = "Cancelada" }
             );

            modelBuilder.Entity<Cliente>().HasData(
               new Cliente
               {
                   Cedula = "402321325",
                   Nombre = "Juan",
                   PrimerApellido = "Pérez",
                   SegundoApellido = "Ramírez",
                   TipoPersona = "Física",
                   FechaNacimiento = new DateTime(1990, 5, 21)
               },
               new Cliente
               {
                   Cedula = "402321327",
                   Nombre = "María",
                   PrimerApellido = "Gómez",
                   SegundoApellido = "Torres",
                   TipoPersona = "Física",
                   FechaNacimiento = new DateTime(1985, 3, 14)
               },
               new Cliente
               {
                   Cedula = "402321321",
                   Nombre = "Carlos",
                   PrimerApellido = "Hernández",
                   SegundoApellido = "Vargas",
                   TipoPersona = "Física",
                   FechaNacimiento = new DateTime(1992, 11, 2)
               },
               new Cliente
               {
                   Cedula = "402321322",
                   Nombre = "Ana",
                   PrimerApellido = "Morales",
                   SegundoApellido = "Lopez",
                   TipoPersona = "Física",
                   FechaNacimiento = new DateTime(1998, 7, 9)
               },
               new Cliente
               {
                   Cedula = "402321323",
                   Nombre = "Luis",
                   PrimerApellido = "Martínez",
                   SegundoApellido = "Soto",
                   TipoPersona = "Física",
                   FechaNacimiento = new DateTime(1980, 1, 30)
               }
            );
            modelBuilder.Entity<User>().HasData(
               new User
               {
                   Id = 1,
                   UserName = "adminUser",
                   Password = "adminPassword",
                   Email = "admin@gmmail.com",
                   Role = "Admin"
               },
               new User
               {
                   Id = 2,
                   UserName = "regularUser",
                   Password = "userPassword",
                   Email = "admin@outlock.com",
                   Role = "User"
               }
    );
        }
    }

}
