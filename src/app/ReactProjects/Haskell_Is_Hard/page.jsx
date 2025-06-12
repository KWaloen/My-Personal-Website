"use client";

import Link from "next/link";
import NavBar from "@/app/FrontPage/NavBar";
import { useState } from "react";

export default function Haskell_Is_Hard() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    try {
      const response = await fetch("http://hih.server.kwal.no/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "user message": message }),
      });
      const data = await response.json();
      setResponse(data.response);
    } catch (error) {
      alert("Error communicating with API");
    }
  };

  return (
    <div className="page">
      <NavBar />

      This is a work in progress! 👷<br/>
      In the meanwhile take a look at the backend available on my <Link className="link" target="_blank" href="https://github.com/KWaloen/Haskell_Is_Hard.AI">GitHub</Link>.<br/><br/>
      I am working on beautifying the frontend and converting the backend to accept an HTTPS request instead of an HTTP request! 🚧
      <br/><br/>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <p>Chatbot response: {response}</p>
    </div>
  );
}
