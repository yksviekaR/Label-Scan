using AutoMapper;
using CodeApi.Dto;
using CodeApi.Interfaces;
using CodeApi.Models;
using CodeApi.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CodeApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserControler : Controller
    {

        private readonly IUsersRepository _usersRepository;
        private readonly IMapper _mapper;

        public UserControler(IUsersRepository usersRepository, IMapper mapper)
        {
            _usersRepository = usersRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Items>))]
        public IActionResult GetUsers()
        {
            var users = _mapper.Map<List<UsersDto>>(_usersRepository.GetUsers());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(users);
        }

        [HttpGet("GetByID/{Id_u}")]
        [ProducesResponseType(200, Type = typeof(Items))]
        [ProducesResponseType(400)]
        public IActionResult GetUser(int Id_u)
        {
            if (!_usersRepository.UserExists(Id_u))
                return NotFound();

            var User = _mapper.Map<UsersDto>(_usersRepository.GetUser(Id_u));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(User);
        }

        [HttpGet("GetByUsername/{Username}")]
        [ProducesResponseType(200, Type = typeof(Users))]
        [ProducesResponseType(400)]
        public IActionResult GetUserByUserName(string Username)
        {
            if (!_usersRepository.UserExistsUsername(Username))
                return NotFound();

            var Item = _mapper.Map<UsersDto>(_usersRepository.GetUserByUserName(Username));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(Item);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateUser([FromBody] UsersDto usersCreate)
        {
            if (usersCreate == null)
                return BadRequest(ModelState);

            var users = _usersRepository.GetUserTrimToUpper(usersCreate);

            if (users != null)
            {
                ModelState.AddModelError("", "User already exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var usersMap = _mapper.Map<Users>(usersCreate);

            if (!_usersRepository.CreateUser(usersMap))
            {
                ModelState.AddModelError("", "Something went wrong while adding");
                return BadRequest(ModelState);
            }

            return Ok("Successfully Added");

        }

        [HttpPut("{id_u}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateUser(int id_u, [FromBody] UsersDto userUpdate)
        {
            if (userUpdate == null)
                return BadRequest(ModelState);

            if (id_u != userUpdate.id_u)
                return BadRequest(ModelState);

            if (!_usersRepository.UserExists(id_u))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest();

            var userMap = _mapper.Map<Users>(userUpdate);

            if (!_usersRepository.UpdateUser(userMap))
            {
                ModelState.AddModelError("", "Something went wrong while updating");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [HttpDelete("{id_u}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteUser(int id_u)
        {
            if (!_usersRepository.UserExists(id_u))
                return NotFound();

            return NoContent();
        }

    }
}
