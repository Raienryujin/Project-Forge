// ============================================================================
// Project Forge — High-Performance .NET 8 Minimal API
// ============================================================================
// Performance strategy:
//   • Console logging is stripped from Kestrel to eliminate I/O blocking on
//     the hot path. Wire up a structured sink (Serilog/OpenTelemetry) instead.
//   • No controllers, no MVC middleware, no Razor — pure Minimal API.
//   • Response caching and output caching middleware included but commented
//     out — uncomment per endpoint as needed.
// ============================================================================

using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.Extensions.Diagnostics.HealthChecks;

var builder = WebApplication.CreateBuilder(args);


// ── Logging ──────────────────────────────────────────────────────────────────
// Remove all default providers (Console, Debug, EventLog) to prevent
// synchronous log I/O from blocking the Kestrel thread pool on hot paths.
// Replace with a high-throughput async sink in production (e.g., Serilog).
builder.Logging.ClearProviders();

#if DEBUG
// Restore console logging in local development only.
builder.Logging.AddConsole();
builder.Logging.SetMinimumLevel(LogLevel.Debug);
#endif

// ── Kestrel ───────────────────────────────────────────────────────────────
builder.WebHost.ConfigureKestrel(options =>
{
    // Increase the max concurrent connections ceiling.
    // Tune these values based on your load-test results.
    options.Limits.MaxConcurrentConnections = 10_000;
    options.Limits.MaxConcurrentUpgradedConnections = 10_000;

    // Reduce header size limits to reject oversized requests early.
    options.Limits.MaxRequestHeadersTotalSize = 32_768; // 32 KB
});

// ── Services ──────────────────────────────────────────────────────────────
builder.Services.AddHealthChecks();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "v1";
    config.Title = "Project Forge API";
    config.Version = "v1";
});

// Output cache (uncomment to use)
// builder.Services.AddOutputCache();

// CORS — tighten for production.
builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy =>
        policy
            .WithOrigins(
                builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
                ?? ["http://localhost:3000"]
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
    )
);

// ── Build ─────────────────────────────────────────────────────────────────
var app = builder.Build();

// ── Middleware ────────────────────────────────────────────────────────────
if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi(); // NSwag serves the UI via this method
}

app.UseCors();
// app.UseOutputCache();

// ── Endpoints ────────────────────────────────────────────────────────────

// Health check — used by load balancers, k8s liveness probes, and CI smoke tests.
app.MapHealthChecks("/health", new HealthCheckOptions
{
    ResultStatusCodes =
    {
        [HealthStatus.Healthy]   = StatusCodes.Status200OK,
        [HealthStatus.Degraded]  = StatusCodes.Status200OK,
        [HealthStatus.Unhealthy] = StatusCodes.Status503ServiceUnavailable,
    }
})
.WithName("HealthCheck")
.WithTags("Observability");

// Version / liveness probe (lighter than /health — no dependency checks).
app.MapGet("/", () => Results.Ok(new
{
    service = "Project Forge API",
    version = "1.0.0",
    status = "running",
    timestamp = DateTime.UtcNow
}))
.WithName("Root")
.WithTags("Meta")
.CacheOutput(p => p.Expire(TimeSpan.FromSeconds(5)));

// ── Example domain endpoint (replace / extend) ────────────────────────────
var api = app.MapGroup("/api/v1");

api.MapGet("/ping", () => Results.Ok(new { message = "pong" }))
   .WithName("Ping")
   .WithTags("Diagnostics");

// ── Run ───────────────────────────────────────────────────────────────────
// Prevent the app from running indefinitely when NSwag is generating the OpenAPI spec
if (app.Environment.EnvironmentName != "NSwag")
{
    app.Run();
}

// Required for NSwag and WebApplicationFactory to discover the Minimal API entry point
public partial class Program { }
