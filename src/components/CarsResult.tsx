import { useSearch } from "../context/SearchProvider";
import CarsFoundJson from "../data/cars.json";
import { carsSorted } from "../lib/Car/car";
import {
  isPickUpDateGreaterThenDeliveryDate,
  isRentDaysValid,
  isStationValid,
} from "../lib/search/verifications";
import Car, { CarProps } from "./widgets/Car";
import stationsJSON from "../data/stations.json";
// import { useStation } from "../context/StationProvider";
// import { useEffect } from "react";

export default function CarsResult() {
  const {
    deliverySchedule,
    pickUpSchedule,
    rentDays,
    isErrorFound,
    isAscending,
    pickUpStationSearched,
    deliveryStationSearched,
  } = useSearch();

//   const { pickUpStation } = useStation();

  const cars = carsSorted([...CarsFoundJson], isAscending);
  const stations = stationsJSON;

  //     useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch(
  //           `https://test-front-rentalcar.vercel.app/api/cars/${pickUpStation.id}/${pickUpSchedule}/${deliverySchedule}`,
  //           {
  //             mode:"cors",
  //             method: "GET",
  //             headers: {
  //               "Access-Control-Allow-Origin": "*",
  //               "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  //               "Access-Control-Allow-Headers": "Content-Type",
  //               Authorization: "Basic bXl1c2VybmFtZTpwYXNzd29yZDEyMw==",
  //             },
  //           }
  //         );

  //         const json = await response.json();
  //         console.log(json);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };

  //     fetchData();
  //   }, [pickUpStation, pickUpSchedule, deliverySchedule]);

  if (
    (!isStationValid(pickUpStationSearched, stations) ||
      !isStationValid(deliveryStationSearched, stations)) &&
    (pickUpStationSearched || deliveryStationSearched)
  ) {
    return (
      <div className="mx-6  grid">
        <p className="justify-self-center bg-mycarflix-white p-4 rounded-2xl">
          O local está incorreto.
        </p>
      </div>
    );
  }

  if (
    isPickUpDateGreaterThenDeliveryDate(pickUpSchedule, deliverySchedule) ||
    !isRentDaysValid(rentDays)
  ) {
    return (
      <div className="mx-6  grid">
        <p className="justify-self-center bg-mycarflix-white p-4 rounded-2xl">
          O Dia de Levantamento não pode ser superior ao dia de Entrega.
        </p>
      </div>
    );
  }

  return (
    <div className={`car-results ${isErrorFound ? "hidden" : "grid"} gap-4 mx-6`}>
      {cars.map((car: CarProps) => (
        <Car
          id={car.id}
          name={car.name}
          make={car.make}
          kmsIncluded={car.kmsIncluded}
          doors={car.doors}
          priceDay={car.priceDay}
          image={car.image}
        />
      ))}
    </div>
  );
}
