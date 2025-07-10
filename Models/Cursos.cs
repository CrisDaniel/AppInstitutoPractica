using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace institutoSanJuan.Models
{
    public class Cursos
    {
        public int Id { get; set; }
        public string Curso { get; set; }
        public int Creditos { get; set; }
        public int HorasSemanal { get; set; }
        public string Ciclo { get; set; }
        [ForeignKey("Docente")]
        public int IdDocente { get; set; }

        // Relación de navegación
        [JsonIgnore]
        public Docente? Docente { get; set; }
    }
}
