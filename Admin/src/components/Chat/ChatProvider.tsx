import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";

const SOCKET_SERVER_URL =
  process.env.REACT_APP_SOCKET_SERVER_URL;
// process.env.REACT_APP_SOCKET_SERVER_URL || 'http://localhost:8000';


interface Message {
  sender: "user" | "admin";
  message: string
  timestamp: string;
}

interface Chat {
  userId: string;
  messages: Message[];
  chatStatus: "active" | "closed" | "pending";
}

const ChatProvider: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [activeChats, setActiveChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState<string>("");

  const inputRef = useRef<HTMLInputElement | null>(null);
  const messageContainerRef = useRef<HTMLDivElement | null>(null); // Ref for the message container

  useEffect(() => {
    const socketConnection = io(SOCKET_SERVER_URL);
    setSocket(socketConnection);

    socketConnection.on("chat_message", (message: Message) => {
      if (currentChat && message.sender === "user") {
        setCurrentChat((prevChat) =>
          prevChat
            ? {
              ...prevChat,
              messages: [...prevChat.messages, message],
            }
            : null
        );
      }
    });

    return () => {
      socketConnection.disconnect();
    };
  }, [currentChat]);

  useEffect(() => {
    fetchChats();
  }, []);


  const fetchChats = async () => {
    try {
      const response = await axios.get(`${SOCKET_SERVER_URL}/getAllChat`);
      setActiveChats(response.data.chat);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const handleSelectChat = (chat: Chat) => {
    setCurrentChat(chat);
  };

  const sendMessage = () => {
    if (!socket || !newMessage.trim() || !currentChat) return;

    const messageData: Message = {
      sender: "admin",
      message: newMessage,
      timestamp: new Date().toISOString(),
    };

    socket.emit("admin_message", currentChat.userId, messageData.message);

    setCurrentChat((prevChat) =>
      prevChat
        ? {
          ...prevChat,
          messages: [...prevChat.messages, messageData],
        }
        : null
    );

    setNewMessage("");
    inputRef.current?.focus();
  };

  useEffect(() => {
    // Scroll to the bottom of the message container whenever messages change
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [currentChat?.messages]);

  return (
    <div className="flex h-[550px]">
      {/* Sidebar for active chats */}
      <div className="w-1/3 bg-gray-100 border border-gray-300 overflow-y-auto">
        <h3 className="text-lg font-semibold bg-blue-500 text-white p-4">
          Active Chats
        </h3>
        <ul>
          {activeChats.map((chat) => (
            <li
              key={chat.userId}
              onClick={() => handleSelectChat(chat)}
              className={`p-4 cursor-pointer border-b border-gray-200 ${currentChat?.userId === chat.userId
                ? "bg-blue-200"
                : "hover:bg-gray-200"
                }`}
            >
              <p className="text-xs text-white w-20 rounded-md text-center bg-green-600">Status: {chat.chatStatus}</p>
              <p className="text-sm font-medium">User ID: {chat.userId}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat window */}
      <div className="flex-1 flex flex-col">
        {currentChat ? (
          <>
            <div
              className="flex-1 overflow-y-auto p-4 border bg-white"
              ref={messageContainerRef} // Attach the ref to the message container
            >
              {currentChat.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-3 ${msg.sender === "admin" ? "text-right" : "text-left"}`}
                >
                  <div
                    className={`inline-block px-4 py-2 rounded-lg ${msg.sender === "admin"
                      ? "bg-blue-500 text-white"
                      : "bg-red-500 text-white"
                      }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>
            <div className="p-4 bg-gray-100 border border-gray-300 border-t-white flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 rounded-md p-2"
                ref={inputRef}
              />
              <button
                onClick={sendMessage}
                className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1 bg-gray-50">
            <h3 className="text-gray-500 text-lg">Select a chat to start messaging</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatProvider;
