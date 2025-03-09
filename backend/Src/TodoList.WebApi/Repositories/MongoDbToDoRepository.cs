using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TodoList.WebApi.Configuration;
using TodoList.WebApi.Data;
using TodoList.WebApi.Interfaces;
using TodoList.WebApi.Models;

namespace TodoList.WebApi.Repositories
{   
    /// <summary>
    /// Repozytorium zadań w bazie danych MongoDB
    /// </summary>
    public class MongoDbTodoRepository : ITodoRepository
    {
        private readonly IMongoCollection<ToDo> _todos;

        /// <summary>
        /// Konstruktor repozytorium zadań w bazie danych MongoDB
        /// </summary>
        /// <param name="context">Kontekst bazy danych</param>
        /// <param name="settings">Ustawienia bazy danych</param>
        public MongoDbTodoRepository(MongoDbContext context, IOptions<MongoDbSettings> settings)
        {
            _todos = context.GetCollection<ToDo>(settings.Value.CollectionName);
        }

        /// <summary>
        /// Pobiera wszystkie zadania
        /// </summary>
        /// <returns>Lista zadań</returns>
        public async Task<IEnumerable<ToDo>> GetAllAsync()
        {
            return await _todos.Find(todo => true).ToListAsync();
        }

        /// <summary>
        /// Pobiera zadanie po identyfikatorze
        /// </summary>
        /// <param name="id">Identyfikator zadania</param>
        /// <returns>Zadanie</returns>
        public async Task<ToDo> GetByIdAsync(string id)
        {
            return await _todos.Find(todo => todo.Id == id).FirstOrDefaultAsync();
        }

        /// <summary>
        /// Tworzy nowe zadanie
        /// </summary>
        /// <param name="toDo">Nowe zadanie</param>
        /// <returns>Nowe zadanie</returns>
        public async Task<ToDo> CreateAsync(ToDo toDo)
        {
            await _todos.InsertOneAsync(toDo);
            return toDo;
        }

        /// <summary>
        /// Aktualizuje zadanie
        /// </summary>
        /// <param name="id">Identyfikator zadania</param>
        /// <param name="toDo">Zadanie</param>
        public async Task<bool> UpdateAsync(string id, ToDo toDo)
        {
            var result = await _todos.ReplaceOneAsync(todo => todo.Id == id, toDo);
            return result.IsAcknowledged && result.ModifiedCount > 0;
        }

        /// <summary>
        /// Usuwa zadanie
        /// </summary>
        /// <param name="id">Identyfikator zadania</param>
        public async Task<bool> DeleteAsync(string id)
        {
            var result = await _todos.DeleteOneAsync(todo => todo.Id == id);
            return result.IsAcknowledged && result.DeletedCount > 0;
        }
    }
}
