using Microsoft.AspNetCore.Mvc.Testing;
using System.Text.Json;
using System.Text;
using TodoList.WebApi;
using TodoList.WebApi.DTOs;
using TodoList.WebApi.Models;

namespace TodoList.IntegrationTests;
/// <summary>
/// Klasa testów kontrolera zadań
/// </summary>
public class TodoControllerTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    /// <summary>
    /// Konstruktor testów kontrolera zadań
    /// </summary>
    /// <param name="factory">Fabryka aplikacji</param>
    public TodoControllerTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    /// <summary>
    /// Test sprawdzający czy tworzone jest zadanie (Create)
    /// </summary>
    [Fact]
    public async Task CreateTodo_ReturnsCreatedTodo()
    {
        var createTodoDto = new CreateTodoDto
        {
            Title = "Test Title",
            Description = "Test Description"
        };

        var content = new StringContent(JsonSerializer.Serialize(createTodoDto), Encoding.UTF8, "application/json");

        var response = await _client.PostAsync("/api/todo", content);

        response.EnsureSuccessStatusCode();
        var createdTodo = JsonSerializer.Deserialize<ToDo>(await response.Content.ReadAsStringAsync(), new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        Assert.NotNull(createdTodo);
        Assert.Equal("Test Title", createdTodo.Title);
        Assert.Equal("Test Description", createdTodo.Description);
    }
    /// <summary>
    /// Test sprawdzający czy pobierane jest zadanie po identyfikatorze (Get)
    /// </summary>
    /// <returns></returns>
    [Fact]
    public async Task GetTodoById_ReturnsTodo()
    {
        var createTodoDto = new CreateTodoDto
        {
            Title = "Test Title",
            Description = "Test Description"
        };

        var createContent = new StringContent(JsonSerializer.Serialize(createTodoDto), Encoding.UTF8, "application/json");
        var createResponse = await _client.PostAsync("/api/todo", createContent);
        createResponse.EnsureSuccessStatusCode();
        var createdTodo = JsonSerializer.Deserialize<ToDo>(await createResponse.Content.ReadAsStringAsync(), new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

        var response = await _client.GetAsync($"/api/todo/{createdTodo.Id}");

        response.EnsureSuccessStatusCode();
        var fetchedTodo = JsonSerializer.Deserialize<ToDo>(await response.Content.ReadAsStringAsync(), new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        Assert.NotNull(fetchedTodo);
        Assert.Equal(createdTodo.Id, fetchedTodo.Id);
        Assert.Equal("Test Title", fetchedTodo.Title);
        Assert.Equal("Test Description", fetchedTodo.Description);
    }
    /// <summary>
    /// Test sprawdzający czy aktualizowane jest zadanie (Update)
    /// </summary>
    [Fact]
    public async Task UpdateTodo_ReturnsNoContent()
    {
        var createTodoDto = new CreateTodoDto
        {
            Title = "Test Title",
            Description = "Test Description"
        };

        var createContent = new StringContent(JsonSerializer.Serialize(createTodoDto), Encoding.UTF8, "application/json");
        var createResponse = await _client.PostAsync("/api/todo", createContent);
        createResponse.EnsureSuccessStatusCode();
        var createdTodo = JsonSerializer.Deserialize<ToDo>(await createResponse.Content.ReadAsStringAsync(), new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

        var updateTodoDto = new UpdateTodoDto
        {
            Title = "Updated Title",
            Description = "Updated Description",
            IsCompleted = true
        };

        var updateContent = new StringContent(JsonSerializer.Serialize(updateTodoDto), Encoding.UTF8, "application/json");

        var response = await _client.PutAsync($"/api/todo/{createdTodo.Id}", updateContent);

        response.EnsureSuccessStatusCode();
        var updatedGetResponse = await _client.GetAsync($"/api/todo/{createdTodo.Id}");
        updatedGetResponse.EnsureSuccessStatusCode();
        var updatedTodo = JsonSerializer.Deserialize<ToDo>(await updatedGetResponse.Content.ReadAsStringAsync(), new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        Assert.NotNull(updatedTodo);
        Assert.Equal("Updated Title", updatedTodo.Title);
        Assert.Equal("Updated Description", updatedTodo.Description);
        Assert.True(updatedTodo.IsCompleted);
    }
    /// <summary>
    /// Test sprawdzający czy usuwane jest zadanie (Delete)
    /// </summary>
    [Fact]
    public async Task DeleteTodo_ReturnsNoContent()
    {
        var createTodoDto = new CreateTodoDto
        {
            Title = "Test Title",
            Description = "Test Description"
        };

        var createContent = new StringContent(JsonSerializer.Serialize(createTodoDto), Encoding.UTF8, "application/json");
        var createResponse = await _client.PostAsync("/api/todo", createContent);
        createResponse.EnsureSuccessStatusCode();
        var createdTodo = JsonSerializer.Deserialize<ToDo>(await createResponse.Content.ReadAsStringAsync(), new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

        var response = await _client.DeleteAsync($"/api/todo/{createdTodo.Id}");

        response.EnsureSuccessStatusCode();
        var deletedGetResponse = await _client.GetAsync($"/api/todo/{createdTodo.Id}");
        Assert.Equal(System.Net.HttpStatusCode.NotFound, deletedGetResponse.StatusCode);
    }
}