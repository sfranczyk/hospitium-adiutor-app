using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;
using API.Models.Dto;

namespace API.Interfaces
{
    public interface IDepartmentRepository
    {
        Task<Department> AddAsync(Department Department);
        Task<DepartmentDto> AddAsync(AddDepartmentDto Department);
        Task<bool> UpdateAsync(Department updatedDepartment);
        Task<bool> UpdateAsync(string newName);
        Task<DepartmentDto> DeleteAsync(int id);
        Task<Department> GetByIdAsync(int id);
        Task<DepartmentDto> GetDtoByIdAsync(int id);
        Task<IEnumerable<Department>> GetListAsync();
        Task<IEnumerable<DepartmentDto>> GetListDtoAsync();

        Task<bool> SaveAllAsync();
    }
}