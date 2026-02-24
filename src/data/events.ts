export interface EventType {
  id: string;
  year: string;
  theme: string;
  date: string;
  location: string;
  description: string;
  images: string[];
  videos: string[];
  attendees?: number;
  speakers?: number;
  featured?: boolean;
}

export const events: EventType[] = [
  {
    id: "bizcon-2026",
    year: "2026",
    theme: "Mind Shift",
    date: "2026-08-22",
    location: "Abakaliki, Nigeria",
    description:
      "BIZCON 2026 equips entrepreneurs and business managers with branding, marketing, and growth strategies to scale sustainably. Join 250+ business leaders/ Entrepreneurs 9 Speakers for Nigeria's most impactful one-day conference.",
    images: ["https://i.postimg.cc/nLM1TLtR/Whats-App-Image-20236-02-23-at-10-11-12-AM.jpg", "https://i.postimg.cc/nhNsbVmJ/Whats-App-Image-2026-02-23-at-10-11-10-AM.jpg","https://i.postimg.cc/L88KVjQj/Whats-App-Iq3mage-2026-02-23-at-10-11-18-AM.jpg"],
    videos: ["https://www.youtube.com/embed/zAhFvMko4pE?si=adV2_Y9bwiayMKPd"],
    attendees: 250,
    speakers: 9,
    featured: true,
  },
   {
    id: "alumni_Hangout_2026",
    year: "2026",
    theme: "Alumni Hangout 2026",
    date: "2026-01-17",
    location: "Abakaliki, Nigeria",
    description:
      "BIZCON 2026 Alumni Hangout focused on strategic scaling models and operational excellence. Over 300 founders and managers attended sessions on lean operations, funding strategies, and sustainable growth.",
    images: ["https://i.postimg.cc/pLH70z04/IMG-9437.jpg", "https://i.postimg.cc/HxFcHpRM/IMG-9417.jpg","https://i.postimg.cc/sDsfWQYV/IMG-9522.jpg"],
    videos: ["https://www.youtube.com/embed/3l1YAF5q9z0"],
    attendees: 50,
    speakers: 5,
  },
  {
    id: "bizcon-2025",
    year: "2025",
    theme: "Small Business, Big Vision",
    date: "2025-09-20",
    location: "Abakaliki, Nigeria",
    description:
      "BIZCON 2025 equips entrepreneurs and business managers with branding, marketing, and growth strategies to scale sustainably. Join 500+ business leaders for Nigeria's most impactful one-day conference.",
    images: ["https://i.postimg.cc/MKW3VqvS/343q.jpg", "https://i.postimg.cc/2ypRrJwB/srrree.jpg","https://i.postimg.cc/3Nj67wNX/Whats-App-Imaq34ge-2026-02-23-at-10-11-19-AM.jpg"],
    videos: ["https://www.youtube.com/embed/bs_RUY6yCFc?si=VoPQJpYbqrplIDug"],
    attendees: 500,
    speakers: 8,
    featured: true,
  },
];
