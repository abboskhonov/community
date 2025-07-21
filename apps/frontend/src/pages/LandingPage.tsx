// src/App.tsx
import Navbar from "../components/LandingPage/Navbar";
import Hero from "../components/LandingPage/Hero";
import Footer from "../components/LandingPage/Footer";
import HomePage from "./HomePage";
import { isAuthenticated } from "../utils/authHelpers";

export default function App() {
  if (isAuthenticated()) {
    return <HomePage />;
  }

  return (
    <div class="flex flex-col min-h-screen">
      <Navbar />
      <main class="flex-grow">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}
