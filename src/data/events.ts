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
    id: "bizcon-2025",
    year: "2025",
    theme: "Empowering Business Growth",
    date: "2025-09-20",
    location: "Abakaliki, Nigeria",
    description:
      "BIZCON 2025 equips entrepreneurs and business managers with branding, marketing, and growth strategies to scale sustainably. Join 500+ business leaders for Nigeria's most impactful one-day conference.",
    images: ["/images/events/2025-1.jpg", "/images/events/2025-2.jpg"],
    videos: [],
    attendees: 500,
    speakers: 12,
    featured: true,
  },
  {
    id: "bizcon-2024",
    year: "2024",
    theme: "Scaling Smart",
    date: "2024-09-18",
    location: "Abakaliki, Nigeria",
    description:
      "BIZCON 2024 focused on strategic scaling models and operational excellence. Over 300 founders and managers attended sessions on lean operations, funding strategies, and sustainable growth.",
    images: ["/images/events/2024-1.jpg", "/images/events/2024-2.jpg"],
    videos: ["https://www.youtube.com/embed/dQw4w9WgXcQ"],
    attendees: 320,
    speakers: 8,
  },
];
