export type createVenueRequestBody = {
  owner_id: number;
  name: string;
  email: string;
  address: string;
  phone_number: string;
  website: string;
  about: string;
  image_urls: string[];
  latitude: number;
  longitude: number;
};
