// chat.js

const socket = new WebSocket('ws://127.0.0.1:5000');

socket.onopen = function() {
    console.log("WebSocket connection established.");
};

socket.onerror = function(event) {
    console.error("WebSocket error observed:", event);
};

socket.onclose = function(event) {
    console.log("WebSocket connection closed:", event);
};

// Function to send a message
function sendMessage(chatName, message) {
    if (chatName && message) {
        const packet = {
            chat_room: chatName,
            chat_name: "YourChatName", // Replace with actual chat name
            message: message
        };
        console.log("Sending packet:", packet); // Log the packet
        socket.send(JSON.stringify(packet));
    } else {
        console.error("Chat name and message cannot be empty.");
    }
}

// Function to handle sending messages from the input fields
function handleSendButton() {
    const chatNameInput = document.getElementById('chatName');
    const messageInput = document.getElementById('message');
    const chatRoomSelect = document.getElementById('chatRoomSelect');

    const chatName = chatNameInput.value;
    const message = messageInput.value;
    const chatRoom = chatRoomSelect.value;

    sendMessage(chatRoom, message);
    messageInput.value = ''; // Clear the input
}

// Attach event listener to the send button
document.getElementById('send').onclick = handleSendButton;