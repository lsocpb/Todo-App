namespace TodoList.WebApi.Configuration
{
    /// <summary>
    /// Klasa reprezentująca ustawienia bazy danych MongoDB
    /// </summary>
    public class MongoDbSettings
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public string CollectionName { get; set; }
    }
}
