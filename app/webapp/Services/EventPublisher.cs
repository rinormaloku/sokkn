using System;
using System.Net.Http;
using System.Net.Mime;
using System.Threading.Tasks;
using CloudNative.CloudEvents;
using Newtonsoft.Json;

namespace Webapp.Services
{
    public class EventPublisher
    {
        private string BrokerUrl { get; }

        public EventPublisher(string brokerUrl)
        {
            BrokerUrl = brokerUrl;
        }

        public async Task publishEvent(string url, string name)
        {
            var cloudEvent = new CloudEvent("webapp.image.uploaded", 
                new Uri("urn:webapp.dev:webapp"))
            {
                ContentType = new ContentType(MediaTypeNames.Application.Json),
                SpecVersion = CloudEventsSpecVersion.V0_2,
                Data = JsonConvert.SerializeObject(new
                {
                    url = url,
                    title = name
                })
            };
        
            var content = new CloudEventContent(cloudEvent, 
                ContentMode.Structured, 
                new JsonEventFormatter());

            var httpClient = new HttpClient();
            await httpClient.PostAsync(BrokerUrl, content);
        }
    }
}