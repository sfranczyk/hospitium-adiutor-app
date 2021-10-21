using System;
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
    public class PatientRepository : IPatientRepository, IPatientExist
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        
        public PatientRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PatientDto> GetPatientDtoAsync(string pesel)
        {
            return await _context.Patients
                .Where(x => x.Pesel == pesel)
                .ProjectTo<PatientDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<Patient> GetPatientByIdAsync(int id)
        {
            return await _context.Patients.FindAsync(id);
        }

        public async Task<PatientDto> GetPatientDtoByIdAsync(int id)
        {
            Patient patient = await GetPatientByIdAsync(id);
            
            return _mapper.Map<Patient, PatientDto>(patient);
        }

        public bool TryGetPatientDtoById(int id, out PatientDto patient)
        {
            Patient p = _context.Patients.Find(id);
            patient = _mapper.Map<Patient, PatientDto>(p);
            return patient != null;
        }

        public async Task<Patient> GetPatientByPeselAsync(string pesel)
        {
            return await _context.Patients.SingleOrDefaultAsync(x => x.Pesel == pesel);
        }

        public async Task<IEnumerable<PatientDto>> GetPatientDtosAsync()
        {
            return await _context.Patients
                .ProjectTo<PatientDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<IEnumerable<Patient>> GetPatientsAsync()
        {
            return await _context.Patients.ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {   
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Patient patient)
        {
            _context.Entry(patient).State = EntityState.Modified;
        }

        public Task<PatientDto> UpdateAsync(PatientDto patient)
        {
            throw new NotImplementedException();
        }

        public async Task<Patient> AddPatientsAsync(PatientRegisterDto patientRegister)
        {
            Patient patient = _mapper.Map<PatientRegisterDto, Patient>(patientRegister);
            _context.Patients.Add(patient);
            await SaveAllAsync();
            return patient;
        }

        public Task<Patient> UpdatePatientsAsync(PatientRegisterDto patient)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> AnyPatientsAsync(string pesel)
        {
            return await _context.Patients.AnyAsync(x => x.Pesel == pesel);
        }

        public async Task<bool> PatientExist(int id)
        {
            return await _context.Patients.FindAsync(id) != null;
        }
    }
}