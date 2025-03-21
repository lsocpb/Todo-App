﻿using TodoList.WebApi.DTOs;
using TodoList.WebApi.Models;

namespace TodoList.WebApi.Services.Interfaces
{   
    /// <summary>
    /// Interfejs serwisu do obsługi operacji na zadaniach
    /// </summary>
    public interface ITodoService
    {
        Task<IEnumerable<ToDo>> GetAllTodosAsync();
        Task<ToDo> GetTodoByIdAsync(string id);
        Task<ToDo> CreateTodoAsync(CreateTodoDto createTodoDto);
        Task<bool> UpdateTodoAsync(string id, UpdateTodoDto updateTodoDto);
        Task<bool> DeleteTodoAsync(string id);
    }
}