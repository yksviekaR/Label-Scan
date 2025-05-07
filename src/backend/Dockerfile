FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /App

COPY . ./
RUN dotnet restore
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
ENV ASPNETCORE_URLS="http://+"
WORKDIR /App
COPY --from=build-env /App/out .
ENTRYPOINT ["dotnet", "CodeApi.dll"]