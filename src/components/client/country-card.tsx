import { Card, CardContent } from "@/components/ui/card";
import { CountryCardProps, CountryInfoItemProps } from "@/types/interface";
import { useNavigate } from "react-router";
import CountryInfoItem from "./country-info-item";

const CountryCard: React.FC<CountryCardProps> = ({ countryInfo }) => {
  const { name, capital, population, region, flags } = countryInfo;
  const navigate = useNavigate();

  const countryInfoItems:CountryInfoItemProps[] = [
    {
      label: "Population",
      value: population
    },
    {
      label: "Region",
      value: region,
    },
    {
      label: "Capital",
      value: capital ? capital[0] : "",
    },
  ];

  return (
    <>
      <Card
        onClick={() =>
          navigate(`/${name.common.toLowerCase().replaceAll(" ", "-")}`)
        }
      >
        <img src={flags.png} alt={flags.alt} className="w-full h-1/2" />
        <CardContent>
          <h4 className="text-xl font-bold tracking-wide">{name.common}</h4>
          <ul className="pt-4 flex flex-col gap-1">
            {countryInfoItems.map((country, index) => {
              return <CountryInfoItem key={index} {...country} />;
            })}
          </ul>
        </CardContent>
      </Card>
    </>
  );
};

export default CountryCard;
