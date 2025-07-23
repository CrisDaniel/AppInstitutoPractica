using institutoSanJuan.Data;
using institutoSanJuan.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace institutoSanJuan.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotasController:ControllerBase
    {
        private readonly AppDbContext _context;
        public NotasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetNotas()
        {
            var notas = await _context.Notas
                .Include(c => c.Cursos)
                .Include(c => c.Estudiante)
                .Select(c => new {
                    c.Id,
                    c.Cursos.Curso,
                    c.Estudiante.Nombre,
                    c.Ponderacion,
                })
                .ToListAsync();

            return Ok(notas);
        }

        [HttpPost]
        public async Task<ActionResult<Notas>> PostNotas(Notas nota)
        {
            // Verificar si la nota existe
            var notaExiste = await _context.Cursos.AnyAsync(d => d.Id == nota.IdCurso);
            if (!notaExiste)
            {
                return BadRequest(new { mensaje = "La nota no existe." });
            }
            _context.Notas.Add(nota);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetNotas), new { id = nota.Id }, nota);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutNotas(int id, Notas nota)
        {
            if (id != nota.Id)
                return BadRequest("El ID no coincide.");

            var notaExistente = await _context.Notas.FindAsync(id);
            if (notaExistente == null)
                return NotFound();

            // Actualiza solo los campos permitidos
            notaExistente.IdCurso = nota.IdCurso;
            notaExistente.IdEstudiante = nota.IdEstudiante;
            notaExistente.Ponderacion = nota.Ponderacion;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletNotas(int id)
        {
            var nota = await _context.Notas.FindAsync(id);
            if (nota == null)
            {
                return NotFound();
            }

            _context.Notas.Remove(nota);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
