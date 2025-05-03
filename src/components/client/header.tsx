import { MoonIcon, SunIcon } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  return (
    <header className="w-full flex justify-center shadow-md bg-white dark:bg-[#2D3743]">
      <div className="max-w-11/12 w-11/12 py-4 flex justify-between items-center">
        <h2 className="text-2xl text-zinc-900 dark:text-slate-100 font-bold tracking-wide">
          Where in the world?
        </h2>
        <button className="theme-container cursor-pointer flex items-center gap-2" onClick={()=> {
          setTheme(theme === "dark" ? "light" : "dark");
          document.documentElement.classList.toggle("dark");
        }}>
           {theme === "dark" ? <SunIcon className="size-5 text-zinc-800 dark:text-slate-100"/> : <MoonIcon className="size-5 text-zinc-800 dark:text-slate-100" />}
          <span className="font-semibold tracking-wide text-zinc-800 dark:text-slate-100">
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
