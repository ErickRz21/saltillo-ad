import React from "react";
import { FaGithub, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bottom-0 relative border-t-2 border-neutral-300 dark:border-neutral-700 my-14 lg:my-20 pb-10 lg:pb-0 items-center">
      <div className="flex flex-col lg:items-center lg:flex-row justify-evenly text-base lg:text-xl font-bold my-6 lg:my-16 mx-auto space-x-0 space-y-3 lg:space-y-0">
        <p className="text-neutral-500">
          &copy; Event. {new Date().getFullYear()} All rights reserved.
        </p>
        <a href="">About</a>
        <a href="">Contact</a>
        <a href="">Privacy</a>
        <a href="">Terms</a>
        <div className="flex justify-center space-x-3">
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
