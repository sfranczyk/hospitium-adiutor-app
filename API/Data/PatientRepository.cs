using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Data
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

        public async Task<PatientDto> InsertPatientsAsync(Patient patient)
        {
            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();
            return new PatientDto{

            };
        }

        public Task<PatientDto> UpdatePatientsAsync(Patient patient)
        {
            throw new NotImplementedException();
        }
    }
}