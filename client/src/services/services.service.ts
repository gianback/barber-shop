import { api } from "@/lib/api";

export function fetchGetServices() {
  return api.get(`/services`);
}
