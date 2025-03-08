using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TodoList.WebApi.Configuration;
using TodoList.WebApi.Data;
using TodoList.WebApi.Interfaces;
using TodoList.WebApi.Models;

namespace TodoList.WebApi.Repositories
{
    public class MongoDbTodoRepository : ITodoRepository
    {
        private readonly IMongoCollection<ToDo> _todos;

        public MongoDbTodoRepository(MongoDbContext context, IOptions<MongoDbSettings> settings)
        {
            _todos = context.GetCollection<ToDo>(settings.Value.CollectionName);
        }

        public async Task<IEnumerable<ToDo>> GetAllAsync()
        {
            return await _todos.Find(todo => true).ToListAsync();
        }

        public async Task<ToDo> GetByIdAsync(string id)
        {
            return await _todos.Find(todo => todo.Id == id).FirstOrDefaultAsync();
        }

        public async Task<ToDo> CreateAsync(ToDo toDo)
        {
            await _todos.InsertOneAsync(toDo);
            return toDo;
        }

        public async Task<bool> UpdateAsync(string id, ToDo toDo)
        {
            var result = await _todos.ReplaceOneAsync(todo => todo.Id == id, toDo);
            return result.IsAcknowledged && result.ModifiedCount > 0;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var result = await _todos.DeleteOneAsync(todo => todo.Id == id);
            return result.IsAcknowledged && result.DeletedCount > 0;
        }
    }
}
