using System.Collections.Generic;
using System.Threading.Tasks;
using API.Interfaces;
using API.Models.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class DepartmentController : BaseApiController
    {
        private readonly IDepartmentRepository _departmentRepository;

        public DepartmentController(IDepartmentRepository departmentRepository)
        {
            _departmentRepository = departmentRepository;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DepartmentDto>> GetById(int id)
        {
            var documentation = await _departmentRepository.GetDtoByIdAsync(id);
            if (documentation == null)
            {
                return NotFound();
            }
            return Ok(documentation);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DepartmentDto>>> GetList()
        {
            var types = await _departmentRepository.GetListDtoAsync();
            if (types == null)
            {
                return NotFound();
            }
            return Ok(types);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost]
        public async Task<ActionResult> Post(AddDepartmentDto addDepartment)
        {
            var departmentDto = await _departmentRepository.AddAsync(addDepartment);

            return Ok(departmentDto);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, string department)
        {
            if (await _departmentRepository.GetByIdAsync(id) == null)
                return BadRequest("Health Facility does not exist");

            await _departmentRepository.UpdateAsync(department);

            return Ok();
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<DepartmentDto>> Delete(int id)
        {
            if (await _departmentRepository.GetByIdAsync(id) == null)
                return BadRequest("Health Facility does not exist");

            var department = _departmentRepository.DeleteAsync(id);

            return Ok(department);
        }
    }
}
