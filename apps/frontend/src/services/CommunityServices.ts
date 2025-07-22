// src/services/CommunityServices.ts
import instance from "./axiosInstance";
import { useCommunityStore } from "../store/community";

export type Community = {
  id: string;
  name: string;
  username?: string;
  description?: string;
  ownerId?: number;
  owner?: any;
  members?: any[];
  CreatedAt?: string;
  UpdatedAt?: string;
};

export type CommunityResponse = {
  otherCommunities: Community[];
  userCommunities: Community[];
};

export async function fetchCommunities(): Promise<CommunityResponse> {
  try {
    const res = await instance.get("/communities/tab");
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Failed to fetch communities");
  }
}

export async function createCommunity(name: string): Promise<Community> {
  try {
    const res = await instance.post("/communities", { name });
    
    // Add to store immediately to avoid refetch
    const communityStore = useCommunityStore();
    communityStore.addCommunity(res.data);
    
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Failed to create community");
  }
}

export async function deleteCommunity(id: string): Promise<void> {
  try {
    await instance.delete(`/communities/${id}`);
    
    // Remove from store immediately to avoid refetch
    const communityStore = useCommunityStore();
    communityStore.removeCommunity(id);
    
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Failed to delete community");
  }
}

// Utility function to force refresh communities
export function refreshCommunities() {
  const communityStore = useCommunityStore();
  communityStore.invalidateCache();
}