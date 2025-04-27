import { useQuery } from "@tanstack/react-query";
import CountryCard from "../client/country-card";
import Header from "../client/header";
import Topbar from "../client/topbar";
import axios from "axios";
import { CountryData } from "@/types/interface";

const Home = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["countries"],
    queryFn: () => {
      return axios({
        method: "GET",
        url: "https://restcountries.com/v3.1/all",
        responseType: "json",
      });
    },
  });

  return (
    <div className="wrapper w-full min-h-screen bg-very-light-gray overflow-x-hidden">
      <Header />
      <main className="max-w-11/12 w-11/12 mx-auto pt-10">
        <Topbar />

        <div className="w-full py-10 countries-grid grid grid-cols-4 gap-8">
          {data?.data.map((country: CountryData, countryIndex: number) => (
            <CountryCard key={countryIndex} countryInfo={country} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
