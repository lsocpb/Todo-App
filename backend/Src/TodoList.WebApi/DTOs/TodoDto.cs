namespace TodoList.WebApi.DTOs
{
    public class CreateTodoDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
    }

    public class UpdateTodoDto 
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public bool? IsCompleted { get; set; }
    }
}
