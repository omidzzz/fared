import { apiClient } from "@/lib/api/client";
import type { AdminUser } from "@/lib/types";

type LoginInput = { email: string; password: string };

type AuthResponse = { success: boolean; data: { user: AdminUser } };

export async function loginAdmin(input: LoginInput): Promise<AdminUser> {
  const res = await apiClient.post<AuthResponse>("/api/auth/login", input);
  return res.data.user;
}

export async function logoutAdmin(): Promise<void> {
  await apiClient.post("/api/auth/logout", {});
}

export async function getCurrentAdmin(): Promise<AdminUser | null> {
  try {
    const res = await apiClient.get<AuthResponse>("/api/auth/me");
    return res.data.user;
  } catch {
    return null;
  }
}
