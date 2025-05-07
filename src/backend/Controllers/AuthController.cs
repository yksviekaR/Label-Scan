using CodeApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace CodeApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("/register")]
        public async Task<IActionResult> Register(string username, string password)
        {
            var succes = await _authService.RegisterAsync(username, password);
            
            return succes ? Ok("Registered") : BadRequest("User exists"); 
        }


        [HttpPost("/login")]
        public async Task<IActionResult> Login(string username, string password)
        {
            var loggedUser = await _authService.LoginAsync(username, password);

            return Ok(loggedUser);
        }

    }
}
