using System.Collections.Generic;

namespace API.Models
{
    public class Worker
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        // [ForeignKey("ProfessionId")] 
        public int ProfessionId { get; set; }
        public ICollection<Profession> Profession{ get; set; }
    }
}