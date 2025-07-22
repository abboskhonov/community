// src/store/community.ts
import { createStore } from "solid-js/store";
import { createSignal } from "solid-js";

export type Community = {
  id: string;
  name: string;
};

const [communityStore, setCommunityStore] = createStore({
  communities: [] as Community[],
  selectedCommunity: null as string | null,
  isLoading: false,
  lastFetched: null as Date | null,
  error: null as string | null,
});

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

function useCommunityStore() {
  const communities = () => communityStore.communities;
  const selectedCommunity = () => communityStore.selectedCommunity;
  const isLoading = () => communityStore.isLoading;
  const error = () => communityStore.error;

  const setCommunities = (communities: Community[]) => {
    setCommunityStore({
      communities,
      lastFetched: new Date(),
      error: null,
    });
  };

  const setSelectedCommunity = (community: string | null) => {
    setCommunityStore("selectedCommunity", community);
  };

  const setLoading = (loading: boolean) => {
    setCommunityStore("isLoading", loading);
  };

  const setError = (error: string | null) => {
    setCommunityStore("error", error);
  };

  // Check if data is stale
  const isDataStale = () => {
    if (!communityStore.lastFetched) return true;
    const now = new Date();
    return now.getTime() - communityStore.lastFetched.getTime() > CACHE_DURATION;
  };

  // Check if we should fetch data
  const shouldFetch = () => {
    return communityStore.communities.length === 0 || isDataStale();
  };

  // Force refresh data
  const invalidateCache = () => {
    setCommunityStore("lastFetched", null);
  };

  // Add a new community to the store (for when creating new ones)
  const addCommunity = (community: Community) => {
    setCommunityStore("communities", (prev) => [...prev, community]);
  };

  // Remove a community from the store (for when deleting)
  const removeCommunity = (id: string) => {
    setCommunityStore("communities", (prev) => prev.filter(c => c.id !== id));
  };

  return {
    communities,
    selectedCommunity,
    isLoading,
    error,
    setCommunities,
    setSelectedCommunity,
    setLoading,
    setError,
    shouldFetch,
    invalidateCache,
    addCommunity,
    removeCommunity,
  };
}

export { useCommunityStore };