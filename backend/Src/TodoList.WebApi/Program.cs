using Microsoft.OpenApi.Models;
using TodoList.WebApi.Configuration;
using TodoList.WebApi.Data;
using TodoList.WebApi.Interfaces;
using TodoList.WebApi.Repositories;
using TodoList.WebApi.Services;
using TodoList.WebApi.Services.Interfaces;

namespace TodoList.WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();

            builder.Services.Configure<MongoDbSettings>(
                builder.Configuration.GetSection("MongoDbSettings"));

            builder.Services.AddSingleton<MongoDbContext>();
            builder.Services.AddSingleton<ITodoRepository, MongoDbTodoRepository>();
            builder.Services.AddScoped<ITodoService, TodoService>();

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "TodoList API", Version = "v1" });
            });

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp", policyBuilder =>
                {
                    policyBuilder.WithOrigins(
                        "http://localhost:3000",  // Adres React app
                        "https://localhost:3000", // Wersja HTTPS
                        "http://frontend:3000",   // Docker nazwa serwisu
                        "http://localhost:5020",  // Alternatywny adres API
                        "https://localhost:7213"  // Przekierowany adres HTTPS
                    )
                    .SetIsOriginAllowedToAllowWildcardSubdomains()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
            });

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "TodoList API v1"));
            }

            app.UseCors("AllowReactApp");
            //app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}
