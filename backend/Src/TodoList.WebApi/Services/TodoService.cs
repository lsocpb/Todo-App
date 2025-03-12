using TodoList.WebApi.DTOs;
using TodoList.WebApi.Interfaces;
using TodoList.WebApi.Models;
using TodoList.WebApi.Services.Interfaces;
using TodoList.WebApi.Constants;

namespace TodoList.WebApi.Services
{
    /// <summary>
    /// Serwis do obsługi operacji na zadaniach
    /// </summary>
    public class TodoService : ITodoService
    {
        private readonly ITodoRepository _todoRepository;

        /// <summary>
        /// Konstruktor serwisu
        /// </summary>
        public TodoService(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }

        /// <summary>
        /// Pobiera wszystkie zadania
        /// </summary>
        /// <returns>Lista zadań</returns>
        public async Task<IEnumerable<ToDo>> GetAllTodosAsync()
        {
            try
            {
                return await _todoRepository.GetAllAsync();
            }
            catch (Exception)
            {
                throw new Exception(ErrorMessages.ERROR_FETCHING_TODOS);
            }
        }

        /// <summary>
        /// Pobiera zadanie po identyfikatorze
        /// </summary>
        /// <param name="id">Identyfikator zadania</param>
        public async Task<ToDo> GetTodoByIdAsync(string id)
        {
            try
            {
                return await _todoRepository.GetByIdAsync(id);
            }
            catch (Exception)
            {
                throw new Exception(ErrorMessages.ERROR_FETCHING_TODO_BY_ID);
            }
        }

        /// <summary>
        /// Tworzy nowe zadanie
        /// </summary>
        /// <param name="createTodoDto">Dane nowego zadania</param>
        /// <returns>Nowe zadanie</returns>
        public async Task<ToDo> CreateTodoAsync(CreateTodoDto createTodoDto)
        {
            try
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
            catch (Exception)
            {
                throw new Exception(ErrorMessages.ERROR_CREATING_TODO);
            }
        }

        /// <summary>
        /// Aktualizuje zadanie
        /// </summary>
        /// <param name="id">Identyfikator zadania</param>
        /// <param name="updateTodoDto">Dane do aktualizacji</param>
        /// <returns>True jeśli aktualizacja się powiodła, w przeciwnym wypadku false</returns>
        public async Task<bool> UpdateTodoAsync(string id, UpdateTodoDto updateTodoDto)
        {
            try
            {
                var existingTodo = await _todoRepository.GetByIdAsync(id);

                if (existingTodo == null)
                {
                    return false;
                }

                if (updateTodoDto.Title != null)
                {
                    existingTodo.Title = updateTodoDto.Title;
                }

                if (updateTodoDto.Description != null)
                {
                    existingTodo.Description = updateTodoDto.Description;
                }

                if (updateTodoDto.IsCompleted.HasValue)
                {
                    if (!existingTodo.IsCompleted && updateTodoDto.IsCompleted.Value)
                    {
                        existingTodo.CompletedAt = DateTime.UtcNow;
                    }
                    else if (existingTodo.IsCompleted && !updateTodoDto.IsCompleted.Value)
                    {
                        existingTodo.CompletedAt = null;
                    }

                    existingTodo.IsCompleted = updateTodoDto.IsCompleted.Value;
                }

                return await _todoRepository.UpdateAsync(id, existingTodo);
            }
            catch (Exception)
            {
                throw new Exception(ErrorMessages.ERROR_UPDATING_TODO);
            }
        }

        /// <summary>
        /// Usuwa zadanie
        /// </summary>
        /// <param name="id">Identyfikator zadania</param>
        /// <returns>True jeśli usunięcie się powiodło, w przeciwnym wypadku false</returns>
        public async Task<bool> DeleteTodoAsync(string id)
        {
            try
            {
                return await _todoRepository.DeleteAsync(id);
            }
            catch (Exception)
            {
                throw new Exception(ErrorMessages.ERROR_DELETING_TODO);
            }
        }
    }
}
