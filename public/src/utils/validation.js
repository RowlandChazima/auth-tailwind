// Allowed Kenyan phone number  regex.
export const phoneRegex = /^\+254(?:7\d{8}|1\d{8})$/;

//  email  regex.
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Trims whitespace from every string value in a plain object

export function trimFormValues(data) {
  const trimmed = { ...data };
  for (const key in trimmed) {
    if (typeof trimmed[key] === "string") {
      trimmed[key] = trimmed[key].trim();
    }
  }
  return trimmed;
}
