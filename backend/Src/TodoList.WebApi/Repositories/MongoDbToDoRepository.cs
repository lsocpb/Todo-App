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
    }
}
