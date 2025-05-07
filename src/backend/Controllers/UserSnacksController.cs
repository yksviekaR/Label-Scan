using AutoMapper;
using CodeApi.Dto;
using CodeApi.Interfaces;
using CodeApi.Models;
using CodeApi.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CodeApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserSnacksControler : Controller
    {

        private readonly IUserSnacksRepository _userSnacksRepository;
        private readonly IMapper _mapper;

        public UserSnacksControler(IUserSnacksRepository usersSnacksRepository, IMapper mapper)
        {
            _userSnacksRepository = usersSnacksRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<UserSnacks>))]
        public IActionResult GetUserSnacks()
        {
            var snacks = _mapper.Map<List<UserSnacksDto>>(_userSnacksRepository.GetUserSnacks());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(snacks);
        }

        [HttpGet("GetByID/{id_s}")]
        [ProducesResponseType(200, Type = typeof(UserSnacks))]
        [ProducesResponseType(400)]
        public IActionResult GetUserSnack(int id_s)
        {
            if (!_userSnacksRepository.SnackExists(id_s))
                return NotFound();

            var snack = _mapper.Map<UserSnacksDto>(_userSnacksRepository.GetUserSnack(id_s));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(snack);
        }

        [HttpGet("GetBySnackName/{SnackName}")]
        [ProducesResponseType(200, Type = typeof(UserSnacks))]
        [ProducesResponseType(400)]
        public IActionResult GetUserSnackByName(string SnackName)
        {
            if(!_userSnacksRepository.SnackExistsString(SnackName))
                return NotFound();

            var snack = _mapper.Map<UsersDto>(_userSnacksRepository.GetUserSnackByName(SnackName));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(snack);
        }

        [HttpGet("GetSnackOfUser/{id_u}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<UserSnacks>))]
        [ProducesResponseType(400)]
        public IActionResult GetSnackByUser(int id_u)
        {
            if(!_userSnacksRepository.SnackExists(id_u))
                return NotFound();

            var snacks = _mapper.Map<List<UserSnacksDto>>(_userSnacksRepository.GetSnackByUser(id_u));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(snacks);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateUserSnack([FromBody] UserSnacksDto userSnack)
        {
            if (userSnack == null)
                return BadRequest(ModelState);

            var userSnacks = _userSnacksRepository.getUserSnackTrimToUpper(userSnack);

            if (userSnacks != null)
            {
                ModelState.AddModelError("", "Snack already exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var snacksMap = _mapper.Map<UserSnacks>(userSnack);

            if (!_userSnacksRepository.CreateUserSnack(snacksMap))
            {
                ModelState.AddModelError("", "Something went wrong while adding");
                return BadRequest(ModelState);
            }

            return Ok("Successfully Added");

        }

        [HttpPut("{id_s}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateUser(int id_s, [FromBody] UserSnacksDto snackUpdate)
        {
            if (snackUpdate == null)
                return BadRequest(ModelState);

            if (id_s != snackUpdate.Id_s)
                return BadRequest(ModelState);

            if (!_userSnacksRepository.SnackExists(id_s))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest();

            var snackMap = _mapper.Map<UserSnacks>(snackUpdate);

            if (!_userSnacksRepository.UpdateUserSnack(snackMap))
            {
                ModelState.AddModelError("", "Something went wrong while updating");
                return StatusCode(500, ModelState);
            }

            return Ok(snackUpdate);
        }

        [HttpDelete("{id_s}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteSnack(int id_s)
        {
            if (!_userSnacksRepository.SnackExists(id_s))
                return NotFound();

            return NoContent();
        }
    }
}
