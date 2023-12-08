export function createSlug(input: string): string {
  const slug = input.trim().replace(/\s+/g, "-");

  const cleanSlug = slug.replace(/[^\w-]/g, "");

  const lowercaseSlug = cleanSlug.toLowerCase();

  return lowercaseSlug;
}
