import { api } from "@/lib/api";

export function getPostBySlug(slug: string) {
  return api.get(`/posts/${slug}`);
}

export function getRelatedPosts(slug: string) {
  return api.get(`/posts/${slug}/related`);
}
