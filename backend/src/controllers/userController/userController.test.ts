import httpMocks from "node-mocks-http";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";
import { prisma } from "../../config/db.js";
import { getProfile, updateProfile } from "./userController.js"

//mocking our prisma client so we can safely imitate database ops
vi.mock("../../config/db.js", () => ({
  __esModule: true,
  prisma: mockDeep(),
}));

describe("getProfile", () => {
  //basic test data for reusability
  const testUser = {
    id: 1,
    first_name: "Jane",
    last_name: "Doe",
    email: "jane@example.com",
    created_at: new Date(),
  };

  //reset db before each test
  beforeEach(() => {
    mockReset(prisma);
  });

  it("returns the user profile when authenticated", async () => {
    //create a fake request and response with valid request data
    const req = httpMocks.createRequest();
    req.user = testUser;
    const res = httpMocks.createResponse();

    //call getProfile... don't need next as this is the happy path test
    await getProfile(req, res, () => {});

    //verify that the response is what we're expecting it to be
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({
      status: "success",
      data: {
        user: {
          id: testUser.id,
          first_name: testUser.first_name,
          last_name: testUser.last_name,
          email: testUser.email,
          created_at: testUser.created_at.toISOString(),
        },
      },
    });
  });


  it("returns 401 when no user on request", async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    await getProfile(req, res, () => {});

    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toEqual({ error: "Unauthorised" });
  });
});

describe("updateProfile", () => {
  //basic test data for reusability
  const testUser = {
    id: 1,
    first_name: "Jane",
    last_name: "Doe",
    email: "jane@example.com",
    created_at: new Date(),
  };

  const updatedUser = {
    id: 1,
    first_name: "Updated",
    last_name: "Doe",
    email: "jane@example.com",
    created_at: new Date(),
    updated_at: new Date(),
  };

  //reset db before each test
  beforeEach(() => {
    mockReset(prisma);
  });

  it("updates and returns the user profile", async () => {
    prisma.user.update.mockResolvedValue(updatedUser);

    //create a fake request and response with valid request data
    const req = httpMocks.createRequest({ body: { first_name: "Updated" } });
    req.user = testUser;
    const res = httpMocks.createResponse();

    //call updateProfile... don't need next as this is the happy path test
    await updateProfile(req, res, () => {});

    //verify that the response is what we're expecting it to be
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({
      status: "success",
      data: { user: updatedUser },
    });
  });


  it("returns 401 when no user on request", async () => {
    const req = httpMocks.createRequest({ body: { first_name: "Updated" } });
    const res = httpMocks.createResponse();

    await updateProfile(req, res, () => {});

    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toEqual({ error: "Unauthorised" });
  });

  it("calls next() when prisma throws an unexpected error", async () => {
    prisma.user.update.mockImplementation(() => {
      throw new Error("DB error");
    });

    const req = httpMocks.createRequest({ body: { first_name: "Updated" } });
    req.user = testUser;
    const res = httpMocks.createResponse();
    const next = vi.fn();

    await updateProfile(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });

  it("calls next() when email is already taken (P2002)", async () => {
    // Prisma P2002 errors have a code property, Object.assign staples it onto a standard Error
    const duplicateError = Object.assign(new Error("Unique constraint"), {
      code: "P2002",
    });
    prisma.user.update.mockImplementation(() => {
      throw duplicateError;
    });

    const req = httpMocks.createRequest({ body: { email: "taken@example.com" } });
    req.user = testUser;
    const res = httpMocks.createResponse();
    const next = vi.fn();

    await updateProfile(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.objectContaining({ code: "P2002" }));
  });
});