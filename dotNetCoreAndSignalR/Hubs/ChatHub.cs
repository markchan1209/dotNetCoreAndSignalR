using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        public Task SendMessageToGroup(string groupName, string message)
        {
            return Clients.Groups(groupName).SendAsync("Send", $"{Context.ConnectionId}:{message}");
        }

        public async Task AddToGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            await Clients.Groups(groupName).SendAsync("Send", $"{Context.ConnectionId} 加入房間 {groupName}");
        }

        public async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

            await Clients.Groups(groupName).SendAsync("Send", $"{Context.ConnectionId} 離開房間 {groupName}");
        }
    }
}