import { useQuery } from "@tanstack/react-query";
import CountryCard from "../client/country-card";
import Header from "../client/header";
import Topbar from "../client/topbar";
import axios from "axios";
import { CountryData } from "@/types/interface";
import { useEffect, useState } from "react";

const Home = () => {
  const [filteredCountries, setFilteredCountries] = useState<CountryData[]>([]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["countries"],
    queryFn: () => {
      return axios({
        method: "GET",
        url: "https://restcountries.com/v3.1/all",
        responseType: "json",
      });
    },
    staleTime: 60000,
  });

  useEffect(() => {
    setFilteredCountries(data?.data);
  }, [data]);

  return (
    <div className="wrapper w-full min-h-screen bg-very-light-gray overflow-x-hidden">
      <Header />
      <main className="max-w-11/12 w-11/12 mx-auto pt-10">
        <Topbar setFilteredCountries={setFilteredCountries} />

        <div className="w-full py-10 countries-grid grid grid-cols-4 gap-8">
          {filteredCountries?.map(
            (country: CountryData, countryIndex: number) => (
              <CountryCard key={countryIndex} countryInfo={country} />
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
