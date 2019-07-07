using System;
using System.Threading.Tasks;
using Imgur.API.Authentication.Impl;
using Imgur.API.Endpoints.Impl;
using Imgur.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Webapp;
using Webapp.Hubs;
using Webapp.Services;

[Route("/image")]
[ApiController]
public class ImageController : Controller
{
    private IConfiguration Configuration { get; }
    private ImgurClient ImgurClient { get; }
    private EventPublisher EventPublisher { get; }
    private readonly IHubContext<ActionHub> HubContext;

    public ImageController(IConfiguration configuration, 
        IHubContext<ActionHub> hubContext,
        ImgurClient imgurClient,
        EventPublisher eventPublisher)
    {
        Configuration = configuration;
        ImgurClient = imgurClient;
        EventPublisher = eventPublisher;
        HubContext = hubContext;
    }

    [HttpPost]
    public async Task<IActionResult> Post()
    {
        var files = HttpContext.Request.Form.Files;
        var endpoint = new ImageEndpoint(ImgurClient);
        IImage image = null;

        foreach (var formFile in files)
        {
            if (formFile.Length > 0)
            {
                image = await endpoint.UploadImageStreamAsync(formFile.OpenReadStream());
                await EventPublisher.publishEvent(image.Link, formFile.FileName);
            }
        }

        return Ok(new
        {
            url = image != null ? image.Link : ""
        });
    }

    [HttpPost]
    [Route("event")]
    public async Task<IActionResult> Post([FromBody] ImageStatusEvent imageEvent)
    {
        Console.WriteLine(imageEvent.Status);
        await HubContext.Clients.All.SendAsync("ReceiveEvent",
            $"Face detected for image '{imageEvent.ImageTitle}'",
            imageEvent.Status);
        return Ok();
    }
    
    [HttpGet]
    [Route("hello")]
    public async Task<IActionResult> Get()
    {
        return Ok("hello");
    }
}