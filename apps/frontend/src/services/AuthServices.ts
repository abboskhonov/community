// src/services/AuthServices.ts
import  instance  from "./../services/axiosInstance"; // adjust the path if needed

export type LoginPayload = {
  username: string;
  password: string;
};

export type RegisterPayload = {
  
  username: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  try {
    const res = await instance.post("/login", payload);
    const data = res.data;
    localStorage.setItem("token", data.token);
    return data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Login failed");
  }
}

export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  try {
    const res = await instance.post("/register", payload);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Registration failed");
  }
}


export function logoutUser(): void {
  localStorage.removeItem("token");
  // optionally: redirect or clear state
}
