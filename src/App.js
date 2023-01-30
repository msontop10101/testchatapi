import React, { useState } from 'react';
import './App.css'

const App = () => {
  const [input, setInput] = useState('')
  const [chatLog, setChatLog] = useState([
    {
      user: 'me',
      message: 'I want to use chatgpt today'
    },
    {
      user: 'gpt',
      message: 'How can i help you?'
    }
    
  ])
  async function handleSubmit(e) {
    e.preventDefault();
    await setChatLog([...chatLog, { user: 'me', message: `${input}` }])
    await setInput("")
    const response = await fetch('https://school-hacks.onrender.com/api/chat', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: chatLog.map((message) => message.message).
          join("#n")
      })
    });
    const data = await response.json()
    await setChatLog([...chatLog, { user: "gpt", message: `${data.message}` }])
    console.log(data.message)
  }

  return (
    <div style={{ backgroundColor: 'gray', height: '100vh', width: '100vw', position: 'relative' }}>
      <div className='chatbox'>
        <div className='chat-log'>
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}

        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ position: 'absolute', bottom: '0px' }}
        />
      </form>
    </div>
  );
};
const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-message ${message.user === 'gpt' && 'chatgpt'}`}>
      <div className={`avater ${message.user === 'gpt' && 'chatgpt'}`}>
        {message.user === 'gpt' && 'GPT'}
      </div>
      <div className='message'>{message.message}</div>
    </div>
  )
}

export default App;

