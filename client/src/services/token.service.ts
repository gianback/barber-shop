import { api } from "@/lib/api";

export async function verifyTokenService() {
  return await api.get("/auth/verify-token");
}
