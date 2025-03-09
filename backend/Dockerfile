FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

COPY TodoList.sln .
COPY Src/TodoList.WebApi/*.csproj Src/TodoList.WebApi/
COPY Tests/TodoList.IntegrationTests/*.csproj Tests/TodoList.IntegrationTests/

RUN dotnet restore

COPY . .

RUN dotnet publish -c Release -o out Src/TodoList.WebApi/

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/out .
ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80
ENTRYPOINT ["dotnet", "TodoList.WebApi.dll"]