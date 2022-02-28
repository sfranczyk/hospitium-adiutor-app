using System.Collections.Generic;

namespace API.Models
{
    public class HealthFacility
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public ICollection<Department> Departments { get; set; }
    }
}