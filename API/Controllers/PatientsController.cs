using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // [Authorize]
    public class PatientsController : BaseApiController
    {
        private readonly IPatientRepository _patientRepository;
        private readonly IMapper _mapper;

        public PatientsController(IPatientRepository patientRepository, IMapper mapper)
        {
            _patientRepository = patientRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PatientDto>>> GetPatients()
        {
            var patients = await _patientRepository.GetPatientDtosAsync();
            return Ok(patients);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            if (!_patientRepository.TryGetPatientDtoById(id, out var product))
            {
                return Ok(product);
            }
            return NotFound();
        }
       
        [HttpGet("pesel/{pesel}")]
        public async Task<ActionResult<PatientDto>> GetByPesel(string pesel)
        {
            return await _patientRepository.GetPatientDtoAsync(pesel);
        }
        
        [HttpPost("register")]
        public async Task<ActionResult> PostPatient(PatientRegisterDto registerDto)
        {
            if (!PeselValidate(registerDto.Pesel)) return BadRequest("PESEL is invalid");
            if (await PeselExist(registerDto.Pesel)) return BadRequest("PESEL is taken");

            Patient patient = await _patientRepository.AddPatientsAsync(registerDto);

            return CreatedAtAction(nameof(GetById), new { id = patient.Id }, patient);
        }

        private bool PeselValidate(string pesel)
        {
            return pesel.Where(Char.IsDigit).ToArray().Length == 11;
        }

        private async Task<bool> PeselExist(string pesel)
        {
            return await _patientRepository.AnyPatientsAsync(pesel);
        }
    }
}