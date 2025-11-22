// frontend/src/api/client.ts
export const API_URL = "http://localhost:4000";

export async function api(path: string, options: RequestInit = {}) {
  const res = await fetch(API_URL + path, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // if you later use cookies/auth
    ...options,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API error ${res.status}: ${text}`);
  }

  // if there's no body, return null
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) return null;
  return res.json();
}
