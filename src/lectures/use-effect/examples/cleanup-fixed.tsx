import { useEffect } from "react";

export function ChatRoom({ roomId }: any) {
  useEffect(() => {
    const socket = new WebSocket(`ws://chat.example.com/${roomId}`);

    socket.onmessage = (event) => {
      console.log("New message:", event.data);
    };

    return () => {
      socket.close();
    };
  }, [roomId]);

  return <div>Chat Room {roomId}</div>;
}
