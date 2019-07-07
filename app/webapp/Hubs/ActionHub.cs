using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Webapp.Hubs
{
    public class ActionHub : Hub
    {
        public async Task SendSuccessMessage(string message, string result)
        {
            await Clients.All.SendAsync("ReceiveEvent", message, result);
        }
    }
}