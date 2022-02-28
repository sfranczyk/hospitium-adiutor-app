using System;

namespace API.Models
{
    public class Documentation
    {
        public int Id { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public string Content { get; set; }
        public Patient Patient;
        public int PatientId { get; set; }
        public DocumentationType Type { get; set; }
        public int TypeId { get; set; }
    }
}