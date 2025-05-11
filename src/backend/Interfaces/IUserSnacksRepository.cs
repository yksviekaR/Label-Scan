using CodeApi.Dto;
using CodeApi.Models;

namespace CodeApi.Interfaces
{
    public interface IUserSnacksRepository
    {
        ICollection<UserSnacks> GetUserSnacks();

        ICollection<UserSnacks> GetSnackByUser(int userId);

        UserSnacks GetUserSnack(int id_s);

        UserSnacks GetUserSnackByName(string SnackName);

        UserSnacks getUserSnackTrimToUpper(UserSnacksDto userSnacks);

        bool SnackExists(int id_s);

        bool CreateUserSnack(UserSnacks userSnacks);

        bool UpdateUserSnack(UserSnacks userSnacks);

        bool DeleteUserSnack(UserSnacks userSnacks);

        bool SnackExistsString(string SnackName);

        bool Save();
    }
}
