import { API_BASE_URL } from "./client";

// Fetches all users from GET /api/v1/users.
// fetchUserData
export async function fetchUsers() {
  const response = await fetch(`${API_BASE_URL}/users`);

  if (!response.ok) {
    throw new Error("Failed to fetch user data. Please try again later.");
  }

  const resData = await response.json();

  if (!resData.success) {
    throw new Error(
      resData.message || "An error occurred. Please try again later.",
    );
  }

  return resData.data;
}
