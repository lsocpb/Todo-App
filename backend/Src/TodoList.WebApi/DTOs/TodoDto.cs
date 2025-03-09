namespace TodoList.WebApi.DTOs
{
    /// <summary>
    /// DTO dla tworzenia nowego zadania
    /// </summary>
    public class CreateTodoDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
    }

    /// <summary>
    /// DTO dla aktualizacji zadania
    /// </summary>
    public class UpdateTodoDto 
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public bool? IsCompleted { get; set; }
    }
}
