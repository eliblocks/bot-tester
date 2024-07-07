import { useState } from 'react'
import Chat from './Chat';
import './App.css'

function App() {
  const [chats, setChats] = useState({})

  console.log(chats)

  function addChat() {
    setChats({ ...chats, [Number(new Date())]: [] })
  }

  function addMessages(messages) {
    const ids = Object.keys(chats)
    const convos = {}
    ids.forEach(id =>
      convos[id] = messages.filter(message =>
        message.user.telegram_id === id
      )
    )

    setChats(convos)
  }

  return (
    <div>
      <button className="btn btn-primary mt-2" onClick={addChat}>
        Add Chat
      </button>
      <div className="d-flex">
        {Object.keys(chats).map(conversationId => (
          <Chat
            messages={chats[conversationId]}
            id={conversationId}
            key={conversationId}
            addMessages={addMessages}
          />
        ))}
      </div>
    </div>
  )
}

export default App
