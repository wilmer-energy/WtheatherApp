import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import EntregableSemana2 from './components/WeekTwo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
  <EntregableSemana2/>
    </div>
  )
}

export default App
