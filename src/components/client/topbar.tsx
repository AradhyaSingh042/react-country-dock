import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { CountryData, TopbarProps } from "@/types/interface";
import { AxiosResponse } from "axios";

const Topbar: React.FC<TopbarProps> = ({ setFilteredCountries }) => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData<AxiosResponse<CountryData[]>>([
    "countries",
  ]);

  useEffect(() => {
    const filteredData = cachedData?.data?.filter((country) => {
      if (
        (selectedRegion === "all" || !selectedRegion) &&
        country.name.common.toLowerCase().includes(searchInput.toLowerCase())
      ) {
        return true;
      }

      if (
        country.region.toLowerCase() === selectedRegion &&
        country.name.common.toLowerCase().includes(searchInput.toLowerCase())
      ) {
        return true;
      }
    });

    setFilteredCountries(filteredData as CountryData[]);
  }, [searchInput]);

  useEffect(() => {
    const filteredData = cachedData?.data?.filter((country) => {
      if (country.region.toLowerCase() === selectedRegion) return true;
      if (selectedRegion === "all") return true;
    });
    setFilteredCountries(filteredData as CountryData[]);
  }, [selectedRegion]);

  return (
    <div className="topbar-container w-full flex justify-between items-center">
      <div className="search-input-container relative w-1/4 bg-white dark:bg-transparent">
        <SearchIcon className="size-4 absolute top-1/2 -translate-y-1/2 left-4 text-zinc-400 dark:text-zinc-200" />
        <Input
          type="text"
          placeholder="Search for a country..."
          className="pl-10 py-5.5 border border-gray-200 dark:border-none rounded-md shadow-sm dark:bg-[#2D3743] dark:placeholder:text-zinc-200 dark:text-zinc-200 placeholder:tracking-wide"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <Select
        value={selectedRegion}
        onValueChange={(value) => setSelectedRegion(value)}
      >
        <SelectTrigger className="w-[150px] dark:bg-[#2D3743] dark:text-slate-100">
          <SelectValue placeholder="Filter by region" />
        </SelectTrigger>
        <SelectContent className="dark:bg-[#2D3743] dark:text-slate-100">
          <SelectGroup>
            <SelectLabel>Regions</SelectLabel>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="africa">Africa</SelectItem>
            <SelectItem value="americas">Americas</SelectItem>
            <SelectItem value="asia">Asia</SelectItem>
            <SelectItem value="europe">Europe</SelectItem>
            <SelectItem value="oceania">Oceania</SelectItem>
            <SelectItem value="antarctic">Antarctic</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Topbar;
