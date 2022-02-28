using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Interfaces;
using API.Models.Dto;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Authorize]
    public class DocumentationController : BaseApiController
    {
        private readonly IDocumentationRepository _documentationRepository;
        private readonly IDocumentationTypeRepository _documentationTypeRepository;
        private readonly IPatientRepository _patientRepository;

        public DocumentationController(IDocumentationRepository documentationRepository, IPatientRepository patientRepository, IDocumentationTypeRepository documentationTypeRepository)
        {
            _documentationRepository = documentationRepository;
            _patientRepository = patientRepository;
            _documentationTypeRepository = documentationTypeRepository;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DocumentationDto>> GetById(int id)
        {
            var documentation = await _documentationRepository.GetDtoByIdAsync(id);
            if (documentation == null)
            {
                return NotFound();
            }
            return Ok(documentation);
        }

        [HttpGet("list/{patientId}")]
        public async Task<ActionResult<IEnumerable<DocumentationDto>>> GetListByPatientId(int patientId)
        {
            var documentations = await _documentationRepository.GetListDtoByPatientIdAsync(patientId);
            if (documentations == null)
            {
                return NotFound();
            }
            return Ok(documentations);
        }

        [HttpPost]
        public async Task<ActionResult> Post(AddDocumentationDto newDocumentation)
        {
            var patient = await _patientRepository.GetByIdAsync(newDocumentation.PatientId);
            if (patient == null)
                return BadRequest("Patient does not exist");

            var documentationType = await _documentationTypeRepository.GetByIdAsync(newDocumentation.TypeId);
            if (documentationType == null)
                return BadRequest("DocumentationType does not exist");

            DocumentationDto documentation = await _documentationRepository.AddAsync(newDocumentation);

            return Ok(documentation);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, DocumentationDto documentation)
        {
            if(await _documentationRepository.GetByIdAsync(id) == null) 
                return BadRequest("Documentation does not exist");

            await _documentationRepository.UpdateAsync(documentation);

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            if (await _documentationRepository.GetByIdAsync(id) == null) 
                return BadRequest("Documentation does not exist");

            var documentation = _documentationRepository.DeleteAsync(id);

            return Ok(documentation);
        }
    }
}
