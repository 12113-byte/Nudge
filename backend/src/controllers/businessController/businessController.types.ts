import { Business } from "../../generated/prisma/client.js";

export type SafeBusinessReturnData = Omit<
  Business,
  "first_name" | "last_name" | "password_hash" | "created_at" | "updated_at"
>;

export type AuthenticatedBusinessReturnData = Omit<Business, "password_hash">;
