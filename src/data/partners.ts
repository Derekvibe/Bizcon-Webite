export interface PartnerType {
  id: string;
  name: string;
  logo: string;
  website?: string;
  tier?: "platinum" | "gold" | "silver";
}

export const partners: PartnerType[] = [
  {
    id: "partner-1",
    name: "Strategy Factory",
    logo: "/images/partners/strategy-factory.png",
    website: "https://example.com",
    tier: "platinum",
  },
  {
    id: "partner-2",
    name: "Growth Hub",
    logo: "/images/partners/growth-hub.png",
    tier: "gold",
  },
  {
    id: "partner-3",
    name: "Venture Capital NG",
    logo: "/images/partners/vcng.png",
    website: "https://example.com",
    tier: "gold",
  },
  {
    id: "partner-4",
    name: "SME Finance",
    logo: "/images/partners/sme-finance.png",
    tier: "silver",
  },
  {
    id: "partner-5",
    name: "Ebonyi Chamber",
    logo: "/images/partners/ebonyi-chamber.png",
    website: "https://example.com",
    tier: "silver",
  },
];
