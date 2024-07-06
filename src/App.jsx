import { useState } from 'react'
import Chat from './Chat';
import './App.css'

function App() {
  const [chats, setChats] = useState([])

  function addChat() {
    setChats([...chats, { id: Number(new Date()) }])
  }

  return (
    <div>
      <button className="btn btn-primary mt-2" onClick={addChat}>
        Add Chat
      </button>
      <div className="d-flex">
        {chats.map(chat =>
          <Chat data={chat} key={chat.id} />
        )}

      </div>
    </div>
  )
}

export default App
