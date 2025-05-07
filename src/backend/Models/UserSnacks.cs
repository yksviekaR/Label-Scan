using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.InteropServices;
using System.Runtime.Serialization;

namespace CodeApi.Models
{
    public class UserSnacks
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id_s { get; set; }
        public int Id_u { get; set; }
        public string SnackName { get; set; }
        public double EnergyValue { get; set; }
        public double Fat {  get; set; }
        public double ofWhichSaturates { get; set; }
        public double Carbohydrates { get; set; }
        public double ofWhichSugars { get; set; }
        public double Protein { get; set; }
        public double Salt { get; set; }
        public double Fiber { get; set; }
        public double Mass { get; set; }
        public string Ingredients { get; set; }

        public Users users { get; set; }
    }
}
