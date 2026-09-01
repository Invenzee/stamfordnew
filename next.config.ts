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
        destination: "/Editing/lp",
        permanent: true,
      },
      {
        source: "/editing-proofreading-lp",
        destination: "/Editing/lp",
        permanent: true,
      },
      {
        source: "/ghostwriting-lp",
        destination: "/Ghostwriting/lp",
        permanent: true,
      },
      {
        source: "/ghostwriting-services-lp",
        destination: "/Ghostwriting/lp",
        permanent: true,
      },
      {
        source: "/book-publishing-services-lp",
        destination: "/Publishing/lp",
        permanent: true,
      },
      {
        source: "/lp-book-publishing-services",
        destination: "/Publishing/lp",
        permanent: true,
      },
      {
        source: "/childrens-book-lp",
        destination: "/Kids/lp",
        permanent: true,
      },
      {
        source: "/childrens-book-publishing-lp",
        destination: "/Kids/lp",
        permanent: true,
      },
      {
        source: "/book-marketing-lp",
        destination: "/Marketing/lp",
        permanent: true,
      },
      {
        source: "/christian-book-publishing",
        destination: "/Christian/lp",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
