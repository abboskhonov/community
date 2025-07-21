import { createSignal } from 'solid-js';
import { registerUser } from './../../services/AuthServices';
  import { login } from "../../utils/authHelpers";
  import { useNavigate } from "@solidjs/router";

export default function Register() {
  const [username, setUsername] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [confirmPassword, setConfirmPassword] = createSignal('');
  const [error, setError] = createSignal('');

  const [loading, setLoading] = createSignal(false);
const navigate = useNavigate();

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  setError('');

  if (password() !== confirmPassword()) {
    setError('Passwords do not match');
    return;
  }

  setLoading(true);

  try {
    const data = await registerUser({
      username: username(),
      password: password(),
    });

    login(data.user, data.token);         // ✅ store token & user
    navigate("/", { replace: true });     // ✅ redirect to homepage
  } catch (err: any) {
    setError(err.message || 'Register failed');
  } finally {
    setLoading(false);
  }
};


  return (
    <form onSubmit={handleSubmit} class="space-y-4 max-w-md mx-auto mt-8">
      <input
        type="text"
        placeholder="Username"
        value={username()}
        onInput={(e) => setUsername(e.currentTarget.value)}
        class="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password()}
        onInput={(e) => setPassword(e.currentTarget.value)}
        class="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword()}
        onInput={(e) => setConfirmPassword(e.currentTarget.value)}
        class="w-full p-2 border rounded"
        required
      />

      {error() && <p class="text-red-600">{error()}</p>}

      <button
        type="submit"
        disabled={loading()}
        class="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading() ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}
