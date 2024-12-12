use async_std::net::TcpListener;
use async_std::task;
use tungstenite::accept_async;
use tungstenite::Message;

#[async_std::main]
async fn main() {
    let addr = "127.0.0.1:5000";
    let listener = TcpListener::bind(addr).await.unwrap();
    println!("WebSocket server listening on {}", addr);

    while let Ok((stream, _)) = listener.accept().await {
        task::spawn(handle_connection(stream));
    }
}

async fn handle_connection(stream: async_std::net::TcpStream) {
    let ws_stream = accept_async(stream).await.expect("Error during WebSocket handshake");
    println!("New WebSocket connection: {:?}", ws_stream);

    // Handle messages
    for message in ws_stream.filter_map(Result::ok) {
        match message {
            Message::Text(text) => {
                println!("Received message: {}", text);
                // Echo the message back
                ws_stream.send(Message::Text(text)).await.expect("Failed to send message");
            }
            Message::Close(_) => {
                println!("Connection closed");
                break;
            }
            _ => {}
        }
    }
}