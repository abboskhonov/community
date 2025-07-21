import { createSignal } from 'solid-js';
import { registerUser } from './../../services/AuthServices';

export default function Register() {
  const [name, setName] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [error, setError] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await registerUser({
        name: name(),
        email: email(),
        password: password(),
      });

      localStorage.setItem('token', data.token);
      // redirect or show success
      console.log('Registered:', data.user);
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
        placeholder="Name"
        value={name()}
        onInput={(e) => setName(e.currentTarget.value)}
        class="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Email"
        value={email()}
        onInput={(e) => setEmail(e.currentTarget.value)}
        class="w-full p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password()}
        onInput={(e) => setPassword(e.currentTarget.value)}
        class="w-full p-2 border rounded"
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
