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

        Task<Patient> AddPatientsAsync(PatientRegisterDto patient);
        Task<Patient> UpdatePatientsAsync(PatientRegisterDto patient);
        Task<Patient> GetPatientByIdAsync(int id);
        Task<Patient> GetPatientByPeselAsync(string pesel);
        Task<IEnumerable<Patient>> GetPatientsAsync();
        Task<PatientDto> GetPatientDtoByIdAsync(int id);
        Task<PatientDto> GetPatientDtoAsync(string pesel);
        Task<IEnumerable<PatientDto>> GetPatientDtosAsync();
        Task<bool> AnyPatientsAsync(string pesel);
        bool TryGetPatientDtoById(int id, out PatientDto patient);
    }
}