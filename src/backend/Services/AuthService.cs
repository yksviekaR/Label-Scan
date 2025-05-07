
using CodeApi.Interfaces;
using BCrypt.Net;
using CodeApi.Models;

namespace CodeApi.Services
{
    public class AuthService : IAuthService
    {

        private readonly IUsersRepository _userRepository;
        private readonly TokenProvider _tokenProvider;

        public AuthService(IUsersRepository userRepository, TokenProvider tokenProvider)
        {
            _userRepository = userRepository;
            _tokenProvider = tokenProvider;
        }

        public async Task<string> LoginAsync(string username, string password)
        {
            var user = await _userRepository.GetByUsernameAsnyc(username);
            if (user == null) throw new Exception("no user found");

            var passwordVerify = BCrypt.Net.BCrypt.Verify(password, user.Password);

            if (!passwordVerify)
            {
                throw new Exception("Wrong password");
            }

            string token = _tokenProvider.Create(user);

            return token;
        }


        public async Task<bool> RegisterAsync(string username, string password)
        {
            var existingUsers = await _userRepository.GetByUsernameAsnyc(username);
            if (existingUsers != null) return false;

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(password);

            var user = new Users
            {
                Username = username,
                Password = hashedPassword,
            };

            await _userRepository.AddUserAsync(user);
            return true;

        }
    }
}
