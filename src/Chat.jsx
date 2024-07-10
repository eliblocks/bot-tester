/* eslint react/prop-types: 0 */
export default function Chat({ id, messages = [], addMessages }) {
  function handleSubmit(e) {
    e.preventDefault()
    const text = e.target.elements.text.value
    e.target.elements.text.value = ''
    sendMessage(text)
  }

  async function sendMessage(text) {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/messages`
    const headers = { "Content-Type": "application/json" }
    const body = JSON.stringify({
      message: {
        from: {
          id
        },
        text
      }
    })

    const response = await fetch(url, { method: "POST", body, headers })
    const responseBody = await response.json()
    addMessages(responseBody.messages)
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
