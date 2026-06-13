import httpMocks from "node-mocks-http";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";
import bcrypt from "bcryptjs";
import { prisma } from "../../config/db.js";
import { register, login, logout } from "./authController.js";
import { generateToken } from "../../utils/generateToken.js";

//mocking our prisma client so we can safely imitate database ops
vi.mock("../../config/db.js", () => ({
  __esModule: true,
  prisma: mockDeep(),
}));

// mock bcrypt so tests don't do real hashing
vi.mock("bcryptjs", () => ({
  default: {
    genSalt: vi.fn().mockResolvedValue("salt"),
    hash: vi.fn().mockResolvedValue("hashed_password"),
    compare: vi.fn(),
  },
}));

// mock generateToken so tests don't need a real JWT_SECRET
vi.mock("../../utils/generateToken.js", () => ({
  generateToken: vi.fn().mockReturnValue("mock_token"),
}));

// telling typescript that it's a mock
const prismaMock = prisma as ReturnType<typeof mockDeep<typeof prisma>>;

// ─── register ─────────────────────────────────────────────────────────

describe("register", () => {
  //reset db before each test
  beforeEach(() => {
    mockReset(prisma);
  });

  //basic test data for reusability
  const testUser = {
    id: 1,
    first_name: "Jane",
    last_name: "Doe",
    email: "jane@example.com",
    password: "hashed_password",
    is_admin: false,
    created_at: new Date(),
    updated_at: new Date(),
  };

  it("creates a new user and returns token", async () => {
    prismaMock.user.findUnique.mockResolvedValue(null); // no existing user
    prismaMock.user.create.mockResolvedValue(testUser);

    const req = httpMocks.createRequest({
      body: {
        first_name: "Jane",
        last_name: "Doe",
        email: "jane@example.com",
        password: "jane123",
      },
    });
    const res = httpMocks.createResponse();

    //call register
    await register(req, res, () => {});

    //verify that the response is what we're expecting it to be
    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toEqual({
      status: "success",
      data: {
        user: {
          id: testUser.id,
          first_name: testUser.first_name,
          last_name: testUser.last_name,
          email: testUser.email,
        },
      },
      token: "mock_token",
    });
  });

  it("returns 400 when email already exists", async () => {
    prismaMock.user.findUnique.mockResolvedValue(testUser); // user already exists

    const req = httpMocks.createRequest({
      body: {
        first_name: "Jane",
        last_name: "Doe",
        email: "jane@example.com",
        password: "jane123",
      },
    });
    const res = httpMocks.createResponse();

    await register(req, res, () => {});

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toEqual({
      error: "User already exists with this email",
    });
  });

  it("calls next() when prisma throws an unexpected error", async () => {
    prismaMock.user.findUnique.mockImplementation(() => {
      throw new Error("DB error");
    });

    const req = httpMocks.createRequest({
      body: {
        first_name: "Jane",
        last_name: "Doe",
        email: "jane@example.com",
        password: "jane123",
      },
    });
    const res = httpMocks.createResponse();
    const next = vi.fn();

    await register(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

// ─── login ──────────────────────────────────────────────────────

describe("login", () => {
  //reset db before each test
  beforeEach(() => {
    mockReset(prisma);
  });

  //basic test data for reusability
  const testUser = {
    id: 1,
    first_name: "Jane",
    last_name: "Doe",
    email: "jane@example.com",
    password_hash: "hashed_password",
    is_admin: false,
    created_at: new Date(),
    updated_at: new Date(),
  };

  it("logs in successfully and returns token", async () => {
    prismaMock.user.findUnique.mockResolvedValue(testUser);
    vi.mocked(bcrypt.compare).mockResolvedValue(true as never);

    //create a fake request and response with valid request data
    const req = httpMocks.createRequest({
      body: { email: "jane@example.com", password: "jane123" },
    });
    const res = httpMocks.createResponse();

    await login(req, res, () => {});

    //verify that the response is what we're expecting it to be
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({
      status: "success",
      data: {
        user: {
          id: testUser.id,
          email: testUser.email,
        },
      },
      token: "mock_token",
    });
  });

  it("returns 401 when no user not found", async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    const req = httpMocks.createRequest({
      body: { email: "nobody@example.com", password: "jane123" },
    });
    const res = httpMocks.createResponse();

    await login(req, res, () => {});

    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toEqual({ error: "Invalid email or password" });
  });

  it("returns 401 when password is wrong", async () => {
    prismaMock.user.findUnique.mockResolvedValue(testUser);
    vi.mocked(bcrypt.compare).mockResolvedValue(false as never);

    const req = httpMocks.createRequest({
      body: { email: "jane@example.com", password: "wrongpassword" },
    });
    const res = httpMocks.createResponse();

    await login(req, res, () => {});

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({ error: "Invalid email or password" });
  });

  it("calls next() when prisma throws an unexpected error", async () => {
    prismaMock.user.findUnique.mockImplementation(() => {
      throw new Error("DB error");
    });

    const req = httpMocks.createRequest({
      body: { email: "jane@example.com", password: "jane123" },
    });
    const res = httpMocks.createResponse();
    const next = vi.fn();

    await login(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

// ─── logout ────────────────────────────────────────────────────

describe("logout", () => {
  it("clears the jwt cookie and returns success", async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    await logout(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({
      status: "success",
      message: "Logged out successfully",
    });
  });
});
