export interface SpeakerType {
  id: string;
  name: string;
  title: string;
  image: string;
  bio: string;
  isHost?: boolean;
  social: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

export const speakers: SpeakerType[] = [
  {
    id: "host-1",
    name: "John Doe",
    title: "Founder & Host, BIZCON",
    image: "/images/speakers/host.jpg",
    bio: "John Doe is a business strategist and growth consultant with over 10 years of experience helping SMEs scale profitably across West Africa. He founded BIZCON to bridge the knowledge gap between ambition and execution for Nigerian entrepreneurs.",
    isHost: true,
    social: {
      linkedin: "https://linkedin.com/in/example",
      twitter: "https://twitter.com/example",
      instagram: "https://instagram.com/example",
    },
  },
  {
    id: "speaker-2",
    name: "Amara Osei",
    title: "Chief Marketing Officer, Growthworks Africa",
    image: "/images/speakers/speaker2.jpg",
    bio: "Amara is a brand architect who has built marketing systems for over 50 SMEs across Africa. Her frameworks have generated ₦2B+ in revenue for her clients.",
    social: {
      linkedin: "https://linkedin.com/in/example",
      twitter: "https://twitter.com/example",
    },
  },
  {
    id: "speaker-3",
    name: "Emeka Nwosu",
    title: "CEO, ScaleUp Nigeria",
    image: "/images/speakers/speaker3.jpg",
    bio: "Emeka is a serial entrepreneur and investor who has founded 3 successful companies. He speaks on operations, systems thinking, and scaling without chaos.",
    social: {
      linkedin: "https://linkedin.com/in/example",
      instagram: "https://instagram.com/example",
    },
  },
];
