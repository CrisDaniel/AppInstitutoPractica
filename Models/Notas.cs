using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace institutoSanJuan.Models
{
    public class Notas
    {
        public int Id { get; set; }
        [ForeignKey("Cursos")]
        public int IdCurso { get; set; }
        [ForeignKey("Estudiante")]
        public int IdEstudiante { get; set; }
        public decimal Ponderacion { get; set; }

        // Relación de navegación
        [JsonIgnore]
        public Cursos? Cursos { get; set; }
        [JsonIgnore]
        public Estudiantes? Estudiante { get; set; }
    }
}
