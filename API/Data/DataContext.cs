using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<AppUser> Users { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<HealthFacility> HealthFacilities { get; set; }
        public DbSet<DocumentationType> DocumentationTypes { get; set; }
        public DbSet<Documentation> Documentations { get; set; }
    }
}