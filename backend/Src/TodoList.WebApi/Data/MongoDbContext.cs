using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using TodoList.WebApi.Configuration;

namespace TodoList.WebApi.Data
{
    /// <summary>
    /// Klasa reprezentująca kontekst bazy danych MongoDB
    /// </summary>
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        /// <summary>
        /// Konstruktor inicializujący kontekst bazy danych MongoDB
        /// </summary>
        /// <param name="settings">Opcje</param>
        public MongoDbContext(IOptions<MongoDbSettings> settings)
        {
            var mongoClientSettings = MongoClientSettings.FromConnectionString(settings.Value.ConnectionString);

            mongoClientSettings.ServerApi = new ServerApi(ServerApiVersion.V1);

            var client = new MongoClient(mongoClientSettings);
            _database = client.GetDatabase(settings.Value.DatabaseName);
            
        }

        /// <summary>
        /// Pobiera kolekcję z bazy danych
        /// </summary>
        public IMongoCollection<T> GetCollection<T>(string name)
        {
            return _database.GetCollection<T>(name);
        }
    }
}
