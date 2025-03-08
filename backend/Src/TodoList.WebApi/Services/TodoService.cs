using TodoList.WebApi.DTOs;
using TodoList.WebApi.Interfaces;
using TodoList.WebApi.Models;
using TodoList.WebApi.Services.Interfaces;

namespace TodoList.WebApi.Services
{
    public class TodoService : ITodoService
    {
        private readonly ITodoRepository _todoRepository;

        public TodoService(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }

        public async Task<IEnumerable<ToDo>> GetAllTodosAsync()
        {
            return await _todoRepository.GetAllAsync();
        }

        public async Task<ToDo> GetTodoByIdAsync(string id)
        {
            return await _todoRepository.GetByIdAsync(id);
        }

        public async Task<ToDo> CreateTodoAsync(CreateTodoDto createTodoDto)
        {
            var todo = new ToDo
            {
                Title = createTodoDto.Title,
                Description = createTodoDto.Description,
                IsCompleted = false,
                CreatedAt = DateTime.UtcNow,
                CompletedAt = null
            };

            return await _todoRepository.CreateAsync(todo);
        }

        public async Task<bool> UpdateTodoAsync(string id, UpdateTodoDto updateTodoDto)
        {
            var existingTodo = await _todoRepository.GetByIdAsync(id);

            if (existingTodo == null)
            {
                return false;
            }

            existingTodo.Title = updateTodoDto.Title;
            existingTodo.Description = updateTodoDto.Description;

            if (!existingTodo.IsCompleted && updateTodoDto.IsCompleted)
            {
                existingTodo.CompletedAt = DateTime.UtcNow;
            }
            else if (existingTodo.IsCompleted && !updateTodoDto.IsCompleted)
            {
                existingTodo.CompletedAt = null;
            }

            existingTodo.IsCompleted = updateTodoDto.IsCompleted;

            return await _todoRepository.UpdateAsync(id, existingTodo);
        }

        public async Task<bool> DeleteTodoAsync(string id)
        {
            return await _todoRepository.DeleteAsync(id);
        }
    }
}