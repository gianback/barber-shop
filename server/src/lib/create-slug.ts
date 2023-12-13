export function createSlug(input: string): string {
  const slug = input.trim().replace(/\s+/g, "-");

  const cleanString = slug.replace(/[^\w\sáéíóúü]/g, "-");
  const normalizedSlug = cleanString
    .replace(/[áàãâä]/g, "a")
    .replace(/[éèêë]/g, "e")
    .replace(/[íìîï]/g, "i")
    .replace(/[óòõôö]/g, "o")
    .replace(/[úùûü]/g, "u")
    .replace(/[ñ]/g, "n")
    .replace(/[ç]/g, "c");

  const lowercaseSlug = normalizedSlug.toLowerCase();

  return lowercaseSlug;
}
