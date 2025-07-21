// src/services/communityService.ts

import instance from "../services/axiosInstance";

interface CommunityData {
  name: string;
  description: string;
}

export async function createCommunity(data: CommunityData) {
  const res = await instance.post("/communities", data);
  return res.data;
}

export async function getCommunity(id: string) {
  const res = await instance.get(`/communities/${id}`);
  return res.data;
}

export async function listUserCommunities() {
  const res = await instance.get("/communities/user");
  return res.data;
}

export async function deleteCommunity(id: string) {
  const res = await instance.delete(`/communities/${id}`);
  return res.data;
}
