// src/components/Navbar.tsx
export default function Navbar() {
  return (
    <nav class="bg-white shadow px-4 py-3 flex justify-between items-center">
      <div class="text-xl font-bold text-blue-600">YourPlatform</div>

      <div class="space-x-4">
        <a href="#features" class="text-gray-700 hover:text-blue-600">Features</a>
        <a href="#pricing" class="text-gray-700 hover:text-blue-600">Pricing</a>
        <a href="#contact" class="text-gray-700 hover:text-blue-600">Contact</a>
      </div>

      <div class="space-x-4">
        <a href="/login" class="text-gray-700 hover:text-blue-600">Login</a>
        <a href="/register" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Register
        </a>
      </div>
    </nav>
  );
}
