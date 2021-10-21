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
    public class DocumentationTypeRepository: IDocumentationTypeRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public DocumentationTypeRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<DocumentationType> AddAsync(DocumentationType type)
        {
            _context.DocumentationTypes.Add(type);
            await SaveAllAsync();
            return type;
        }

        public async Task<DocumentationTypeDto> AddAsync(AddDocumentationTypeDto typeDto)
        {
            var type = _mapper.Map<AddDocumentationTypeDto, DocumentationType>(typeDto);
            _context.DocumentationTypes.Add(type);
            await SaveAllAsync();
            return _mapper.Map<DocumentationType, DocumentationTypeDto>(type);
        }

        public async Task<bool> UpdateAsync(DocumentationType updatedType)
        {
            var type = await _context.DocumentationTypes
                .SingleOrDefaultAsync(x => x.Id == updatedType.Id);
            if (type != null)
            {
                type.Name = updatedType.Name;
                type.IsUnused = updatedType.IsUnused;
                type.JsonDescription = updatedType.JsonDescription;

                return await SaveAllAsync();
            }
            return false;
        }

        public async Task<bool> UpdateAsync(DocumentationTypeDto updatedType)
        {
            return await UpdateAsync(_mapper.Map<DocumentationType>(updatedType));
        }

        public async Task<DocumentationTypeDto> DeleteAsync(int id)
        {
            var type = await _context.DocumentationTypes
                .SingleOrDefaultAsync(x => x.Id == id);
            if (type == null)
                return null;
            var deletedType = _context.DocumentationTypes.Remove(type).Entity;
            await SaveAllAsync();
            return _mapper.Map<DocumentationTypeDto>(deletedType); ;
        }

        public async Task<DocumentationType> GetByIdAsync(int id)
        {
            return await _context.DocumentationTypes
                .SingleOrDefaultAsync(t => t.Id == id);
        }

        public async Task<DocumentationTypeDto> GetDtoByIdAsync(int id)
        {
            return await _context.DocumentationTypes
                .Where(x => x.Id == id)
                .ProjectTo<DocumentationTypeDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<DocumentationType>> GetListAsync()
        {
            return await _context.DocumentationTypes
                .ToListAsync();
        }

        public async Task<IEnumerable<DocumentationTypeDto>> GetListDtoAsync()
        {
            return await _context.DocumentationTypes
                .ProjectTo<DocumentationTypeDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
