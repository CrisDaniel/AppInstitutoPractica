using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using appComercial.Data;
using appComercial.Models;
using Microsoft.AspNetCore.Http.HttpResults;

namespace appComercial.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductosController:ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductosController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Producto>>> GetProducto()
        {
            //productos nombre de la tabla
            return await _context.productos.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Producto>> GetProducto(int id)
        {
            var producto = await _context.productos.FindAsync(id);
            if (producto==null)
            {
                return NotFound();
            }
            return producto;
        }

        [HttpPost]
        public async Task<ActionResult<Producto>> PostProducto(Producto producto)
        {
            _context.productos.Add(producto);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProducto), new { id = producto.Id }, producto );
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProducto(int id, Producto producto)
        {
            if (id != producto.Id)
            {
                return BadRequest();
            }
            _context.Entry(producto).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        //Solo cambiar el precio
        [HttpPatch("{id}/precio")]
        public async Task<IActionResult> PatchProducto(int id, [FromBody] decimal newPrecio)
        {
            var producto = await _context.productos.FindAsync(id);
            if (producto == null)
            {
                return NotFound();
            }
            producto.Precio = newPrecio;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletProduct(int id)
        {
            var producto = await _context.productos.FindAsync(id);
            if (producto == null)
            {
                return NotFound();
            }

            _context.productos.Remove(producto);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
