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
    name: "LimbSimple",
    logo: "https://i.postimg.cc/cJx0KVw3/LIMBSIMPLE-LOGO-FULL-COLOR.png",
    website: "https://limbsimplecompany.com/",
    tier: "platinum",
  },
  {
    id: "partner-2",
    name: "Ike-Elechi Ogba Foundation",
    logo: "https://i.postimg.cc/x1YcRpL6/IMG-4871.png",
    tier: "gold",
  },
  {
    id: "partner-3",
    name: "One Youth",
    logo: "https://i.postimg.cc/vHwBY22w/One-Youth-PNG-2.png",
    tier: "gold",
  },
  {
    id: "partner-4",
    name: "Eleemosy Empowerment Relief Foundation",
    logo: "https://i.postimg.cc/gjWWWQzT/Eleemosy-logo.webp",
    tier: "silver",
  },
];
