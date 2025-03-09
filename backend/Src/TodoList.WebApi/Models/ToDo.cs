using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TodoList.WebApi.Models
{   
    /// <summary>
    /// Klasa bazy Mongo reprezentująca zadanie
    /// </summary>
    public class ToDo
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? CompletedAt { get; set; }
    }
}
