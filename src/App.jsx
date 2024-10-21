import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Signature/Header'
import Footer from './components/Signature/Footer'

function App() {

  return (
    <>
      <div className='board'>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  )
}

export default App
