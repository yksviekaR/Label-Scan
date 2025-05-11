using CodeApi.Data;
using CodeApi.Dto;
using CodeApi.Interfaces;
using CodeApi.Models;

namespace CodeApi.Repository
{
    public class UserSnacksRepository : IUserSnacksRepository
    {
        private readonly DataContext _context;

        public UserSnacksRepository(DataContext context)
        {
            _context = context;
        }

        public bool CreateUserSnack(UserSnacks userSnacks)
        {
            _context.Add(userSnacks);
            return Save();
        }

        public bool DeleteUserSnack(UserSnacks userSnacks)
        {
            _context.Remove(userSnacks);
            return Save();
        }

        public ICollection<UserSnacks> GetSnackByUser(int userId)
        {
            return _context.UserSnacks.Where(p => p.users.id_u == userId).ToList();
        }

        public UserSnacks GetUserSnack(int id_s)
        {
            return _context.UserSnacks.Where(p => p.Id_s == id_s).FirstOrDefault();
        }

        public UserSnacks GetUserSnackByName(string SnackName)
        {
            return _context.UserSnacks.Where(p => p.SnackName.ToLower() == SnackName.ToLower()).FirstOrDefault();
        }

        public ICollection<UserSnacks> GetUserSnacks()
        {
            return _context.UserSnacks.OrderBy(p => p.Id_s).ToList();
        }

        public UserSnacks getUserSnackTrimToUpper(UserSnacksDto userSnacks)
        {
            return GetUserSnacks().Where(c => c.SnackName.Trim().ToUpper() == userSnacks.SnackName.Trim().ToUpper()).FirstOrDefault();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool SnackExists(int id_s)
        {
            return _context.UserSnacks.Any(p => p.Id_s == id_s);
        }

        public bool SnackExistsString(string SnackName)
        {
            return _context.UserSnacks.Any(p => p.SnackName.ToLower() == SnackName.ToLower());
        }

        public bool UpdateUserSnack(UserSnacks userSnacks)
        {
            _context.Update(userSnacks);
            return Save();
        }
    }
}
