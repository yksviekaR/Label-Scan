using CodeApi.Dto;
using CodeApi.Models;

namespace CodeApi.Interfaces
{
    public interface IUsersRepository
    {
        ICollection<Users> GetUsers();

        Users GetUser(int Id_u);

        Users GetUserByUserName(string Username);

        Task<Users> GetByUsernameAsnyc(string Username);

        Task AddUserAsync(Users user);

        Users GetUserTrimToUpper(UsersDto userCreate);

        bool UserExists(int Id_u);

        bool UserExistsUsername(string Username);

        bool CreateUser(Users users);

        bool UpdateUser(Users users);

        bool DeleteUser(Users users);

        bool Save();
    }
}
