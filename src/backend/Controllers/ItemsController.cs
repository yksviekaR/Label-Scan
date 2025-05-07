using AutoMapper;
using CodeApi.Dto;
using CodeApi.Interfaces;
using CodeApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
namespace CodeApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : Controller
    {

        private readonly IItemsRepository _itemsRepository;
        private readonly IMapper _mapper;

        public ItemsController(IItemsRepository itemRepository, IMapper mapper)
        {
            _itemsRepository = itemRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Items>))]
        public IActionResult GetItmes()
        {
            var itmes = _mapper.Map<List<ItemsDto>>(_itemsRepository.GetItems());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(itmes);
        }

        [HttpGet("GetByID/{id_i}")]
        [ProducesResponseType(200, Type = typeof(Items))]
        [ProducesResponseType(400)]
        public IActionResult GetItem(int id_i)
        {
            if (!_itemsRepository.ItemExists(id_i))
                return NotFound();

            var Item = _mapper.Map<ItemsDto>(_itemsRepository.GetItem(id_i));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(Item);
        }

        [HttpGet("GetByName/{ItemName}")]
        [ProducesResponseType(200, Type = typeof(Items))]
        [ProducesResponseType(400)]
        public IActionResult GetItemByName(string ItemName)
        {
            var Item = _mapper.Map<ItemsDto>(_itemsRepository.GetItemByName(ItemName));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(Item);
        }

        [HttpGet("GetByBarcode/{barcode}")]
        [ProducesResponseType(200, Type = typeof(Items))]
        [ProducesResponseType(400)]
        public IActionResult GetItemByBarcode(string barcode)
        {
            var Item = _mapper.Map<ItemsDto>(_itemsRepository.GetItemByBarcode(barcode));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(Item);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateItem([FromBody] ItemsDto itemCreate)
        {
            if(itemCreate == null)
                return BadRequest(ModelState);

            var items = _itemsRepository.GetItemsTrimToUpper(itemCreate);

            if (items != null)
            {
                ModelState.AddModelError("", "Owner already exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var itemMap = _mapper.Map<Items>(itemCreate);

            if (!_itemsRepository.CreateItem(itemMap))
            {
                ModelState.AddModelError("", "Something went wrong while adding");
                return BadRequest(ModelState);
            }

            return Ok("Successfully Added");

        }

        [HttpPut("{id_i}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateItem(int id_i, [FromBody] ItemsDto itemUpdate)
        {
            if(itemUpdate == null)
                return BadRequest(ModelState);

            if(id_i != itemUpdate.id_i)
                return BadRequest(ModelState);

            if(!_itemsRepository.ItemExists(id_i))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest();

            var itemsMap = _mapper.Map<Items>(itemUpdate);

            if (!_itemsRepository.UpdateItem(itemsMap))
            {
                ModelState.AddModelError("", "Something went wrong while updating");
                return StatusCode(500, ModelState);
            }

            return Ok(itemUpdate);
        }

        [HttpDelete("{id_i}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteItem(int id_i)
        {
            if (!_itemsRepository.ItemExists(id_i))
                return NotFound();
            
            return NoContent();
        }
    }
}
