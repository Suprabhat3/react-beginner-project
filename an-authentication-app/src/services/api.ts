const BASE_URL = `${import.meta.env.VITE_API_BASE_URL ?? "https://api.freeapi.app"}/api/v1/users`;

export interface RegisterPayload {
  email: string;
  password: string;
  role: string;
  username: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  avatar?: string;
  createdAt?: string;
}

export interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
  errors?: Record<string, string>[];
}

class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...options,
  });

  const contentType = res.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const json = isJson ? await res.json() : null;

  if (!res.ok || !json?.success) {
    let errorMsg = json?.message || "Something went wrong";
    if (json?.errors?.length) {
      const fieldErrors = json.errors
        .map((e: Record<string, string>) => Object.values(e).join(", "))
        .join("; ");
      errorMsg = fieldErrors || errorMsg;
    }
    if (!isJson) {
      errorMsg = `Unexpected response (${res.status}). Check API base URL.`;
    }
    throw new ApiError(errorMsg);
  }

  return json;
}

export async function registerUser(payload: RegisterPayload) {
  return request<User>("/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function loginUser(payload: LoginPayload) {
  return request<User>("/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function logoutUser() {
  return request<null>("/logout", { method: "POST" });
}

export async function getCurrentUser() {
  return request<User>("/current-user");
}
