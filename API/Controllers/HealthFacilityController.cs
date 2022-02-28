using System.Collections.Generic;
using System.Threading.Tasks;
using API.Interfaces;
using API.Models.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class HealthFacilityController : BaseApiController
    {
        private readonly IHealthFacilityRepository _healthFacilityRepository;

        public HealthFacilityController(IHealthFacilityRepository healthFacilityRepository)
        {
            _healthFacilityRepository = healthFacilityRepository;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<HealthFacilityDto>> GetById(int id)
        {
            var documentation = await _healthFacilityRepository.GetDtoByIdAsync(id);
            if (documentation == null)
            {
                return NotFound();
            }
            return Ok(documentation);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<HealthFacilityDto>>> GetList()
        {
            var types = await _healthFacilityRepository.GetListDtoAsync();
            if (types == null)
            {
                return NotFound();
            }
            return Ok(types);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost]
        public async Task<ActionResult> Post(AddHealthFacilityDto addHealthFacility)
        {
            var healthFacilityDto = await _healthFacilityRepository.AddAsync(addHealthFacility);

            return Ok(healthFacilityDto);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, UpdateHealthFacilityDto healthFacility)
        {
            if (await _healthFacilityRepository.GetByIdAsync(id) == null)
                return BadRequest("Health Facility does not exist");

            await _healthFacilityRepository.UpdateAsync(healthFacility);

            return Ok();
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<HealthFacilityDto>> Delete(int id)
        {
            if (await _healthFacilityRepository.GetByIdAsync(id) == null)
                return BadRequest("Health Facility does not exist");

            var healthFacility = _healthFacilityRepository.DeleteAsync(id);

            return Ok(healthFacility);
        }
    }
}
