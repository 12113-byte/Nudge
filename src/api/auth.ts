import { saveToken } from "../utils/token";

const BASE_URL = "http://localhost:5001";

export const login = async (email: string, password: string) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  await saveToken(data.token);

  return data.user;
};

export const signup = async (payload: any) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  await saveToken(data.token);

  return data.user;
};
