using CodeApi.Data;
using CodeApi.Dto;
using CodeApi.Interfaces;
using CodeApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CodeApi.Repository
{
    public class UsersRepository : IUsersRepository
    {
        private readonly DataContext _context;

        public UsersRepository(DataContext context)
        {
            _context = context;
        }

        public async Task AddUserAsync(Users user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public bool CreateUser(Users users)
        {
            _context.Add(users);

            return Save();
        }

        public bool DeleteUser(Users users)
        {
            _context.Remove(users);

            return Save();
        }

        public async Task<Users> GetByUsernameAsnyc(string Username)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Username == Username);
        }

        public Users GetUser(int Id_u)
        {
            return _context.Users.Where(p => p.id_u ==  Id_u).FirstOrDefault();
        }

        public Users GetUserByUserName(string Username)
        {
            return _context.Users.Where(p => p.Username == Username).FirstOrDefault();
        }

        public ICollection<Users> GetUsers()
        {
            return _context.Users.OrderBy(p => p.id_u).ToList();
        }

        public Users GetUserTrimToUpper(UsersDto userCreate)
        {
            return GetUsers().Where(c => c.Username.Trim().ToUpper() == userCreate.Username.Trim().ToUpper()).FirstOrDefault();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateUser(Users users)
        {
            _context.Update(users);

            return Save();
        }

        public bool UserExists(int Id_u)
        {
            return _context.Users.Any(p => p.id_u == Id_u);
        }

        public bool UserExistsUsername(string Username)
        {
            return _context.Users.Any(p => p.Username == Username);
        }
    }
}
