import httpMocks from "node-mocks-http";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";
import { prisma } from "../../config/db.js";
import { createVenue } from "./venueController.js";

//mocking our prisma client so we can safely imitate database ops
vi.mock("../../config/db.js", () => ({
  __esModule: true,
  prisma: mockDeep(),
}));

describe("createVenue", () => {
  //basic test data for reusability
  const testVenue = {
    owner_id: 1,
    name: "Bowling 1",
    email: "bowling1@gmail.com",
    address: "100 Collins St, Melbourne",
    phone_number: "123456",
    website: "www.bowling1.com",
    about: "So goodnkknknekn",
    image_urls: [],
    latitude: -33.8688,
    longitude: 151.2093,
  };

  //reset db before each test
  beforeEach(() => {
    mockReset(prisma);
  });

  it("Can create a new Venue", async () => {
    //mock what prisma.venue.create will return in createVenue()
    prisma.venue.create.mockResolvedValue({
      ...testVenue,
      id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });

    //create a fake request and response with valid request data
    const req = httpMocks.createRequest({ body: testVenue });
    const res = httpMocks.createResponse();

    //call create venue... don't need next as this is the happy path test
    await createVenue(req, res, () => {});

    //verify that the response is what we're expecting it to be
    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toEqual({
      status: "success",
      data: {
        venue: {
          email: "bowling1@gmail.com",
          id: 1,
          name: "Bowling 1",
          owner: 1,
        },
      },
    });
  });

  //TODO update this when error handling is fixed in createVenue
  it("Calls the next() (error handler) when venue data is invalid", async () => {
    //mock that calling prisma.venue.create will throw a custom error
    prisma.venue.create.mockImplementation(() => {
      throw new Error("There was an error");
    });

    //bad input data
    const req = httpMocks.createRequest({
      body: { ...testVenue, owner_id: "Bob" },
    });
    const res = httpMocks.createResponse();
    //mock the next function. We are not testing the error handling just that the error handler was called
    const next = vi.fn();

    //call createVenue with the mocked next()
    await createVenue(req, res, next);

    //make sure next() was called only once and the custom error was thrown
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(new Error("There was an error"));
  });

  it("Handles duplicate email error when venue is created", async () => {
    //mock that when we check if an email exists it "actually" exists
    prisma.venue.findUnique.mockResolvedValue(true);

    const req = httpMocks.createRequest({
      body: { ...testVenue },
    });
    const res = httpMocks.createResponse();
    const next = vi.fn();

    await createVenue(req, res, next);

    //expect the error handler to be called once and with the duplicate error message
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(
      new Error("Venue already exists with this email"),
    );
  });
});
