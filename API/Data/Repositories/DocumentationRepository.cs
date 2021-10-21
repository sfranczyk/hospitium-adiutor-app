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
    public class DocumentationRepository : IDocumentationRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public DocumentationRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Documentation> AddAsync(Documentation documentation)
        {
            _context.Documentations.Add(documentation);
            await SaveAllAsync();
            return documentation;
        }

        public async Task<DocumentationDto> AddAsync(AddDocumentationDto documentationDto)
        {
            var documentation = _mapper.Map<Documentation>(documentationDto);
            _context.Documentations.Add(documentation);
            await SaveAllAsync();
            return _mapper.Map<Documentation, DocumentationDto>(documentation);
        }

        public async Task<bool> UpdateAsync(Documentation updateDocumentation)
        {
            var documentation = await _context.Documentations
                .SingleOrDefaultAsync(x => x.Id == updateDocumentation.Id);

            if (documentation != null)
            {
                documentation.Content = updateDocumentation.Content;
                return await SaveAllAsync();
            }
            return false;
        }

        public async Task<bool> UpdateAsync(DocumentationDto updateDocumentation)
        {
            var documentation  = _mapper.Map<Documentation>(updateDocumentation);
            return await UpdateAsync(documentation);
        }

        public async Task<DocumentationDto> DeleteAsync(int id)
        {
            var documentation = await _context.Documentations
                .SingleOrDefaultAsync(x => x.Id == id);
            if (documentation == null)
                return null;
            var deletedDocumentation = _context.Documentations.Remove(documentation).Entity;
            await SaveAllAsync();
            return _mapper.Map<Documentation, DocumentationDto>(deletedDocumentation);
        }

        public async Task<Documentation> GetByIdAsync(int id)
        {
            return await _context.Documentations.FindAsync(id);
        }

        public async Task<DocumentationDto> GetDtoByIdAsync(int id)
        {
            return await _context.Documentations
                .Where(x => x.Id == id)
                .ProjectTo<DocumentationDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<Documentation>> GetListByPatientIdAsync(int id)
        {
            return await _context.Documentations
                .Where(x => x.PatientId == id)
                .ToListAsync();
        }

        public async Task<IEnumerable<DocumentationDto>> GetListDtoByPatientIdAsync(int id)
        {
            return await _context.Documentations
                .Where(x => x.PatientId == id)
                .ProjectTo<DocumentationDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<IEnumerable<Documentation>> GetListByPatientAsync(Patient patient)
        {
            return await _context.Documentations
                .Where(x => x.PatientId == patient.Id)
                .ToListAsync();
        }

        public async Task<IEnumerable<DocumentationDto>> GetListDtoByPatientAsync(Patient patient)
        {
            return await _context.Documentations
                .Where(x => x.PatientId == patient.Id)
                .ProjectTo<DocumentationDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
