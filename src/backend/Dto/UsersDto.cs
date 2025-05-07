using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CodeApi.Dto
{
    public class UsersDto
    {
        public int id_u { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
