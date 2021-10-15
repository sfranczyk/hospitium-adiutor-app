using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IPatientRepository
    {
        void Update(Patient patient);
        Task<bool> SaveAllAsync();

        Task<PatientDto> InsertPatientsAsync(Patient patient);
        Task<PatientDto> UpdatePatientsAsync(Patient patient);
        Task<IEnumerable<Patient>> GetPatientsAsync();
        Task<Patient> GetPatientByIdAsync(int id);
        Task<Patient> GetPatientByPeselAsync(string pesel);
        Task<IEnumerable<PatientDto>> GetPatientDtosAsync();
        Task<PatientDto> GetPatientDtoAsync(string pesel);
    }
}