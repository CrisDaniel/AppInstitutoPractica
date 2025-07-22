using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using institutoSanJuan.Data;
using institutoSanJuan.Models;
using Microsoft.AspNetCore.Http.HttpResults;

namespace institutoSanJuan.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CursosController: ControllerBase
    {
        private readonly AppDbContext _context;
        public CursosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetCursos()
        {
            var cursos = await _context.Cursos
                .Include(c => c.Docente)
                .Select(c => new {
                    c.Id,
                    c.Curso,
                    c.Creditos,
                    c.HorasSemanal,
                    c.Ciclo,
                    Docente = c.Docente.Apellidos + " " + c.Docente.Nombres
                })
                .ToListAsync();

            return Ok(cursos);
        }
        //Trae todo la informacion de cursos, incluso el id del profesor
        /*public async Task<ActionResult<IEnumerable<Cursos>>> GetCursos()
        {
            //productos nombre de la tabla
            return await _context.Cursos.ToListAsync();
        }*/

        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetCursos(int id)
        {
            var curso = await _context.Cursos
                .Include(c => c.Docente)
                .Where(c => c.Id == id)
                .Select(c => new
                {
                    c.Id,
                    c.Curso,
                    c.Creditos,
                    c.HorasSemanal,
                    c.Ciclo,
                    NombreDocente = c.Docente.Nombres  // asumiendo que "Nombre" está en la clase Docente
                })
                .FirstOrDefaultAsync();

            if (curso == null)
            {
                return NotFound();
            }

            return Ok(curso);
        }
        //Obtiene los cursos por id pero incluye el id del profesor
        /*public async Task<ActionResult<Cursos>> GetCursos(int id)
        {
            var cursos = await _context.Cursos.FindAsync(id);
            if (cursos == null)
            {
                return NotFound();
            }
            return cursos;
        }*/

        //Obtener los cursos mediante el ciclo
        [HttpGet("ciclo/{ciclo}")]
        public async Task<ActionResult<IEnumerable<object>>> GetCursosPorCiclo(string ciclo)
        {
            var cursos = await _context.Cursos
                .Include(c => c.Docente)
                .Where(c => c.Ciclo == ciclo)
                .Select(c => new
                {
                    c.Id,
                    c.Curso,
                    c.Creditos,
                    c.HorasSemanal,
                    c.Ciclo,
                    NombreDocente = c.Docente.Nombres
                })
                .ToListAsync();

            if (cursos == null || cursos.Count == 0)
            {
                return NotFound(new { mensaje = "No se encontraron cursos para el ciclo indicado." });
            }

            return Ok(cursos);
        }

        [HttpPost]
        public async Task<ActionResult<Cursos>> PostCursos(Cursos cursos)
        {
            // Verificar si el docente existe
            var docenteExiste = await _context.Docente.AnyAsync(d => d.Id == cursos.IdDocente);
            if (!docenteExiste)
            {
                return BadRequest(new { mensaje = "El docente no existe." });
            }
            _context.Cursos.Add(cursos);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCursos), new { id = cursos.Id }, cursos);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCursos(int id, Cursos cursos)
        {
            /*if (id != cursos.Id)
            {
                return BadRequest();
            }
            _context.Entry(cursos).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();*/
            if (id != cursos.Id)
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
            return NoContent();
        }

        //Solo cambiar el precio
        /*[HttpPatch("{id}/nombre")]
        public async Task<IActionResult> PatchCategoria(int id, [FromBody] string newCategoria)
        {
            var categoria = await _context.categorias.FindAsync(id);
            if (categoria == null)
            {
                return NotFound();
            }
            categoria.Nombre = newCategoria;
            await _context.SaveChangesAsync();
            return NoContent();
        }*/

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletCursos(int id)
        {
            var cursos = await _context.Cursos.FindAsync(id);
            if (cursos == null)
            {
                return NotFound();
            }

            _context.Cursos.Remove(cursos);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
