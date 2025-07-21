// src/components/Auth/LoginForm.tsx
import { createSignal } from "solid-js";
import { loginUser } from "../../services/AuthServices";
import { login } from "../../utils/authHelpers";
import { useNavigate } from "@solidjs/router";

export default function LoginForm() {
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal<string | null>(null);
  const [loading, setLoading] = createSignal(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await loginUser({ username: username(), password: password() });
      login(res.user, res.token);
      navigate("/"); // redirect to home or dashboard
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow">
      <h2 class="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} class="space-y-4">
        <div>
          <label class="block text-sm font-medium">Username</label>
          <input
            type="text"
            class="w-full border px-3 py-2 rounded"
            value={username()}
            onInput={(e) => setUsername(e.currentTarget.value)}
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium">Password</label>
          <input
            type="password"
            class="w-full border px-3 py-2 rounded"
            value={password()}
            onInput={(e) => setPassword(e.currentTarget.value)}
            required
          />
        </div>

        {error() && <p class="text-red-600 text-sm">{error()}</p>}

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={loading()}
        >
          {loading() ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
