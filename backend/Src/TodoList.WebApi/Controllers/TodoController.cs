using Microsoft.AspNetCore.Mvc;
using TodoList.WebApi.Constants;
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
            try
            {
                var todos = await _todoService.GetAllTodosAsync();
                return Ok(todos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        /// <summary>
        /// Pobiera zadanie po identyfikatorze
        /// </summary>
        /// <param name="id">Identyfikator zadania</param>
        /// <returns>Zadanie</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<ToDo>> GetById(string id)
        {
            try
            {
                var todo = await _todoService.GetTodoByIdAsync(id);
                if (todo == null)
                {
                    return NotFound(new { message = ErrorMessages.TODO_NOT_FOUND });
                }
                return Ok(todo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
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
                return BadRequest(new { message = "Invalid model state" });
            }

            try
            {
                var createdTodo = await _todoService.CreateTodoAsync(createTodoDto);
                return CreatedAtAction(
                    nameof(GetById),
                    new { id = createdTodo.Id },
                    createdTodo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
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
                return BadRequest(new { message = "Invalid model state" });
            }

            try
            {
                var result = await _todoService.UpdateTodoAsync(id, updateTodoDto);
                if (!result)
                {
                    return NotFound(new { message = ErrorMessages.TODO_NOT_FOUND });
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        /// <summary>
        /// Usuwa zadanie
        /// </summary>
        /// <param name="id">Identyfikator zadania</param>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                var result = await _todoService.DeleteTodoAsync(id);
                if (!result)
                {
                    return NotFound(new { message = ErrorMessages.TODO_NOT_FOUND });
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}