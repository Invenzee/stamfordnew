export type BookCover = {
  id: number;
  title: string;
  image: string;
  alt: string;
};

export const bookCovers: BookCover[] = [
  {
    id: 0,
    title: "Beneath the Crimson Sky",
    image: "/thriller-1.webp",
    alt: "Beneath the Crimson Sky book cover",
  },
  {
    id: 1,
    title: "Whispers of the Forgotten",
    image: "/thriller-2.webp",
    alt: "Whispers of the Forgotten book cover",
  },
  {
    id: 2,
    title: "The Last Starship",
    image: "/self-1.webp",
    alt: "The Last Starship book cover",
  },
  {
    id: 3,
    title: "Secrets of the Alchemist",
    image: "/self-2.webp",
    alt: "Secrets of the Alchemist book cover",
  },
  {
    id: 4,
    title: "Echoes of Eternity",
    image: "/science-1.webp",
    alt: "Echoes of Eternity book cover",
  },
  {
    id: 5,
    title: "Shadows in the Mist",
    image: "/science-2.webp",
    alt: "Shadows in the Mist book cover",
  },
  {
    id: 6,
    title: "Mysterious Mountain Adventures",
    image: "/romance-1.webp",
    alt: "Mysterious Mountain Adventures book cover",
  },
  {
    id: 7,
    title: "Whispers of Kindness",
    image: "/romance-2.webp",
    alt: "Whispers of Kindness book cover",
  },
];
