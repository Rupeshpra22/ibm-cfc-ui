import './App.css'
import Chat from './components/Chat/Chat'
import Header from './components/Header/Header'
import InputField from './components/InputField/InputField'
import { ChatContextProvider } from './Context'

function App() {
  return (
    <ChatContextProvider>
      <Header />
      <main>
        <div className="mainWrapper">
          <Chat />
          <InputField />
        </div>
      </main>
    </ChatContextProvider>
  )
}

export default App
