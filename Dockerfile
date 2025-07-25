FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["institutoSanJuan.csproj", "./"]
RUN dotnet restore "./institutoSanJuan.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "institutoSanJuan.csproj" -c Release -o /app/build
RUN dotnet publish "institutoSanJuan.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "institutoSanJuan.dll"]