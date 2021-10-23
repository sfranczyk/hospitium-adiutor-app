using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using API.Models;
using API.Models.Dto;
using AutoMapper;
using AutoMapper.Internal;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories
{
    public class HealthFacilityRepository : IHealthFacilityRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public HealthFacilityRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<HealthFacility> AddAsync(HealthFacility healthFacility)
        {
            _context.HealthFacilities.Add(healthFacility);
            await SaveAllAsync();
            return healthFacility;
        }

        public async Task<HealthFacilityDto> AddAsync(AddHealthFacilityDto healthFacilityDto)
        {
            var healthFacility = _mapper.Map<HealthFacility>(healthFacilityDto);
            _context.HealthFacilities.Add(healthFacility);

            await SaveAllAsync();
            return _mapper.Map<HealthFacilityDto>(healthFacility);
        }

        public async Task<bool> UpdateAsync(HealthFacility updatedHealthFacility)
        {
            var healthFacility = await _context.HealthFacilities
                .SingleOrDefaultAsync(x => x.Id == updatedHealthFacility.Id);
            if (healthFacility != null)
            {
                healthFacility.Name = updatedHealthFacility.Name;
                healthFacility.City = updatedHealthFacility.City;

                return await SaveAllAsync();
            }
            return false;
        }

        public async Task<bool> UpdateAsync(UpdateHealthFacilityDto updatedHealthFacility)
        {
            return await UpdateAsync(_mapper.Map<HealthFacility>(updatedHealthFacility));
        }

        public async Task<HealthFacilityDto> DeleteAsync(int id)
        {
            var healthFacility = await _context.HealthFacilities
                .SingleOrDefaultAsync(x => x.Id == id);
            if (healthFacility == null)
                return null;
            var deletedType = _context.HealthFacilities.Remove(healthFacility).Entity;
            await SaveAllAsync();
            return _mapper.Map<HealthFacilityDto>(deletedType);
        }

        public async Task<HealthFacility> GetByIdAsync(int id)
        {
            return await _context.HealthFacilities
                .Where(t => t.Id == id)
                .SingleOrDefaultAsync();
        }

        public async Task<HealthFacilityDto> GetDtoByIdAsync(int id)
        {
            return await _context.HealthFacilities
                .Where(t => t.Id == id)
                .ProjectTo<HealthFacilityDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<HealthFacility>> GetListAsync()
        {
            return await _context.HealthFacilities
                .ToListAsync();
        }

        public async Task<IEnumerable<HealthFacilityDto>> GetListDtoAsync()
        {
            return await _context.HealthFacilities
                .ProjectTo<HealthFacilityDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
