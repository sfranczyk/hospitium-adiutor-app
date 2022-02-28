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
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public DepartmentRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Department> AddAsync(Department department)
        {
            _context.Departments.Add(department);
            await SaveAllAsync();
            return department;
        }

        public async Task<DepartmentDto> AddAsync(AddDepartmentDto departmentDto)
        {
            var department = _mapper.Map<Department>(departmentDto);
            _context.Departments.Add(department);

            await SaveAllAsync();
            return _mapper.Map<DepartmentDto>(department);
        }

        public async Task<bool> UpdateAsync(Department updatedDepartment)
        {
            var department = await _context.Departments
                .SingleOrDefaultAsync(x => x.Id == updatedDepartment.Id);
            if (department != null)
            {
                department.Name = updatedDepartment.Name;

                return await SaveAllAsync();
            }
            return false;
        }

        public async Task<bool> UpdateAsync(string updatedDepartment)
        {
            return await UpdateAsync(_mapper.Map<Department>(updatedDepartment));
        }

        public async Task<DepartmentDto> DeleteAsync(int id)
        {
            var department = await _context.Departments
                .SingleOrDefaultAsync(x => x.Id == id);
            if (department == null)
                return null;
            var deletedType = _context.Departments.Remove(department).Entity;
            await SaveAllAsync();
            return _mapper.Map<DepartmentDto>(deletedType);
        }

        public async Task<Department> GetByIdAsync(int id)
        {
            return await _context.Departments
                .Where(t => t.Id == id)
                .SingleOrDefaultAsync();
        }

        public async Task<DepartmentDto> GetDtoByIdAsync(int id)
        {
            return await _context.Departments
                .Where(t => t.Id == id)
                .ProjectTo<DepartmentDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<Department>> GetListAsync()
        {
            return await _context.Departments
                .ToListAsync();
        }

        public async Task<IEnumerable<DepartmentDto>> GetListDtoAsync()
        {
            return await _context.Departments
                .ProjectTo<DepartmentDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
