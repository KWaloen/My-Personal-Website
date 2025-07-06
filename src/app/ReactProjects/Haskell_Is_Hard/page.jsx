"use client";

import Link from "next/link";
import NavBar from "@/app/FrontPage/NavBar";
import { useState, useRef, useEffect } from "react";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const endOfChatRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { from: "user", text: input }]);
    setInput("");
    try {
      const res = await fetch("https://hih.server.kwal.no/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "user message": input }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { from: "bot", text: data.response }]);
    } catch {
      setMessages((m) => [
        ...m,
        { from: "bot", text: "⚠️ Error communicating with API" },
      ]);
    }
  };

  useEffect(() => {
    endOfChatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex justify-center bg-[rgb(26,54,54)] min-h-screen">
      <div className="flex flex-col h-screen w-full max-w-3xl">
        <NavBar />
        <div>Haskell Is Hard Chatbot</div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[rgb(26,54,54)]">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.from === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-md px-4 py-2 rounded-lg ${
                  msg.from === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={endOfChatRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex items-center p-4 border-t bg-[rgb(26,54,54)]"
        >
          <textarea
            className="flex-1 max-w-2xl resize-none border rounded px-3 py-2 mr-2 focus:outline-none"
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message…"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
