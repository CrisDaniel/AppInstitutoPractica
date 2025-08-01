﻿
using Microsoft.EntityFrameworkCore;
using institutoSanJuan.Models;

namespace institutoSanJuan.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Cursos> Cursos { get; set; }
        public DbSet<Docente> Docente { get; set; }
        public DbSet<Estudiantes> Estudiante { get; set; }
        public DbSet<Matriculas> Matricula { get; set; }
        public DbSet<Notas> Notas { get; set; }
    }
}
