using System;

namespace API.Models.Dto
{
    public class PatientRegisterDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Pesel { get; set; }
        public int Sex { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string PlaceOfBirth { get; set; }
    }
}