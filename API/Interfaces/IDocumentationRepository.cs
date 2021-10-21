using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;
using API.Models.Dto;

namespace API.Interfaces
{
    public interface IDocumentationRepository
    {
        Task<Documentation> AddAsync(Documentation documentation);
        Task<DocumentationDto> AddAsync(AddDocumentationDto documentation);
        Task<bool> UpdateAsync(Documentation documentation);
        Task<bool> UpdateAsync(DocumentationDto documentation);
        Task<DocumentationDto> DeleteAsync(int id);
        Task<Documentation> GetByIdAsync(int id);
        Task<DocumentationDto> GetDtoByIdAsync(int id);
        Task<IEnumerable<Documentation>> GetListByPatientIdAsync(int id);
        Task<IEnumerable<DocumentationDto>> GetListDtoByPatientIdAsync(int id);
        Task<IEnumerable<Documentation>> GetListByPatientAsync(Patient patient);
        Task<IEnumerable<DocumentationDto>> GetListDtoByPatientAsync(Patient patient);

        Task<bool> SaveAllAsync();
    }
}
