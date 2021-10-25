using System;
using API.Enums;
using API.Extensions;

namespace API.Models
{
    public class Patient
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Pesel { get; set; }
        public Sex Sex { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string PlaceOfBirth { get; set; }
        public Department Department { get; set; }

        public int GetAge()
        {
            return DateOfBirth.CalculateAge();
        }
    }
}