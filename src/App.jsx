import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ApiRequest from './components/ApiRequest'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     < ApiRequest/>
    </>
  )
}

export default App
