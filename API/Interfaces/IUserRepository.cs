using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models.Dto;
using API.Models;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<AppUser>> GetUserAsync();
        Task<AppUser> GetUserByIdAsync(int id);
        Task<AppUser> GetUserByUsernameAsync(string username);
        Task<IEnumerable<WorkerDto>> GetMembersAsync();
        Task<WorkerDto> GetMemberAsync(string username);
    }
}