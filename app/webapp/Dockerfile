FROM microsoft/dotnet:2.2-sdk AS builder

COPY *.csproj ./app/
COPY . ./app/
WORKDIR /app
RUN dotnet publish -c Release -o out

FROM microsoft/dotnet:2.2-aspnetcore-runtime AS runtime
WORKDIR /app
COPY --from=builder /app/out ./
ENTRYPOINT ["dotnet", "Webapp.dll"]