import { For, onMount, Show, createSignal } from "solid-js";
import { useCommunityStore } from "../store/community";
import { fetchCommunities } from "../services/CommunityServices";

export default function CommunityList() {
  const {
    communities,
    setCommunities,
    selectedCommunity,
    setSelectedCommunity,
    isLoading,
    setLoading,
    setError,
    shouldFetch,
  } = useCommunityStore();

  const [userCommunities, setUserCommunities] = createSignal([]);
  const [otherCommunities, setOtherCommunities] = createSignal([]);

  const loadCommunities = async () => {
    // Only fetch if we don't have cached data or if it's stale
    if (!shouldFetch()) {
      console.log("Using cached communities data");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchCommunities();
      console.log("Fetched fresh communities:", data);
      
      // Handle the actual API response structure
      if (data && typeof data === 'object') {
        const allCommunities = [];
        
        // Store user communities separately
        if (data.userCommunities && Array.isArray(data.userCommunities)) {
          setUserCommunities(data.userCommunities);
          allCommunities.push(...data.userCommunities);
        }
        
        // Store other communities separately
        if (data.otherCommunities && Array.isArray(data.otherCommunities)) {
          setOtherCommunities(data.otherCommunities);
          allCommunities.push(...data.otherCommunities);
        }
        
        // Store the full community objects for the main store
        setCommunities(allCommunities);
      }
    } catch (err) {
      console.error("Failed to load communities", err);
      setError(err.message || "Failed to load communities");
    } finally {
      setLoading(false);
    }
  };

  onMount(() => {
    loadCommunities();
  });

  const CommunityItem = (props) => (
    <li
      class={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
        selectedCommunity() === props.community.name
          ? "bg-blue-100 text-blue-700 font-medium"
          : "hover:bg-gray-100 text-gray-800"
      }`}
      onClick={() => setSelectedCommunity(props.community.name)}
    >
      <div class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-white font-semibold text-lg">
        {props.community.name.charAt(0).toUpperCase()}
      </div>
      <span class="truncate">{props.community.name}</span>
    </li>
  );

  return (
    <div class="p-4 w-72 border-r h-full bg-white overflow-y-auto">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold text-gray-900">Communities</h2>
        <button 
          onClick={loadCommunities}
          class="text-sm text-blue-600 hover:text-blue-800 font-medium"
          disabled={isLoading()}
        >
          Refresh
        </button>
      </div>

      <Show when={isLoading()}>
        <div class="flex justify-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </Show>

      <Show when={!isLoading()}>
        <div class="space-y-6">
          {/* Your Communities Section */}
          <Show when={userCommunities().length > 0}>
            <div>
              <div class="flex items-center gap-2 mb-3">
                <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Your Communities
                </h3>
                <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                  {userCommunities().length}
                </span>
              </div>
              <ul class="flex flex-col gap-1">
                <For each={userCommunities()}>
                  {(community) => <CommunityItem community={community} />}
                </For>
              </ul>
            </div>
          </Show>

          {/* Discover Communities Section */}
          <Show when={otherCommunities().length > 0}>
            <div>
              <div class="flex items-center gap-2 mb-3">
                <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Discover Communities
                </h3>
                <span class="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                  {otherCommunities().length}
                </span>
              </div>
              <ul class="flex flex-col gap-1">
                <For each={otherCommunities()}>
                  {(community) => <CommunityItem community={community} />}
                </For>
              </ul>
            </div>
          </Show>

          {/* Empty State */}
          <Show when={userCommunities().length === 0 && otherCommunities().length === 0}>
            <div class="text-center py-8 text-gray-500">
              <div class="text-4xl mb-4">🏘️</div>
              <p class="text-sm">No communities found</p>
              <p class="text-xs text-gray-400 mt-1">Create or join a community to get started</p>
            </div>
          </Show>
        </div>
      </Show>
    </div>
  );
}