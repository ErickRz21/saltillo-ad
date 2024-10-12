// src/types/EventType.ts
export type EventType = {
  url: string | undefined;
  priceRanges: any[];
  id: string;
  name: string;
  dates: { start: { localDate: string } };
  _embedded?: { venues: {
      locale: { name: string; }[] | undefined; name: string 
}[] };
  images?: { url: string }[];
};
