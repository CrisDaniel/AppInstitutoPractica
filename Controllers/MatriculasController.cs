using institutoSanJuan.Data;
using institutoSanJuan.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace institutoSanJuan.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MatriculasController: ControllerBase
    {
        private readonly AppDbContext _context;
        public MatriculasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetMatriculas()
        {
            var matriculas = await _context.Matricula
                .Include(c => c.Cursos)
                .Include(c => c.Estudiante)
                .Select(c => new {
                    c.Id,
                    c.Cursos.Curso,
                    c.Estudiante.Nombre,
                    c.FechaMatricula,
                })
                .ToListAsync();

            return Ok(matriculas);
        }

        [HttpPost]
        public async Task<ActionResult<Matriculas>> PostMatriculas(Matriculas matricula)
        {
            // Verificar si el docente existe
            var matriculaExiste = await _context.Cursos.AnyAsync(d => d.Id == matricula.IdCurso);
            if (!matriculaExiste)
            {
                return BadRequest(new { mensaje = "La matrixula no existe." });
            }
            _context.Matricula.Add(matricula);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMatriculas), new { id = matricula.Id }, matricula);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutMatriculas(int id, Matriculas matricula)
        {
            if (id != matricula.Id)
                return BadRequest("El ID no coincide.");

            var matriculaExistente = await _context.Matricula.FindAsync(id);
            if (matriculaExistente == null)
                return NotFound();

            // Actualiza solo los campos permitidos
            matriculaExistente.IdCurso = matricula.IdCurso;
            matriculaExistente.IdEstudiante = matricula.IdEstudiante;
            matriculaExistente.FechaMatricula = matricula.FechaMatricula;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletMatriculas(int id)
        {
            var matricula = await _context.Matricula.FindAsync(id);
            if (matricula == null)
            {
                return NotFound();
            }

            _context.Matricula.Remove(matricula);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
