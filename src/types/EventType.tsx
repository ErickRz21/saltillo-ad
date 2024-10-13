type PriceRange = {
  type: string;
  min: number;
  max: number;
  currency: string;
};

export type EventType = {
  url: string | undefined;
  priceRanges: PriceRange[]; // Use the specific type
  id: string;
  name: string;
  dates: { start: { localDate: string; localTime?: string } };
  _embedded?: {
    venues: {
      locale?: { name: string }[];
      name: string;
    }[];
  };
  images?: { url: string }[];
};
