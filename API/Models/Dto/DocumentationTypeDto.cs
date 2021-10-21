using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.Dto
{
    public class DocumentationTypeDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsUnused { get; set; }
        public string JsonDescription { get; set; }
    }
}
