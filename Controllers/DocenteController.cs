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
                    NombreCompleto = d.Nombres + " " + d.Apellidos
                }).ToListAsync();

            return Ok(docentes);
        }
    }
}
