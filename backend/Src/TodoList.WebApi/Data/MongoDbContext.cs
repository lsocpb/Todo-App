using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using TodoList.WebApi.Configuration;

namespace TodoList.WebApi.Data
{
    /// <summary>
    /// The MongoDbContext class manages the connection to a MongoDB database 
    /// based on the configuration provided by the MongoDbSettings class.
    /// </summary>
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        /// <summary>
        /// Initializes a new instance of the <see cref="MongoDbContext"/> class 
        /// and establishes a connection to the MongoDB database using the specified settings.
        /// </summary>
        /// <param name="settings">The MongoDB configuration options.</param>
        public MongoDbContext(IOptions<MongoDbSettings> settings)
        {
            var mongoClientSettings = MongoClientSettings.FromConnectionString(settings.Value.ConnectionString);

            mongoClientSettings.ServerApi = new ServerApi(ServerApiVersion.V1);

            var client = new MongoClient(mongoClientSettings);
            _database = client.GetDatabase(settings.Value.DatabaseName);
            
        }

        /// <summary>
        /// Gets a collection from the MongoDB database.
        /// </summary>
        public IMongoCollection<T> GetCollection<T>(string name)
        {
            return _database.GetCollection<T>(name);
        }
    }
}
