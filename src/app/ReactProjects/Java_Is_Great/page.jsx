"use client";

import NavBar from "@/app/FrontPage/NavBar";
import { useState, useRef, useEffect } from "react";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const endOfChatRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // 1) add user message
    setMessages((m) => [...m, { from: "user", text: input }]);
    setInput("");

    // 2) add empty bot placeholder and remember its index
    let botIndex;
    setMessages((m) => {
      botIndex = m.length;
      return [...m, { from: "bot", text: "" }];
    });

    try {
      const res = await fetch("https://jig.server.kwal.no/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "user message": input }),
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      // 3) read the stream
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          // 4) append chunk to the bot placeholder
          setMessages((m) => {
            const copy = [...m];
            copy[botIndex] = {
              ...copy[botIndex],
              text: copy[botIndex].text + chunk,
            };
            return copy;
          });
        }
      }
    } catch (err) {
      // on error, overwrite or append an error message
      setMessages((m) => {
        const copy = [...m];
        copy[botIndex] = {
          ...copy[botIndex],
          text: "⚠️ Error communicating with API",
        };
        return copy;
      });
    }
  };

  // auto-scroll
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
        <div className="text-white text-xl font-semibold p-4">
          Java Is Great Chatbot
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[rgb(36,64,64)]">
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