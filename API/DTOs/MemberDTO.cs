using System;

namespace API.DTOs
{
    public class MemberDTO
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive {get; set; }
    }
}