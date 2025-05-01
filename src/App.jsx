import './App.css'
import Chat from './components/Chat/Chat'
import Header from './components/Header/Header'
import InputField from './components/InputField/InputField'

function App() {
  return (
    <>
      <Header/>
      <main>
        <div className="mainWrapper">
          <Chat/>
          <InputField/>
        </div>        
      </main>
    </>
  )
}

export default App
