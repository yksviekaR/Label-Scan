using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CodeApi.Models
{
    public class Users
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id_u { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        public ICollection<UserSnacks> userSnacks { get; set; }
    }
}
