using TodoList.WebApi.Models;

namespace TodoList.WebApi.Interfaces
{   
    /// <summary>
    /// Interfejs repozytorium zadan
    /// </summary>
    public interface ITodoRepository
    {
        Task<IEnumerable<ToDo>> GetAllAsync();
        Task<ToDo> GetByIdAsync(string id);
        Task<ToDo> CreateAsync(ToDo toDo);
        Task<bool> UpdateAsync(string id, ToDo todo);
        Task<bool> DeleteAsync(string id);
    }
}
