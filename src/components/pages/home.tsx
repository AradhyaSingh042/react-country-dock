import CountryCard from "../client/country-card";
import Header from "../client/header";
import Topbar from "../client/topbar";

const Home = () => {
  return (
    <div className="wrapper w-full min-h-screen bg-very-light-gray overflow-x-hidden">
      <Header />
      <main className="max-w-11/12 w-11/12 mx-auto pt-10">
        <Topbar />

        <div className="w-full py-10 countries-grid grid grid-cols-4 gap-8">
          <CountryCard />
          <CountryCard />
          <CountryCard />
          <CountryCard />
        </div>
      </main>
    </div>
  );
};

export default Home;
