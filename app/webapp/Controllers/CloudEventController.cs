using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Webapp;
using Webapp.Hubs;

[Route("/")]
[ApiController]
public class CloudEventController : Controller
{
    private IConfiguration Configuration { get; }
    private readonly IHubContext<ActionHub> HubContext;

    public CloudEventController(IConfiguration configuration, IHubContext<ActionHub> hubContext)
    {
        Configuration = configuration;
        HubContext  = hubContext;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] ImageStatusEvent imageEvent)
    {
        Console.WriteLine(imageEvent.Status);

        return Ok();
    }

}