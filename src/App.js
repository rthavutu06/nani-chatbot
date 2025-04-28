import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { sendToOpenAI } from "./api"; // <-- Import our API function

function App() {
  const [messages, setMessages] = useState([
    { sender: "NANI", text: "Hello, Commander. Ready to begin the operation? 🤖" }
  ]);
  const [input, setInput] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (input.trim() === "") return;
  
    const newMessage = { sender: "You", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "NANI", text: "." }]);
    }, 300);
  
    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        message: input
      });
  
      const naniReply = response.data.reply;
  
      setTimeout(() => {
        setMessages((prev) => [
          ...prev.slice(0, -1), // remove typing
          { sender: "NANI", text: naniReply }
        ]);
      }, 2000);
  
    } catch (error) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { sender: "NANI", text: "⚠️ Sorry, Commander, I'm experiencing some issues right now." }
      ]);
    }
  };
  
  

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (showWelcome) {
    return (
      <div style={{
        height: "100vh",
        background: "#121212",
        color: "#ffca28",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Orbitron', sans-serif",
        textAlign: "center",
        padding: "20px"
      }}>
        <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>🚀 Welcome to the New Age AI — NANI</h1>
        <p style={{ fontSize: "18px", marginBottom: "40px", color: "#e0e0e0" }}>
          Your personal AI Assistant. Powered by StarkTech Intelligence. 🦾
        </p>
        <button
        onClick={() => {
          const audio = new Audio("/beep.mp3"); // 👈 Your beep file inside /public
          audio.play();
          setShowWelcome(false);
        }}
        style={{
          backgroundColor: "#b71c1c",
          color: "white",
          border: "none",
          padding: "15px 30px",
          borderRadius: "9999px",
          fontSize: "18px",
          cursor: "pointer",
          fontWeight: "bold",
          transition: "background 0.3s ease"
        }}
      >
        Continue
      </button>

      </div>
    );
  }

  return (
    <div style={{
      height: "100vh",
      background: "#121212",
      display: "flex",
      flexDirection: "column",
      fontFamily: "'Orbitron', sans-serif",
      color: "white"
    }}>
      {/* Header */}
      <div style={{
        padding: "20px",
        backgroundColor: "#1f1f1f",
        color: "#ffca28",
        fontSize: "22px",
        fontWeight: "bold",
        textAlign: "center",
        borderBottom: "1px solid #333"
      }}>
        🦾 Nani0.1
      </div>

      {/* Chat Area */}
      <div style={{
        flex: 1,
        padding: "20px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}>
        {messages.map((msg, index) => (
          <div key={index} style={{
            alignSelf: msg.sender === "You" ? "flex-end" : "flex-start",
            background: msg.sender === "You" ? "#b71c1c" : "#2c2c2c",
            color: msg.sender === "You" ? "white" : "#ffca28",
            borderRadius: "20px",
            padding: "12px 18px",
            margin: "8px 0",
            maxWidth: "70%",
            fontSize: "16px",
            lineHeight: "1.5",
            boxShadow: "0 2px 8px rgba(0,0,0,0.5)"
          }}>
            <div style={{ opacity: 0.7, fontSize: "12px", marginBottom: "6px" }}>
              {msg.sender}
            </div>
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div style={{
        display: "flex",
        padding: "15px 20px",
        backgroundColor: "#1f1f1f",
        borderTop: "1px solid #333"
      }}>
        <input
          type="text"
          placeholder="Type your command..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          style={{
            flex: 1,
            padding: "14px 20px",
            border: "none",
            borderRadius: "9999px",
            marginRight: "10px",
            outline: "none",
            fontSize: "16px",
            backgroundColor: "#2c2c2c",
            color: "white",
            boxShadow: "0 0 5px #b71c1c"
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            backgroundColor: "#b71c1c",
            color: "white",
            border: "none",
            padding: "14px 20px",
            borderRadius: "9999px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
            transition: "background 0.3s ease"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
