using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models.Dto;
using API.Models;

namespace API.Interfaces
{
    public interface IPatientRepository
    {
        Task<PatientDto> AddAsync(PatientRegisterDto patient);
        Task<PatientDto> AddAsync(PatientDto patient);
        Task<PatientDto> UpdateAsync(PatientDto patient);
        Task<bool> ChangeDepartmentAsync(int patientId, int departmentId);
        Task<Patient> GetByIdAsync(int id);
        Task<PatientDto> GetDtoByIdAsync(int id);
        Task<PatientDto> GetDtoByPeselAsync(string pesel);
        Task<IEnumerable<PatientDto>> GetListDtoAsync();
        Task<PatientDto> DeleteAsync(int id);

        Task<bool> PeselExist(string pesel);

        Task<bool> SaveAllAsync();
    }
}