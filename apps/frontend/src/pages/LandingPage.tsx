// src/App.tsx
import Navbar from './../components/Navbar'
import Hero from './../components/Hero'
import Footer from './../components/Footer'
import HomePage from './HomePage'
import { isAuthenticated } from '../utils/authHelpers'

export default function App() {
  if (isAuthenticated()) {
    return <HomePage />
  }

  return (
    <div class="flex flex-col min-h-screen">
      <Navbar />
      <main class="flex-grow">
        <Hero />
      </main>
      <Footer />
    </div>
  )
}
