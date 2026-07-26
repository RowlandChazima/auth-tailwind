import { API_BASE_URL } from "./client";

// Sends the registration  to POST /api/v1/auth/register.
export async function registerUser(data) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to register. Please try again later.");
  }

  const resData = await response.json();

  if (!resData.success) {
    throw new Error(
      resData.message || "An error occurred. Please try again later.",
    );
  }

  return resData;
}

// Sends login credentials to POST /api/v1/auth/login.

// success check happening after parsing the JSON body.
export async function loginUser(data) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resData = await response.json();

  if (!response.ok || !resData.success) {
    throw new Error(
      resData.message || "Failed to login. Please try again later.",
    );
  }

  return resData;
}
