using institutoSanJuan.Data;
using institutoSanJuan.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace institutoSanJuan.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EstudiantesController: ControllerBase
    {

        private readonly AppDbContext _context;
        public EstudiantesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        /*public async Task<IActionResult> GetEstudiantes()
        {
            var estudiantes = await _context.Estudiantes
                .Select(d => new {
                    d.Id,
                    d.Nombre,
                    d.Dni,
                    d.Correo
                }).ToListAsync();

            return Ok(estudiantes);
        }*/
        public async Task<ActionResult<IEnumerable<Estudiantes>>> GetEstudiantes()
        {
            //productos nombre de la tabla
            return await _context.Estudiante.ToListAsync();
        }
        
        //Obtener los estudiantes mediante el dni----------------------------------------
        [HttpGet("dni/{dni}")]
        public async Task<ActionResult<IEnumerable<object>>> GetEstudiantePorDni(string dni)
        {
            var estudiante = await _context.Estudiante
                .Where(c => c.Dni == dni)
                .Select(c => new
                {
                    c.Id,
                    c.Nombre,
                    c.Dni,
                    c.Correo
                })
                .ToListAsync();

            if (estudiante == null || estudiante.Count == 0)
            {
                return NotFound(new { mensaje = "No se encontro estudiante." });
            }

            return Ok(estudiante);
        }

        [HttpPost]
        public async Task<ActionResult<Estudiantes>> PostEstudiantes(Estudiantes estudiantes)
        {
            _context.Estudiante.Add(estudiantes);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetEstudiantes), new { id = estudiantes.Id }, estudiantes);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEstudiantes(int id, Estudiantes estudiantes)
        {
            if (id != estudiantes.Id)
            {
                return BadRequest();
            }
            _context.Entry(estudiantes).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletEstudiantes(int id)
        {
            var estudiante = await _context.Estudiante.FindAsync(id);
            if (estudiante == null)
            {
                return NotFound();
            }

            _context.Estudiante.Remove(estudiante);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
