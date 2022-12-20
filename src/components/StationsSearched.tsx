import Station from "./widgets/Station";
import stationsJSON from "../data/stations.json";
import { useStation } from "../context/StationProvider";

interface StationProps {
  id: number;
  name: string;
  closeDays: string;
  openTime: string;
  closeTime: string;
}

export default function StationsSearched() {
  const stations = stationsJSON;
  const {
    pickUpStationName,
    isPickUpOpen,
    deliveryStationName,
    isDeliveryOpen,
  } = useStation();

  const filterStation = (stations: Array<StationProps>) => {
    return (
        stations.filter((station: StationProps) =>
        station.name
          .toLowerCase()
          .includes(
            isPickUpOpen
              ? pickUpStationName.toLocaleLowerCase()
              : deliveryStationName.toLocaleLowerCase()
          )
      )
      .map((station: StationProps) => (
        <Station
          id={station.id}
          name={station.name}
          closeDays={station.closeDays}
          openTime={station.openTime}
          closeTime={station.closeTime}
        />
      )));
  };

  return (
    <div
      className={`${ isDeliveryOpen || isPickUpOpen ? "grid" : "hidden" } m-4 p-4 bg-mycarflix-white rounded-2xl`}
    >
      {stations && filterStation(stations).length ? (
        filterStation(stations)
      ) : (
        <p>Nenhuma localização encontrada.</p>
      )}
    </div>
  );
}
