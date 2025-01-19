import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-8 row-start-3 flex gap-6 flex-wrap items-center justify-center">
      <span className="text text-gray-500">{`© ${new Date().getFullYear()} I'm Busy Keep Read.`}</span>
      <Link href="/about-us">
        <span className="text text-gray-500">About Us</span>
      </Link>
    </footer>
  );
};

export default Footer;
