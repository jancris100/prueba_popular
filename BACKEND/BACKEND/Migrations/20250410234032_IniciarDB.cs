using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BACKEND.Migrations
{
    /// <inheritdoc />
    public partial class IniciarDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Aseguradoras",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Aseguradoras", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Clientes",
                columns: table => new
                {
                    Cedula = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PrimerApellido = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    SegundoApellido = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    TipoPersona = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    FechaNacimiento = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clientes", x => x.Cedula);
                });

            migrationBuilder.CreateTable(
                name: "EstadoPolizas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EstadoPolizas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TipoPolizas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TipoPolizas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Polizas",
                columns: table => new
                {
                    NumeroPoliza = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TipoPoliza = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CedulaAsegurado = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    MontoAsegurado = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    FechaVencimiento = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FechaEmision = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Coberturas = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    EstadoPoliza = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Prima = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Periodo = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FechaInclusion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Aseguradora = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Polizas", x => x.NumeroPoliza);
                    table.ForeignKey(
                        name: "FK_Polizas_Clientes_CedulaAsegurado",
                        column: x => x.CedulaAsegurado,
                        principalTable: "Clientes",
                        principalColumn: "Cedula",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Aseguradoras",
                columns: new[] { "Id", "Nombre" },
                values: new object[,]
                {
                    { 1, "INS" },
                    { 2, "CSS" },
                    { 3, "Popular seguros" }
                });

            migrationBuilder.InsertData(
                table: "EstadoPolizas",
                columns: new[] { "Id", "Nombre" },
                values: new object[,]
                {
                    { 1, "Activa" },
                    { 2, "Vencida" },
                    { 3, "Cancelada" }
                });

            migrationBuilder.InsertData(
                table: "TipoPolizas",
                columns: new[] { "Id", "Nombre" },
                values: new object[,]
                {
                    { 1, "Vida" },
                    { 2, "Familiar" },
                    { 3, "Vehículo" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Polizas_CedulaAsegurado",
                table: "Polizas",
                column: "CedulaAsegurado");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Aseguradoras");

            migrationBuilder.DropTable(
                name: "EstadoPolizas");

            migrationBuilder.DropTable(
                name: "Polizas");

            migrationBuilder.DropTable(
                name: "TipoPolizas");

            migrationBuilder.DropTable(
                name: "Clientes");
        }
    }
}
