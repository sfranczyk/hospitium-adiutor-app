using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.Dto
{
    public class AddHealthFacilityDto
    {
        public string Name { get; set; }
        public string City { get; set; }
        public ICollection<string> Departments { get; set; }
    }
}
