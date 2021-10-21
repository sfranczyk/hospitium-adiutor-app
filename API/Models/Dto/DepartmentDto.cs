namespace API.Models.Dto
{
    public class DepartmentDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string HealthFacilityName { get; set; }
        public int HealthFacilityId { get; set; }
    }
}