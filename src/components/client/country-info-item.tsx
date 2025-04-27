import { CountryInfoItemProps } from "@/types/interface";

const CountryInfoItem: React.FC<CountryInfoItemProps> = ({ label, value }) => {
  return (
    <li className="text-zinc-500 font-medium">
      <span className="font-semibold tracking-wide text-zinc-700">
        {label}:
      </span>{" "}
      {value}
    </li>
  );
};

export default CountryInfoItem;
