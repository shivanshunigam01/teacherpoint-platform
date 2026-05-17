export type UserLocation = {
  country: string;
  countryCode: string;
  city: string;
  state?: string;
  formatted?: string;
};

export type GeoapifyReverseResponse = {
  type?: string;
  features?: Array<{
    type?: string;
    properties?: {
      country?: string;
      country_code?: string;
      city?: string;
      state?: string;
      formatted?: string;
    };
  }>;
};

export type LocationDetectResult = {
  location: UserLocation | null;
  geoapify: GeoapifyReverseResponse | null;
};
