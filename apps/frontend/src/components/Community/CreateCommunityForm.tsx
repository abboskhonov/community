import { createSignal } from "solid-js";
import instance from "../../services/axiosInstance";

export default function CreateCommunityForm() {
  const [name, setName] = createSignal("");
  const [username, setUsername] = createSignal("");

  const [description, setDescription] = createSignal("");
  const [loading, setLoading] = createSignal(false);

  
const handleSubmit = async (e: Event) => {
  e.preventDefault();
  setLoading(true);

  const token = localStorage.getItem("token"); // or your auth storage method
  if (!token) {
    console.error("No token found");
    setLoading(false);
    return;
  }

  try {
    const res = await instance.post(
      "/communities",
      {
        name: name(),
        username: username(),
        description: description(),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Community created:", res.data);
    setName("");
    setUsername("");
    setDescription("");
  } catch (err) {
    console.error("Failed to create community:", err);
  } finally {
    setLoading(false);
  }
};


  return (
    <form
      onSubmit={handleSubmit}
      class="max-w-7xl mx-auto space-y-4 p-6 bg-white shadow rounded-xl border"
    >
      <div>
  <label for="name" class="block mb-1 font-medium text-gray-700">
    Community Name
  </label>
  <input
    id="name"
    value={name()}
    onInput={(e) => setName(e.currentTarget.value)}
    required
    placeholder="Nomads Community"
    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

      <div>
        <label for="username" class="block mb-1 font-medium text-gray-700">
          Community Username
        </label>
        <input
          id="username"
          value={username()}
          onInput={(e) => setUsername(e.currentTarget.value)}
          required
          placeholder="nomads"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label for="description" class="block mb-1 font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description()}
          onInput={(e) => setDescription(e.currentTarget.value)}
          rows={4}
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading()}
        class="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading() ? "Creating..." : "Create Community"}
      </button>
    </form>
  );
}
