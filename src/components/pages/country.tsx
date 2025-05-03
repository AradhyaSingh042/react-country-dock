import { ArrowLeftIcon } from "lucide-react";
import Header from "../client/header";
import { Button } from "../ui/button";
import { useNavigate, useParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { CountryData, CountryInfoItemProps } from "@/types/interface";
import CountryInfoItem from "../client/country-info-item";

const Country = () => {
  const { countryName } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["country", countryName],
    queryFn: () => {
      return axios({
        method: "GET",
        url: `https://restcountries.com/v3.1/name/${countryName?.replaceAll(
          "-",
          "%20"
        )}?fullText=true`,
        responseType: "json",
      });
    },
    staleTime: 60000,
  });

  const {
    flags,
    name,
    population,
    region,
    subregion,
    capital,
    currencies,
    tld,
    languages,
    borders,
  } = (data?.data[0] as CountryData) || {};

  const nativeName =
    name?.nativeName[Object.keys(name?.nativeName)[0]]?.official;

  const countryInfoItems: CountryInfoItemProps[] = [
    {
      label: "Native Name",
      value: nativeName,
    },
    {
      label: "Population",
      value: population?.toLocaleString(),
    },
    {
      label: "Region",
      value: region,
    },
    {
      label: "Subregion",
      value: subregion,
    },
    {
      label: "Capital",
      value: capital ? capital[0] : "",
    },
    {
      label: "Top Level Domain",
      value: tld ? tld[0] : "",
    },
    {
      label: "Currencies",
      value: currencies ? currencies[Object.keys(currencies)[0]]?.name : "",
    },
    {
      label: "Languages",
      value: languages ? Object.values(languages).join(", ") : "",
    },
  ];

  const queryClient = useQueryClient();
  const cachedData =
    queryClient.getQueryData<AxiosResponse<CountryData[]>>(["countries"]) ||
    queryClient.fetchQuery({
      queryKey: ["countries"],
      queryFn: () => {
        return axios({
          method: "GET",
          url: `https://restcountries.com/v3.1/all`,
        });
      },
      staleTime: 60000,
    });

  // @ts-ignore
  const borderData = cachedData?.data?.filter((country: CountryData) =>
    borders?.includes(country.cioc)
  );

  return (
    <div className="wrapper w-full min-h-screen bg-very-light-gray dark:bg-[#232D37] overflow-x-hidden">
      <Header />
      <main className="max-w-11/12 w-11/12 mx-auto pt-10">
        <div className="topbar-container w-full">
          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="flex px-6 flex-row items-center gap-2 shadow-md dark:shadow-lg bg-white dark:bg-[#2B3743] dark:border-none dark:text-slate-300 border-gray-200 border text-zinc-800 cursor-pointer hover:bg-zinc-100"
          >
            <ArrowLeftIcon className="size-5 dark:text-slate-200" />
            <span>Back</span>
          </Button>
        </div>

        <div className="country-container pt-10 w-full grid grid-cols-2 gap-20">
          <div className="country-image-container w-full bg-transparent">
            <img
              src={flags?.png}
              alt={flags?.alt}
              className="w-full h-80 object-contain"
            />
          </div>

          <div className="country-info-container flex flex-col justify-between w-full py-8">
            <h3 className="font-bold text-2xl tracking-wide">{name?.common}</h3>
            <div className="grid grid-cols-2 gap-4">
              <ul className="flex w-full flex-col gap-1">
                {countryInfoItems.slice(0, 5).map((country, index) => {
                  return <CountryInfoItem key={index} {...country} />;
                })}
              </ul>
              <ul className="flex w-full flex-col gap-1">
                {countryInfoItems.slice(5).map((country, index) => {
                  return <CountryInfoItem key={index} {...country} />;
                })}
              </ul>
            </div>
            <div className="border-countries-container flex flex-row items-center gap-4">
              <span className="font-semibold text-zinc-800 dark:text-slate-100 tracking-wide">
                Border Countries:{" "}
              </span>
              <div className="flex items-center gap-2">
                {borderData
                  ?.slice(0, 4)
                  .map((border: CountryData, index: number) => {
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        onClick={() =>
                          navigate(
                            `/${border.name.common
                              .toLowerCase()
                              .replaceAll(" ", "-")}`
                          )
                        }
                      >
                        {border.name.common}
                      </Button>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Country;
