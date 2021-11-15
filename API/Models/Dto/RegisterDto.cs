using System.ComponentModel.DataAnnotations;

namespace API.Models.Dto
{
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; }
        
        [Required]
        [StringLength(8, MinimumLength = 4)]
        public string Password { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public string Profession { get; set; }
    }
}