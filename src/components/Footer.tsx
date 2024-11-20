import React from "react";
import { FaGithub, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bottom-0 relative border-t border-indigo-400 dark:border-neutral-700 my-20 items-center">
      <div className="flex justify-evenly text-xl font-bold my-16 ">
        <p className="font-semibold text-neutral-200">&copy; {new Date().getFullYear()} Event. All rights reserved.</p>
        <p>About us</p>
        <p>Contact us</p>
        <p>Privacy</p>
        <p>Terms of Service</p>

        <a
          href="https://github.com/ErickRz21/saltillo-ad"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          id="icon"
        >
          <FaGithub className="text-3xl" />
        </a>
        <a
          href="https://www.instagram.com/ericks_ruiz/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          id="icon"
        >
          <FaInstagram className="text-3xl" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
