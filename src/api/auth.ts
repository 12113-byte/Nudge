
const BASE_URL = "http://localhost:5001"; // TODO: replace with env var, needs to be https!

export type SignUpPayload = {
  // ? are optional fields
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  company_name?: string;
  business_email?: string;
  business_phone?: string;
  abn?: string;
}

// userType detects if business or customer login
export const login = async (email: string, password: string, userType: string) => {
  // picks endpoint based on userType
  const endpoint = userType === "business"
    ? `${BASE_URL}/auth/login/business` // confirm with backend for correct endpoints
    : `${BASE_URL}/auth/login`;

  // sends email and password as JSON
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json(); // potential bug: if server returns non-JSON error response
  if (!res.ok) throw new Error(data.message || "Login failed");

  // TODO: handle token expiry, when backend is ready
  // if res.status === 401, call logout() and redirect to login

  // token goes to context to save, user to context state
  return { token: data.token, user: data.user }; // TODO: confirm field names with backend
};

export const signup = async (payload: SignUpPayload, userType: string) => {
  const endpoint = userType === "business"
    ? `${BASE_URL}/business/register`
    : `${BASE_URL}/auth/register`; // TODO: confirm customer endpoint

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Sign up failed");

  return { token: data.token, user: data.user };
};
