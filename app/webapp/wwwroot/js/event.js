"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/actionHub").build();

connection.on("ReceiveEvent", function (message, result) {
    console.log(message);
    var alertType = result === "success" ? "success" : "danger"  
    var parser = new DOMParser();
    var domString = `<div class="alert alert-${alertType}" role="alert">${message}</div>`;
    var html = parser.parseFromString(domString, 'text/html');    
    document.getElementById("messagesList").prepend(html.body.firstChild);
});

connection.start().then(function(){ 
    console.log("Connection started");
}).catch(function (err) {
    return console.error(err.toString());
})
