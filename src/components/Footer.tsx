import React from "react";
import { FaGithub, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bottom-0 relative border-t-2 border-neutral-300 dark:border-neutral-700 my-20 items-center">
      <div className="flex justify-evenly text-xl font-bold my-16 ">
        <p className="text-neutral-500 dark:text-neutral-200">
          &copy; {new Date().getFullYear()} Event. All rights reserved.
        </p>
        <a href="">About us</a>
        <a href="">Contact us</a>
        <a href="">Privacy</a>
        <a href="">Terms of Service</a>
        <div className="flex gap-3">
          <a
            href="https://github.com/ErickRz21/saltillo-ad"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            id="icon"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.instagram.com/ericks_ruiz/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            id="icon"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
