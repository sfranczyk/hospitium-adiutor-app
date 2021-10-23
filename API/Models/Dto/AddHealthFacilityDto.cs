using System.Collections.Generic;

namespace API.Models.Dto
{
    public class AddHealthFacilityDto
    {
        public string Name { get; set; }
        public string City { get; set; }
        public ICollection<string> Departments { get; set; }
    }
}
