import { createSignal } from 'solid-js'
import Register from './components/Auth/RegisterForm'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_URL

function App() {

  const [count, setCount] = createSignal(0)

  return (
    <>
      <Register />
    </>
  )
}

export default App
