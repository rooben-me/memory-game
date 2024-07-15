import React from "react";
import Image from "next/image";
import Link from "next/link";
import LinkedInIcon from "./Icons/LinkedInIcon";
import GitHubIcon from "./Icons/GitHubIcon";

const Brand = () => {
  return (
    <div className="flex items-center justify-center gap-4 flex-col md:flex-row">
      <Link
        href="https://rooben.site/"
        target="_blank"
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-900/10 border border-orange-800/30 text-orange-600 grayscale hover:grayscale-0 ease-in-out transition-all"
      >
        <div className="-ml-2">
          <Image
            src="/rooben-photo.webp"
            width={24}
            height={24}
            alt="Rooben logo"
          />
        </div>
        My Portfolio
      </Link>
      <Link
        href="https://www.linkedin.com/posts/rooben-me_ui-ux-userexperience-activity-7218310729014075392-0ywm"
        target="_blank"
        className="group px-4 py-2 rounded-lg bg-blue-900/10 border border-blue-800/30 flex items-center gap-2 grayscale hover:grayscale-0 ease-in-out transition-all"
      >
        <div className="-ml-2 text-white/20 opacity-50 group-hover:text-blue-500/80 transition-all ease-in-out group-hover:opacity-100">
          <LinkedInIcon size={24} />
        </div>
        <span className="text-blue-600">My Linkedin</span>
      </Link>

      <Link
        href="https://www.linkedin.com/posts/rooben-me_ui-ux-userexperience-activity-7218310729014075392-0ywm"
        target="_blank"
        className="group px-4 py-2 rounded-lg bg-fuchsia-900/10 border border-fuchsia-800/30 flex items-center gap-2 grayscale hover:grayscale-0 ease-in-out transition-all"
      >
        <div className="-ml-2 text-white/20 opacity-50 group-hover:text-fuchsia-500/80 transition-all ease-in-out group-hover:opacity-100">
          <GitHubIcon size={24} />
        </div>
        <span className="text-fuchsia-600">Source code</span>
      </Link>
    </div>
  );
};

export default Brand;
