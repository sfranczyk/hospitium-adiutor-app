using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    [Table("Departments")]
    public class Department
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public HealthFacility HealthFacility { get; set; }
        public int HealthFacilityId { get; set; }
    }
}