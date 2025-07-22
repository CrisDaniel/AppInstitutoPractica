using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace institutoSanJuan.Models
{
    public class Docente
    {
        public int Id { get; set; }
        public string Apellidos { get; set; }
        public string Nombres { get; set; }
        public string Profesion { get; set; }

        [Column("fecha_nacimiento")]
        public DateTime FechaNacimiento { get; set; }
        public string Correo { get; set; }

        //[JsonIgnore]
        //public ICollection<Cursos> Cursos { get; set; }
    }
}
