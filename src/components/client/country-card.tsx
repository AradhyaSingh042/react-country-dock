import { Card, CardContent } from "@/components/ui/card";

const CountryCard = () => {
  return (
    <>
      <Card>
        <img
          src="https://www.rjtravelagency.com/wp-content/uploads/2024/06/Germany-Flag.jpg"
          alt="country flag"
          className="w-full"
        />
        <CardContent>
          <h4 className="text-xl font-bold tracking-wide">Germany</h4>
          <ul className="pt-4 flex flex-col gap-1">
            <li className="text-zinc-500 font-medium">
              <span className="font-semibold tracking-wide text-zinc-700">Population:</span>{" "}
              83,019,200
            </li>
            <li className="text-zinc-500 font-medium">
              <span className="font-semibold tracking-wide text-zinc-700">Region:</span> Europe
            </li>
            <li className="text-zinc-500 font-medium">
              <span className="font-semibold tracking-wide text-zinc-700">Capital:</span> Berlin
            </li>
          </ul>
        </CardContent>
      </Card>
    </>
  );
};

export default CountryCard;
