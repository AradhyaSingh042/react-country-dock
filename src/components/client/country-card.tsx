import { Card, CardContent } from "@/components/ui/card";
import { CountryCardProps } from "@/types/interface";
import { useNavigate } from "react-router";

const CountryCard: React.FC<CountryCardProps> = ({ countryInfo }) => {
  const { name, capital, population, region, flags } = countryInfo;
  const navigate = useNavigate();

  return (
    <>
      <Card onClick={() => navigate(`/${name.common.toLowerCase().replaceAll(" ", "-")}`)}>
        <img src={flags.png} alt={flags.alt} className="w-full h-1/2" />
        <CardContent>
          <h4 className="text-xl font-bold tracking-wide">{name.common}</h4>
          <ul className="pt-4 flex flex-col gap-1">
            <li className="text-zinc-500 font-medium">
              <span className="font-semibold tracking-wide text-zinc-700">
                Population:
              </span>{" "}
              {population}
            </li>
            <li className="text-zinc-500 font-medium">
              <span className="font-semibold tracking-wide text-zinc-700">
                Region:
              </span>{" "}
              {region}
            </li>
            <li className="text-zinc-500 font-medium">
              <span className="font-semibold tracking-wide text-zinc-700">
                Capital:
              </span>{" "}
              {capital && capital[0]}
            </li>
          </ul>
        </CardContent>
      </Card>
    </>
  );
};

export default CountryCard;
