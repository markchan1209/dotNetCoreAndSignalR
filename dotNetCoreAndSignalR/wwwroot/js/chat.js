// 建立連線
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

// 發送訊息
connection.on("Send",
    function (message) {
        var li = document.createElement("li");
        li.textContent = message;
        document.getElementById("messagesList").appendChild(li);
    });

document.getElementById("groupmsg").addEventListener("click", async (event) => {
    var groupName = document.getElementById("group-name").value;
    var groupMsg = document.getElementById("group-message-text").value;
    try {
        await connection.invoke("SendMessageToGroup", groupName, groupMsg);
    } catch (e) {
        console.error(e);
    }
    event.preventDefault();
});
document.getElementById("join-group").addEventListener("click", async (event) => {
    var groupName = document.getElementById("group-name").value;
    try {
        await connection.invoke("AddToGroup", groupName);
    } catch (e) {
        console.error(e);
    }
    event.preventDefault();
});

document.getElementById("leave-group").addEventListener("click", async (event) => {
    var groupName = document.getElementById("group-name").value;
    try {
        await connection.invoke("RemoveFromGroup", groupName);
        var foo = document.getElementById('messagesList');
        while (foo.firstChild) foo.removeChild(foo.firstChild);
    } catch (e) {
        console.error(e);
    }
    event.preventDefault();
});
(async () => {
    try {
        await connection.start();
    } catch (e) {
        console.error(e.toString());
    }
})();