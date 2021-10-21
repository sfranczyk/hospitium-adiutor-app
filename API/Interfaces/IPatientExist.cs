using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IPatientExist
    {
        Task<bool> PatientExist(int id);
    }
}
