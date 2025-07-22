using institutoSanJuan.Data;
using institutoSanJuan.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace institutoSanJuan.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DocenteController: ControllerBase
    {
        private readonly AppDbContext _context;
        public DocenteController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetDocentes()
        {
            var docentes = await _context.Docente
                .Select(d => new {
                    d.Id,
                    d.Apellidos,
                    d.Nombres,
                    NombreCompleto = d.Apellidos + " " + d.Nombres,
                    d.Profesion,
                    d.FechaNacimiento,
                    d.Correo
                }).ToListAsync();

            return Ok(docentes);
        }
        /*public async Task<ActionResult<IEnumerable<Docente>>> GetDocentes()
        {
            //productos nombre de la tabla
            return await _context.Docente.ToListAsync();
        }*/

        //Obtener los cursos mediante el ciclo
        [HttpGet("apellidos/{apellido}")]
        public async Task<ActionResult<IEnumerable<object>>> GetDocentePorApellido(string apellido)
        {
            var docentes = await _context.Docente
                .Where(c => c.Apellidos == apellido)
                .Select(c => new    
                {
                    c.Id,
                    c.Apellidos,
                    c.Nombres,  
                    NombreCompleto = c.Apellidos + " " + c.Nombres,
                    c.Profesion,
                    c.FechaNacimiento,
                    c.Correo
                })
                .ToListAsync();

            if (docentes == null || docentes.Count == 0)
            {
                return NotFound(new { mensaje = "No se encontro docente." });
            }

            return Ok(docentes);
        }

        [HttpPost]
        public async Task<ActionResult<Docente>> PostDocente(Docente docentes)
        {
            // Verificar si el docente existe
            /*var docenteExiste = await _context.Docente.AnyAsync(d => d.Id == docentes.Id);
            if (docenteExiste)
            {
                return BadRequest(new { mensaje = "El docente EXISTE." });
            }*/
            _context.Docente.Add(docentes);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetDocentes), new { id = docentes.Id }, docentes);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDocentes(int id, Docente docentes)
        {
            if (id != docentes.Id)
            {
                return BadRequest();
            }
            _context.Entry(docentes).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();

            /*if (id != cursos.Id)
                return BadRequest("El ID no coincide.");

            var cursoExistente = await _context.Cursos.FindAsync(id);
            if (cursoExistente == null)
                return NotFound();

            // Actualiza solo los campos permitidos
            cursoExistente.Curso = cursos.Curso;
            cursoExistente.Creditos = cursos.Creditos;
            cursoExistente.HorasSemanal = cursos.HorasSemanal;
            cursoExistente.Ciclo = cursos.Ciclo;
            cursoExistente.IdDocente = cursos.IdDocente;

            await _context.SaveChangesAsync();
            return NoContent();*/
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletDocentes(int id)
        {
            var docente = await _context.Docente.FindAsync(id);
            if (docente == null)
            {
                return NotFound();
            }

            _context.Docente.Remove(docente);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
