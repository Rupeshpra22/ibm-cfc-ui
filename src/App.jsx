import './App.css'
import Chat from './components/Chat/Chat'
import DistrictDialog from './components/DistrictDialog/DistrictDialog'
import Header from './components/Header/Header'
import InputField from './components/InputField/InputField'
import { ChatContextProvider } from './Context'

function App() {
  return (
    <ChatContextProvider>
      <Header />
      <main>
        <div className="main-wrapper">
          <Chat />
          <InputField />
          <DistrictDialog/>
        </div>
      </main>
    </ChatContextProvider>
  )
}

export default App
