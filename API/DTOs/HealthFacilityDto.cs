using System.Collections.Generic;

namespace API.DTOs
{
    public class HealthFacilityDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public ICollection<DepartmentNameDto> Departments { get; set; }
    }
}