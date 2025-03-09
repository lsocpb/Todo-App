using Microsoft.AspNetCore.Mvc;
using TodoList.WebApi.DTOs;
using TodoList.WebApi.Interfaces;
using TodoList.WebApi.Models;
using TodoList.WebApi.Services.Interfaces;

namespace TodoList.WebApi.Controllers
{
    /// <summary>
    /// Kontroler do obsługi operacji na zadaniach
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly ITodoService _todoService;

        /// <summary>
        /// Konstruktor kontrolera
        /// </summary>
        /// <param name="todoService">Serwis do obsługi operacji na zadaniach</param>
        public TodoController(ITodoService todoService)
        {
            _todoService = todoService;
        }

        /// <summary>
        /// Pobiera wszystkie zadania
        /// </summary>
        /// <returns>Lista zadań</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToDo>>> GetAll()
        {
            var todos = await _todoService.GetAllTodosAsync();
            return Ok(todos);
        }

        /// <summary>
        /// Pobiera zadanie po identyfikatorze
        /// </summary>
        /// <param name="id">Identyfikator zadania</param>
        /// <returns>Zadanie</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<ToDo>> GetById(string id)
        {
            var todo = await _todoService.GetTodoByIdAsync(id);

            if (todo == null)
            {
                return NotFound();
            }

            return Ok(todo);
        }

        /// <summary>
        /// Tworzy nowe zadanie
        /// </summary>
        /// <param name="createTodoDto">Dane nowego zadania</param>
        /// <returns>Nowe zadanie</returns>
        [HttpPost]
        public async Task<ActionResult<ToDo>> Create([FromBody] CreateTodoDto createTodoDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdTodo = await _todoService.CreateTodoAsync(createTodoDto);

            return CreatedAtAction(
                nameof(GetById),
                new { id = createdTodo.Id },
                createdTodo);
        }

        /// <summary>
        /// Aktualizuje zadanie
        /// </summary>
        /// <param name="id">Identyfikator zadania</param>
        /// <param name="updateTodoDto">Dane do aktualizacji</param>
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] UpdateTodoDto updateTodoDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _todoService.UpdateTodoAsync(id, updateTodoDto);

            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

        /// <summary>
        /// Usuwa zadanie
        /// </summary>
        /// <param name="id">Identyfikator zadania</param>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var result = await _todoService.DeleteTodoAsync(id);

            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}