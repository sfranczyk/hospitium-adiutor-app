using System;

namespace API.Models.Dto
{
    public class WorkerDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive {get; set; }
    }
}