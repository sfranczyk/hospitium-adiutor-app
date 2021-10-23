using System;

namespace API.Models.Dto
{
    public class DocumentationDto
    {
        public int Id { get; set; }
        public DateTime Created { get; set; }
        public string Content { get; set; }
        public int PatientId { get; set; }
        public int TypeId { get; set; }
    }
}
