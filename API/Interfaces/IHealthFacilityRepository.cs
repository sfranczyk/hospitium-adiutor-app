using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;
using API.Models.Dto;

namespace API.Interfaces
{
    public interface IHealthFacilityRepository
    {
        Task<HealthFacility> AddAsync(HealthFacility healthFacility);
        Task<HealthFacilityDto> AddAsync(AddHealthFacilityDto healthFacility);
        Task<bool> UpdateAsync(HealthFacility updatedHealthFacility);
        Task<bool> UpdateAsync(UpdateHealthFacilityDto updatedHealthFacility);
        Task<HealthFacilityDto> DeleteAsync(int id);
        Task<HealthFacility> GetByIdAsync(int id);
        Task<HealthFacilityDto> GetDtoByIdAsync(int id);
        Task<IEnumerable<HealthFacility>> GetListAsync();
        Task<IEnumerable<HealthFacilityDto>> GetListDtoAsync();

        Task<bool> SaveAllAsync();
    }
}