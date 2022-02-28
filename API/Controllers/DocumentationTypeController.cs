using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using API.Interfaces;
using API.Models.Dto;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Authorize]
    public class DocumentationTypeController : BaseApiController
    {
        private readonly IDocumentationTypeRepository _typeRepository;

        public DocumentationTypeController(IDocumentationTypeRepository typeRepository)
        {
            _typeRepository = typeRepository;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DocumentationTypeDto>> GetById(int id)
        {
            var documentation = await _typeRepository.GetDtoByIdAsync(id);
            if (documentation == null)
            {
                return NotFound();
            }
            return Ok(documentation);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DocumentationTypeDto>>> GetList()
        {
            var types = await _typeRepository.GetListDtoAsync();
            if (types == null)
            {
                return NotFound();
            }
            return Ok(types);
        }

        [HttpGet("unused")]
        public async Task<ActionResult<IEnumerable<DocumentationTypeDto>>> GetUnusedList()
        {
            var types = await _typeRepository.GetUnusedListDtoAsync();
            if (types == null)
            {
                return NotFound();
            }
            return Ok(types);
        }

        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<DocumentationTypeDto>>> GetWithUnusedList()
        {
            var types = await _typeRepository.GetWithUnusedListDtoAsync();
            if (types == null)
            {
                return NotFound();
            }
            return Ok(types);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost]
        public async Task<ActionResult> Post(AddDocumentationTypeDto newDocumentation)
        {
            var documentation = await _typeRepository.AddAsync(newDocumentation);

            return Ok(documentation);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, DocumentationTypeDto documentation)
        {
            if(await _typeRepository.GetByIdAsync(id) == null) 
                return BadRequest("Documentation type does not exist");

            await _typeRepository.UpdateAsync(documentation);

            return Ok();
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<DocumentationTypeDto>> Delete(int id)
        {
            if (await _typeRepository.GetByIdAsync(id) == null) 
                return BadRequest("Documentation type does not exist");

            var documentation = _typeRepository.DeleteAsync(id);

            return Ok(documentation);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPatch("{id}")]
        public async Task<ActionResult<DocumentationTypeDto>> Restore(int id)
        {
            if (await _typeRepository.GetByIdAsync(id) == null)
                return BadRequest("Documentation type does not exist");

            var documentation = _typeRepository.RestoreAsync(id);

            return Ok(documentation);
        }
    }
}
