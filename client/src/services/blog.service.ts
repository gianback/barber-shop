import { api } from "@/lib/api";

export function fetchPostBySlug(slug: string) {
  return api.get(`/posts/${slug}`);
}

export function fetchRelatedPosts(slug: string) {
  return api.get(`/posts/${slug}/related`);
}
