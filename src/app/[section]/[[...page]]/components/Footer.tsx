import React from "react";

const Footer = () => {
  return (
    <footer className="mt-8 row-start-3 flex gap-6 flex-wrap items-center justify-center">
      <span className="text-sm text-gray-500">{`© ${new Date().getFullYear()} DGXP News. Supported by Guardian.`}</span>
    </footer>
  );
};

export default Footer;
