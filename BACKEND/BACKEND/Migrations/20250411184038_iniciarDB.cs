using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BACKEND.Migrations
{
    /// <inheritdoc />
    public partial class iniciarDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                name: "Coberturas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Coberturas", x => x.Id);
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
                    NumeroPoliza = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TipoPolizaId = table.Column<int>(type: "int", nullable: false),
                    CedulaAsegurado = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    MontoAsegurado = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    FechaVencimiento = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FechaEmision = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CoberturaId = table.Column<int>(type: "int", nullable: false),
                    EstadoPolizaId = table.Column<int>(type: "int", nullable: false),
                    Prima = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Periodo = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FechaInclusion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Aseguradora = table.Column<string>(type: "nvarchar(max)", nullable: false)
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
                    table.ForeignKey(
                        name: "FK_Polizas_Coberturas_CoberturaId",
                        column: x => x.CoberturaId,
                        principalTable: "Coberturas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Polizas_EstadoPolizas_EstadoPolizaId",
                        column: x => x.EstadoPolizaId,
                        principalTable: "EstadoPolizas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Polizas_TipoPolizas_TipoPolizaId",
                        column: x => x.TipoPolizaId,
                        principalTable: "TipoPolizas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Clientes",
                columns: new[] { "Cedula", "FechaNacimiento", "Nombre", "PrimerApellido", "SegundoApellido", "TipoPersona" },
                values: new object[,]
                {
                    { "402321321", new DateTime(1992, 11, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "Carlos", "Hernández", "Vargas", "Física" },
                    { "402321322", new DateTime(1998, 7, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), "Ana", "Morales", "Lopez", "Física" },
                    { "402321323", new DateTime(1980, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), "Luis", "Martínez", "Soto", "Física" },
                    { "402321325", new DateTime(1990, 5, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), "Juan", "Pérez", "Ramírez", "Física" },
                    { "402321327", new DateTime(1985, 3, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), "María", "Gómez", "Torres", "Física" }
                });

            migrationBuilder.InsertData(
                table: "Coberturas",
                columns: new[] { "Id", "Nombre" },
                values: new object[,]
                {
                    { 1, "Robo" },
                    { 2, "Accidente" },
                    { 3, "Daños por desastre natural" }
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
                    { 1, "Vivienda" },
                    { 2, "Vehículo" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Polizas_CedulaAsegurado",
                table: "Polizas",
                column: "CedulaAsegurado");

            migrationBuilder.CreateIndex(
                name: "IX_Polizas_CoberturaId",
                table: "Polizas",
                column: "CoberturaId");

            migrationBuilder.CreateIndex(
                name: "IX_Polizas_EstadoPolizaId",
                table: "Polizas",
                column: "EstadoPolizaId");

            migrationBuilder.CreateIndex(
                name: "IX_Polizas_TipoPolizaId",
                table: "Polizas",
                column: "TipoPolizaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Polizas");

            migrationBuilder.DropTable(
                name: "Clientes");

            migrationBuilder.DropTable(
                name: "Coberturas");

            migrationBuilder.DropTable(
                name: "EstadoPolizas");

            migrationBuilder.DropTable(
                name: "TipoPolizas");
        }
    }
}
