/* eslint react/prop-types: 0 */
import { useState } from 'react';

export default function Chat({ data }) {
  const [messages, setMessages] = useState([])

  console.log(messages)

  async function handleSubmit(e) {
    e.preventDefault()
    const text = e.target.elements.text.value
    e.target.elements.text.value = ''
    const message = { id: Number(new Date()), role: "user", text }
    const reply = await sendMessage(text)

    setMessages([...messages, message, reply])
  }

  async function sendMessage(text) {
    const url = "http://localhost:3000/api/messages"
    const headers = { "Content-Type": "application/json" }
    const body = JSON.stringify({
      message: {
        from: {
          id: data.id
        },
        text
      }
    })

    const response = await fetch(url, { method: "POST", body, headers })
    const responseBody = await response.json()

    return { id: Number(new Date()), role: "assistant", text: responseBody.text }
  }

  return (
    <div className="col-md-3 mt-5">
      <div className="card p-2 message-card">
        {messages.map(message =>
          <p 
            key={message.id}
            className={message.role === "assistant" ? "text-primary" : ""}
          >
            {message.text}
          </p>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <input name="text" className="form-control" />
        <button className="btn btn-primary mt-2">Chat</button>
      </form>
    </div>
  )
}
