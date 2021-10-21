using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.Dto
{
    public class AddDocumentationDto
    {
        public string Content { get; set; }
        public int PatientId { get; set; }
        public int TypeId { get; set; }
    }
}
