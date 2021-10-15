using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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
       
        [HttpGet("{pesel}")]
        public async Task<ActionResult<PatientDto>> GetPatient(string pesel)
        {
            return await _patientRepository.GetPatientDtoAsync(pesel);
        }

        // [HttpPost("register")]
        // public async Task<ActionResult<PatientDto>> PostPatient(PatientRegisterDto registerDto)
        // {
        //     if (await PeselExist(registerDto.Pesel)) return BadRequest("PESEL is taken");

        //     _context.Users.Add(user);
        //     await _context.SaveChangesAsync();

        //     return new PatientDto{
        //         Username = user.UserName,
        //         Token = _tokenService.CreateToken(user)
        //     };
        // }

        // private async Task<bool> PeselExist(string pesel)
        // {
        //     return await _patientRepository.GetPatientsAsync().AnyAsync(x => x.UserName == username.ToLower());
        // }
    }
}