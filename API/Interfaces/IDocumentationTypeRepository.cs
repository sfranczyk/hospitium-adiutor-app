using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;
using API.Models.Dto;

namespace API.Interfaces
{
    public interface IDocumentationTypeRepository
    {
        Task<DocumentationType> AddAsync(DocumentationType type);
        Task<DocumentationTypeDto> AddAsync(AddDocumentationTypeDto type);
        Task<bool> UpdateAsync(DocumentationType type);
        Task<bool> UpdateAsync(DocumentationTypeDto type);
        Task<DocumentationTypeDto> DeleteAsync(int id);
        Task<DocumentationTypeDto> RestoreAsync(int id);
        Task<DocumentationType> GetByIdAsync(int id);
        Task<DocumentationTypeDto> GetDtoByIdAsync(int id);
        Task<IEnumerable<DocumentationType>> GetListAsync();
        Task<IEnumerable<DocumentationTypeDto>> GetListDtoAsync();

        Task<bool> SaveAllAsync();
    }
}
