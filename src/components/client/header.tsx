import { MoonIcon } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <header className="w-full flex justify-center shadow-md bg-white">
      <div className="max-w-11/12 w-11/12 py-4 flex justify-between items-center">
        <h2 className="text-2xl text-zinc-900 font-bold tracking-wide">
          Where in the world?
        </h2>
        <div className="theme-container flex items-center gap-2">
          <MoonIcon className="size-5 text-zinc-800" />
          <span className="font-semibold tracking-wide text-zinc-800">
            Dark Mode
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
