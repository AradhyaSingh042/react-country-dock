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

  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData<AxiosResponse<CountryData[]>>([
    "countries",
  ]);

  const filteredData = cachedData?.data?.filter((country) =>
    country.name.common.toLowerCase().includes(searchInput.toLowerCase())
  );

  useEffect(() => {
    setFilteredCountries(filteredData || []);
  }, [searchInput]);

  return (
    <div className="topbar-container w-full flex justify-between items-center">
      <div className="search-input-container relative w-1/4 bg-white">
        <SearchIcon className="size-4 absolute top-1/2 -translate-y-1/2 left-4 text-zinc-400" />
        <Input
          type="text"
          placeholder="Search for a country..."
          className="pl-10 py-5.5"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <Select>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Filter by region" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Regions</SelectLabel>
            <SelectItem value="apple">Africa</SelectItem>
            <SelectItem value="banana">America</SelectItem>
            <SelectItem value="blueberry">Asia</SelectItem>
            <SelectItem value="grapes">Europe</SelectItem>
            <SelectItem value="pineapple">Oceania</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Topbar;
