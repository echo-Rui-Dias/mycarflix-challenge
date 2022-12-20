import "./styles/App.css";
import { SWRConfig } from "swr";
import { SearchProvider } from "./context/SearchProvider";
import { StationProvider } from "./context/StationProvider";
import CarsResult from "./components/CarsResult";
import StationsSearched from "./components/StationsSearched";
import Header from "./components/Header/Index";

function App() {
  const fetcher = (url: string) =>
    fetch(url, {
      headers: {
        Authorization: `${process.env.REACT_APP_AUTHORIZATION_HEADER}`,
      },
    }).then((res) => {
      return res.json();
    });

  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
      }}
    >
      <StationProvider>
        <SearchProvider>
          <Header />
          <StationsSearched />
          <CarsResult />
        </SearchProvider>
      </StationProvider>
    </SWRConfig>
  );
}

export default App;
