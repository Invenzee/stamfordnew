import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/about", destination: "/about-us", permanent: true },
      { source: "/contact", destination: "/contact-us", permanent: true },
      {
        source: "/services/editing",
        destination: "/book-editing",
        permanent: true,
      },
      {
        source: "/services/cover-design",
        destination: "/book-cover-design",
        permanent: true,
      },
      {
        source: "/services/marketing",
        destination: "/book-marketing",
        permanent: true,
      },
      {
        source: "/services/publishing",
        destination: "/book-publishing",
        permanent: true,
      },
      {
        source: "/services/writing",
        destination: "/book-writing",
        permanent: true,
      },
      {
        source: "/services/illustrations",
        destination: "/book-illustrations",
        permanent: true,
      },
      {
        source: "/services/ebook-writing",
        destination: "/ebook-writing",
        permanent: true,
      },
      {
        source: "/services/author-website",
        destination: "/author-website",
        permanent: true,
      },
      {
        source: "/services/audiobook",
        destination: "/audiobook",
        permanent: true,
      },
      {
        source: "/services/childrens-books",
        destination: "/childrens-books",
        permanent: true,
      },
      {
        source: "/book-editing-lp",
        destination: "/editing-proofreading-lp",
        permanent: true,
      },
      {
        source: "/ghostwriting-lp",
        destination: "/ghostwriting-services-lp",
        permanent: true,
      },
      {
        source: "/book-publishing-services-lp",
        destination: "/lp-book-publishing-services",
        permanent: true,
      },
      {
        source: "/childrens-book-lp",
        destination: "/childrens-book-publishing-lp",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
