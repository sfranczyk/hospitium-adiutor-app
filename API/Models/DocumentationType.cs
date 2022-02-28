namespace API.Models
{
    public class DocumentationType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsUnused { get; set; }
        public string JsonDescription { get; set; }
    }
}