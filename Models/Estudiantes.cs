using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace institutoSanJuan.Models
{
    public class Estudiantes
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Dni { get; set; }
        public string Correo { get; set; }
    }
}
