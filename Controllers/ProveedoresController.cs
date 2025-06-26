using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using appComercial.Data;
using appComercial.Models;
using Microsoft.AspNetCore.Http.HttpResults;

namespace appComercial.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProveedoresController:ControllerBase
    {
        private readonly AppDbContext _context;
        public ProveedoresController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Proveedores>>> GetProveedores()
        {
            //productos nombre de la tabla
            return await _context.proveedores.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Proveedores>> GetProveedores(int id)
        {
            var proveedores = await _context.proveedores.FindAsync(id);
            if (proveedores == null)
            {
                return NotFound();
            }
            return proveedores;
        }

        [HttpPost]
        public async Task<ActionResult<Proveedores>> PostProveedores(Proveedores proveedor)
        {
            _context.proveedores.Add(proveedor);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProveedores), new { id = proveedor.Id }, proveedor);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProveedores(int id, Proveedores proveedor)
        {
            if (id != proveedor.Id)
            {
                return BadRequest();
            }
            _context.Entry(proveedor).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        //Solo cambiar el precio
        [HttpPatch("{id}/nombre")]
        public async Task<IActionResult> PatchProveedores(int id, [FromBody] string newProveedor)
        {
            var proveedor = await _context.proveedores.FindAsync(id);
            if (proveedor == null)
            {
                return NotFound();
            }
            proveedor.Nombre = newProveedor;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletProveedores(int id)
        {
            var proveedor = await _context.proveedores.FindAsync(id);
            if (proveedor == null)
            {
                return NotFound();
            }

            _context.proveedores.Remove(proveedor);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
