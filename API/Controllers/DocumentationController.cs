using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Interfaces;
using API.Models.Dto;

namespace API.Controllers
{
    public class DocumentationController : BaseApiController
    {
        private readonly IDocumentationRepository _documentationRepository;
        private readonly IPatientExist _patientRepository;

        public DocumentationController(IDocumentationRepository documentationRepository, IPatientExist patientRepository)
        {
            _documentationRepository = documentationRepository;
            _patientRepository = patientRepository;
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
            if (!await PatientIdValidate(newDocumentation.PatientId)) return BadRequest("Patient id invalid");

            DocumentationDto documentation = await _documentationRepository.AddAsync(newDocumentation);

            return Ok(documentation);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, DocumentationDto documentation)
        {
            if(await _documentationRepository.GetByIdAsync(id) == null) return BadRequest("Documentation does not exist");
            if (!await PatientIdValidate(documentation.PatientId)) return BadRequest("Patient id invalid");

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

        private async Task<bool> PatientIdValidate(int id)
        {
            return await _patientRepository.PatientExist(id);
        }
    }
}
