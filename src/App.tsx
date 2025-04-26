import { Route, Routes } from "react-router";
import Home from "./components/pages/home";
import Country from "./components/pages/country";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:countryName" element={<Country />} />
      </Routes>
    </>
  );
};

export default App;
