using System;
using API.Enums;

namespace API.Models.Dto
{
    public class PatientDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Pesel { get; set; }
        public Sex Sex { get; set; }
        public int Age { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string PlaceOfBirth { get; set; }
        public HealthFacilityNameDto HealthFacility { get; set; }
        public DepartmentNameDto Department { get; set; }
    }
}