import httpMocks from "node-mocks-http";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";
import { prisma } from "../../config/db.js";
import { generateToken } from "../../utils/generateToken.js";
import {
  createBusiness,
  getAllBusinesses,
  getBusinessById,
  updateBusiness,
} from "./businessController.js";

//mocking our prisma client so we can safely imitate database ops
vi.mock("../../config/db.js", () => ({
  __esModule: true,
  prisma: mockDeep(),
}));

vi.mock("../../utils/generateToken.js", () => ({
  generateToken: vi.fn(),
}));

describe("businessController", () => {
  //basic test data for reusability
  const testBusiness = {
    company_name: "Bowling 1",
    first_name: "John",
    last_name: "Smith",
    email: "bowling1@gmail.com",
    password: "password",
    address: "100 Collins St, Melbourne",
    phone_number: "123456",
    abn: "51824753556",
    website: "www.bowling1.com",
    about: "So goodnkknknekn",
    image_urls: [],
  };

  const testBusinessReturn = {
    company_name: "Bowling 1",
    first_name: "John",
    last_name: "Smith",
    email: "bowling1@gmail.com",
    password_hash: "password",
    address: "100 Collins St, Melbourne",
    phone_number: "123456",
    abn: "51824753556",
    website: "www.bowling1.com",
    about: "So goodnkknknekn",
    image_urls: [],
  };

  //reset db before each test
  beforeEach(() => {
    mockReset(prisma);
  });

  describe("createBusiness", () => {
    it("Can create a new Business", async () => {
      //mock what prisma.business.create will return in createBusiness()
      prisma.business.create.mockResolvedValue({
        ...testBusiness,
        id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      });

      generateToken.mockReturnValue("this is a token");

      //create a fake request and response with valid request data
      const req = httpMocks.createRequest({ body: testBusiness });
      const res = httpMocks.createResponse();

      //call create business... don't need next as this is the happy path test
      await createBusiness(req, res, () => {});

      //verify that the response is what we're expecting it to be
      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toEqual({
        status: "success",
        data: {
          business: {
            id: 1,
            first_name: "John",
            last_name: "Smith",
            company_name: "Bowling 1",
            email: "bowling1@gmail.com",
          },
        },
        token: "this is a token",
      });
    });

    it("Handles duplicate email error when business is created", async () => {
      //mock that when we check if an email exists it "actually" exists
      prisma.business.findUnique.mockResolvedValue(true);

      const req = httpMocks.createRequest({
        body: { ...testBusiness },
      });
      const res = httpMocks.createResponse();
      const next = vi.fn();

      await createBusiness(req, res, next);

      //expect the error handler to be called once and with the duplicate error message
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(
        new Error("Business already exists with this email"),
      );
    });

    //TODO update this when error handling is fixed in createBusiness
    it("Calls the next() (error handler) when business data is invalid", async () => {
      //mock that calling prisma.business.create will throw a custom error
      prisma.business.create.mockImplementation(() => {
        throw new Error("There was an error");
      });

      //bad input data
      const req = httpMocks.createRequest({
        body: { ...testBusiness, name: 123 },
      });
      const res = httpMocks.createResponse();
      //mock the next function. We are not testing the error handling just that the error handler was called
      const next = vi.fn();

      //call createBusiness with the mocked next()
      await createBusiness(req, res, next);

      //make sure next() was called only once and the custom error was thrown
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(new Error("There was an error"));
    });
  });

  describe("getAllBusinesses", () => {
    it("Can get all Businesses", async () => {
      //mock what prisma.business.findMany will return in getAllBusinesses()
      prisma.business.findMany.mockResolvedValue([
        {
          ...testBusinessReturn,
          id: 1,
          created_at: new Date("2026-06-11T12:00:00Z"),
          updated_at: new Date("2026-06-11T12:00:00Z"),
        },
      ]);

      //create a fake request and response with valid request data
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();

      await getAllBusinesses(req, res, () => {});

      const resJsonData = await res._getJSONData();

      const responseData = resJsonData.data;

      //verify that the response is what we're expecting it to be
      expect(res.statusCode).toBe(200);
      expect(resJsonData).toHaveProperty("status");
      expect(resJsonData).toHaveProperty("data");
      expect(responseData).toHaveProperty("allBusinesses");

      expect(responseData.allBusinesses[0]).toHaveProperty("id");
      expect(responseData.allBusinesses[0]).toHaveProperty("company_name");
      expect(responseData.allBusinesses[0]).toHaveProperty("email");
      expect(responseData.allBusinesses[0]).toHaveProperty("address");
      expect(responseData.allBusinesses[0]).toHaveProperty("phone_number");
      expect(responseData.allBusinesses[0]).toHaveProperty("abn");
      expect(responseData.allBusinesses[0]).toHaveProperty("website");
      expect(responseData.allBusinesses[0]).toHaveProperty("about");
      expect(responseData.allBusinesses[0]).toHaveProperty("image_urls");

      expect(responseData.allBusinesses[0]).not.toHaveProperty("first_name");
      expect(responseData.allBusinesses[0]).not.toHaveProperty("last_name");
      expect(responseData.allBusinesses[0]).not.toHaveProperty("created_at");
      expect(responseData.allBusinesses[0]).not.toHaveProperty("updated_at");
      expect(responseData.allBusinesses[0]).not.toHaveProperty("password_hash");
    });

    it("Calls the next() error handler when no businesses found", async () => {
      prisma.business.findMany.mockResolvedValue(null);

      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const next = vi.fn();

      await getAllBusinesses(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(new Error("No businesses found"));
    });
  });

  describe("getBusinessesById", () => {
    it("Can get Business by id", async () => {
      //mock what prisma.business.findUnique will return in getBusinessById()
      prisma.business.findUnique.mockResolvedValue({
        ...testBusinessReturn,
        id: 1,
        created_at: new Date("2026-06-11T12:00:00Z"),
        updated_at: new Date("2026-06-11T12:00:00Z"),
      });

      //create a fake request and response with valid request data
      const req = httpMocks.createRequest({
        method: "GET",
        url: "/business/1",
        params: { id: 1 },
      });
      const res = httpMocks.createResponse();

      await getBusinessById(req, res, () => {});

      const resJsonData = await res._getJSONData();

      const responseData = resJsonData.data;

      expect(prisma.business.findUnique).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
      });

      //verify that the response is what we're expecting it to be
      expect(res.statusCode).toBe(200);

      expect(responseData).toHaveProperty("id");
      expect(responseData).toHaveProperty("company_name");
      expect(responseData).toHaveProperty("email");
      expect(responseData).toHaveProperty("address");
      expect(responseData).toHaveProperty("phone_number");
      expect(responseData).toHaveProperty("abn");
      expect(responseData).toHaveProperty("website");
      expect(responseData).toHaveProperty("about");
      expect(responseData).toHaveProperty("image_urls");

      expect(responseData).not.toHaveProperty("first_name");
      expect(responseData).not.toHaveProperty("last_name");
      expect(responseData).not.toHaveProperty("created_at");
      expect(responseData).not.toHaveProperty("updated_at");
      expect(responseData).not.toHaveProperty("password_hash");
    });

    it("Calls the next() (error handler) when no business found", async () => {
      prisma.business.findUnique.mockResolvedValue(null);

      const req = httpMocks.createRequest({
        method: "GET",
        params: { id: 999 },
      });
      const res = httpMocks.createResponse();
      const next = vi.fn();

      await getBusinessById(req, res, next);

      expect(prisma.business.findUnique).toHaveBeenCalledWith({
        where: {
          id: 999,
        },
      });

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(
        new Error("No business found with id: 999"),
      );
    });
  });

  describe("updateBusiness", () => {
    it("Can update business", async () => {
      prisma.business.update.mockResolvedValue({
        ...testBusiness,
        company_name: "Bowling 2",
        id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      });

      const updateData = { name: "Bowling 2" };

      const req = httpMocks.createRequest({
        method: "PATCH",
        body: { id: 1, updateData },
      });

      const res = httpMocks.createResponse();

      await updateBusiness(req, res, () => {});

      const resJsonData = await res._getJSONData();

      const responseData = resJsonData.data;
      expect(prisma.business.update).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
        data: updateData,
      });

      expect(res.statusCode).toBe(200);

      expect(responseData.company_name).toEqual("Bowling 2");

      //currently returning
      expect(responseData).toHaveProperty("id");
      expect(responseData).toHaveProperty("company_name");
      expect(responseData).toHaveProperty("email");
      expect(responseData).toHaveProperty("address");
      expect(responseData).toHaveProperty("phone_number");
      expect(responseData).toHaveProperty("abn");
      expect(responseData).toHaveProperty("website");
      expect(responseData).toHaveProperty("about");
      expect(responseData).toHaveProperty("image_urls");

      //currently not returning
      expect(responseData).not.toHaveProperty("first_name");
      expect(responseData).not.toHaveProperty("last_name");
      expect(responseData).not.toHaveProperty("created_at");
      expect(responseData).not.toHaveProperty("updated_at");
      expect(responseData).not.toHaveProperty("password_hash");
    });

    //it calls the next function if no business id
    //it calls the next function if invalid update data
    it("Calls the next() (error handler) when no business found", async () => {
      prisma.business.update.mockRejectedValue(
        new Error("No business found with id: 999"),
      );

      const updateData = { name: "Bowling 2" };

      const req = httpMocks.createRequest({
        method: "PATCH",
        body: { id: 999, updateData },
      });

      const res = httpMocks.createResponse();
      const next = vi.fn();

      await updateBusiness(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(
        new Error("No business found with id: 999"),
      );
    });
  });
});

//TODO
//delete happy, sad
