import { prismaMock } from "../../utils/prismaClientSingleton";
import { createVenue } from "./venueController";

describe("createVenue", () => {
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

  const testUser = {
    first_name: "Jacob",
    last_name: "PP",
    email: "man3@gmail.com",
    password: "123",
  };

  test("Can create a new Venue", async () => {
    prismaMock.venue.create.mockResolvedValue({
      ...testVenue,
      id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });

    const venue = createVenue(testVenue);

    console.log("Venue is", venue);
  });
});
