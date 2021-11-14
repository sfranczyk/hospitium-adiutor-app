using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models.Dto;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using static System.Char;

namespace API.Controllers
{
    // [Authorize]
    public class PatientsController : BaseApiController
    {
        private readonly IPatientRepository _patientRepository;
        private readonly IDepartmentRepository _departmentRepository;

        public PatientsController(IPatientRepository patientRepository, IDepartmentRepository departmentRepository)
        {
            _patientRepository = patientRepository;
            _departmentRepository = departmentRepository;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PatientDto>> GetById(int id)
        {
            var patient = await _patientRepository.GetDtoByIdAsync(id);
            if (patient == null) 
                return NotFound();
            return Ok(patient);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PatientDto>>> GetList()
        {
            var patients = await _patientRepository.GetListDtoAsync();
            return Ok(patients);
        }

        [HttpGet("pesel/{pesel}")]
        public async Task<ActionResult<PatientDto>> GetByPesel(string pesel)
        {
            var patient = await _patientRepository.GetDtoByPeselAsync(pesel);
            if (patient == null)
                return NotFound();
            return Ok(patient);
        }
        
        [HttpPost("register")]
        public async Task<ActionResult> PostPatient(PatientRegisterDto registerDto)
        {
            if (!PeselValidate(registerDto.Pesel)) 
                return BadRequest("PESEL is invalid");
            if (await _patientRepository.PeselExist(registerDto.Pesel)) 
                return BadRequest("PESEL is taken");

            var patient = await _patientRepository.AddAsync(registerDto);

            return Ok(patient);
        }

        [HttpPut]
        public async Task<ActionResult> Put(PatientDto updatedPatient)
        {
            if (await _patientRepository.GetByIdAsync(updatedPatient.Id) == null)
            {
                var newPatient = await _patientRepository.AddAsync(updatedPatient);

                return Created("/api/Patients/" + newPatient.Id, newPatient);
            }

            var patient = await _patientRepository.UpdateAsync(updatedPatient);

            return Ok(patient);
        }

        [HttpPatch("change-department/{id}")]
        public async Task<ActionResult> ChangeDepartment(int id, int departmentId)
        {
            var patient = await _patientRepository.GetByIdAsync(id);
            if (patient == null)
                return BadRequest("Patient does not exist");

            var department = await _departmentRepository.GetByIdAsync(departmentId);
            if (department == null)
                return BadRequest("Department does not exist");

            await _patientRepository.ChangeDepartmentAsync(id, departmentId);

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<PatientDto>> Delete(int id)
        {
            if (await _patientRepository.GetByIdAsync(id) == null)
                return BadRequest("Patient does not exist");

            var patient = _patientRepository.DeleteAsync(id);

            return Ok(patient);
        }

        private bool PeselValidate(string pesel)
        {
            return pesel.Where(IsDigit).ToArray().Length == 11;
        }
    }
}