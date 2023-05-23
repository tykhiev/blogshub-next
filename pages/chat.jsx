import { useState, useEffect } from "react";
import io from "socket.io-client";
import Layout from "./components/layout";

const socket = io("http://localhost:5000");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [joined, setJoined] = useState(false);
  const [name, setName] = useState("");
  const [typingDisplay, setTypingDisplay] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function chatData() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("user"),
        },
      });
      const data = await res.json();
    }
    socket.emit("findAllMessages", {}, (response) => {
      setMessages(response);
    });

    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [messages]);

  const sendMessage = () => {
    socket.emit("createMessage", { text: messageText }, () => {
      setMessageText("");
    });
  };

  const join = () => {
    socket.emit("join", { name }, (user) => {
      setUser(user);
      setJoined(true);
    });
  };

  const emitTyping = () => {
    socket.emit("typing", { isTyping: true });

    const timeout = setTimeout(() => {
      socket.emit("typing", { isTyping: false });
    }, 2000);
    chatData();
  };
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold mb-4 text-center">BlogsHub Chat</h1>
          <ul className="mb-6">
            {messages.map((message, index) => (
              <li key={index} className="mb-2">
                <span className="font-bold">{message.name}: </span>
                {message.text}
              </li>
            ))}
          </ul>
          <div className="flex items-center mb-6">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 border border-gray-300 rounded-lg py-2 px-4 mr-2"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Send
            </button>
          </div>
          {!joined && (
            <div className="flex items-center mb-6">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg py-2 px-4 mr-2"
              />
              <button
                onClick={join}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Join
              </button>
            </div>
          )}
          {typingDisplay && (
            <p className="text-gray-600">{typingDisplay} is typing...</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
