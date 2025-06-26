
using Microsoft.EntityFrameworkCore;
using appComercial.Models;

namespace appComercial.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Producto> productos { get; set; }
        public DbSet<Categoria> categorias { get; set; }
        public DbSet<Proveedores> proveedores { get; set; }
    }
}
