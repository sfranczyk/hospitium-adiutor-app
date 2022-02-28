using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using API.Models;
using API.Models.Dto;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories
{
    public class PatientRepository : IPatientRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        
        public PatientRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PatientDto> AddAsync(PatientRegisterDto patientRegister)
        {
            var patient = _mapper.Map<Patient>(patientRegister);
            _context.Patients.Add(patient);
            await SaveAllAsync();
            return _mapper.Map<PatientDto>(patient);
        }

        public async Task<PatientDto> AddAsync(PatientDto newPatient)
        {
            var patient = _mapper.Map<Patient>(newPatient);
            _context.Patients.Add(patient);
            await SaveAllAsync();
            return _mapper.Map<PatientDto>(patient);
        }

        public async Task<bool> ChangeDepartmentAsync(int patientId, int departmentId)
        {

            var patient = await _context.Patients
                .SingleOrDefaultAsync(x => x.Id == patientId);

            var department = await _context.Departments
                .SingleOrDefaultAsync(x => x.Id == departmentId);

            patient.Department = department;

            return await SaveAllAsync();
        }

        public async Task<Patient> GetByIdAsync(int id)
        {
            return await _context.Patients.SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<PatientDto> GetDtoByPeselAsync(string pesel)
        {
            return await _context.Patients
                .Where(x => x.Pesel == pesel)
                .ProjectTo<PatientDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<PatientDto> GetDtoByIdAsync(int id)
        {
            return await _context.Patients
                .Where(x => x.Id == id)
                .ProjectTo<PatientDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }
        
        public async Task<IEnumerable<PatientDto>> GetListDtoAsync()
        {
            return await _context.Patients
                .ProjectTo<PatientDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<PatientDto> DeleteAsync(int id)
        {
            var patient = await _context.Patients
                .SingleOrDefaultAsync(x => x.Id == id);
            if (patient != null)
            {
                var deletedPatient = _context.Patients.Remove(patient).Entity;
                await SaveAllAsync();
                return _mapper.Map<PatientDto>(deletedPatient);
            }
            return null;
        }

        public async Task<bool> PeselExist(string pesel)
        { 
            return await _context.Patients.AnyAsync(x => x.Pesel == pesel);
        }

        public async Task<PatientDto> UpdateAsync(PatientDto updatedPatient)
        {
            var patient = await _context.Patients
                .SingleOrDefaultAsync(x => x.Id == updatedPatient.Id);
            if (patient != null)
            {
                patient.FirstName = updatedPatient.FirstName;
                patient.LastName = updatedPatient.LastName;
                patient.Pesel = updatedPatient.Pesel;
                patient.DateOfBirth = updatedPatient.DateOfBirth;
                patient.PlaceOfBirth = updatedPatient.PlaceOfBirth;
                patient.Sex = updatedPatient.Sex;

                await SaveAllAsync();
            }
            return _mapper.Map<PatientDto>(patient);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}