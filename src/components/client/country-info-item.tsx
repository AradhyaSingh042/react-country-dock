import { CountryInfoItemProps } from "@/types/interface";

const CountryInfoItem: React.FC<CountryInfoItemProps> = ({ label, value }) => {
  return (
    <li className="text-zinc-500 dark:text-zinc-300 font-medium">
      <span className="font-semibold tracking-wide text-zinc-700 dark:text-slate-100">
        {label}:
      </span>{" "}
      {value}
    </li>
  );
};

export default CountryInfoItem;
