import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import ShareScreen from './Pages/ShareScreen.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
       <Routes>
              <Route exact path='/' element={ <Home /> } />
              <Route path='/share' element = { <ShareScreen /> } />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
