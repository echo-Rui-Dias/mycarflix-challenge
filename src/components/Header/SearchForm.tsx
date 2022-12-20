import { useState, FormEvent,} from "react";
// import useSWR from "swr";
import { useSearch } from "../../context/SearchProvider";
import { useStation } from "../../context/StationProvider";
import Location from "../../icons/Location";
import SearchIcon from "../../icons/SearchIcon";
import { getRentDays, parseDateToIso } from "../../lib/search/search";
import {
  isPickUpDateGreaterThenDeliveryDate,
  isRentDaysValid,
  isStationValid,
} from "../../lib/search/verifications";
import stationsJSON from "../../data/stations.json";

export default function SearchForm() {
  const {
    deliverySchedule,
    pickUpSchedule,
    setDeliverySchedule,
    setPickUpSchedule,
    isLocationEqual,
    setIsLocationEqual,
    setRentDays,
    rentDays,
    setIsErrorFound,
    setPickUpStationSearched,
    setDeliveryStationSearched,
  } = useSearch();

  const {
    pickUpStationName,
    deliveryStationName,
    setPickUpStationName,
    setDeliveryStationName,
    isPickUpOpen,
    setIsPickUpOpen,
    isDeliveryOpen,
    setIsDeliveryOpen,
  } = useStation();

  const [pickUpScheduleInput, setPickUpScheduleInput] = useState<string>("");
  const [deliveryScheduleInput, setDeliveryScheduleInput] = useState<string>("");
  const stations = stationsJSON;

  // const {data,error} = useSWR("https://test-front-rentalcar.vercel.app/api/stations");
  // console.log(data)

  const outOfFocus = () => {
    setTimeout(() => {
      isPickUpOpen ? setIsPickUpOpen(false) : setIsDeliveryOpen(false);
    }, 100);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLocationEqual(event.target.checked);

    if (event.target.checked) {
      setDeliveryStationName(pickUpStationName);
    } else {
      setDeliveryStationName("");
    }
  };

  const handlePickUpStationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPickUpStationName(event.target.value);
    setIsPickUpOpen(true);
    if (isDeliveryOpen) {
      setIsDeliveryOpen(false);
    }
    if (isLocationEqual) {
      setDeliveryStationName(event.target.value);
    }
  };

  const handleDeliveryStationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryStationName(event.target.value);
    setIsDeliveryOpen(true);

    if (isPickUpOpen) {
      setIsPickUpOpen(false);
    }
  };

  const handlePickUpSchedule = (event: React.ChangeEvent<HTMLInputElement>) => {
    let date = new Date(event.target.value);
    date.setDate(date.getDate() + 1);
    setPickUpScheduleInput(event.target.value);

    if (!deliveryScheduleInput.length) {
      setDeliveryScheduleInput(date.toISOString().slice(0, -8));
    }
  };

  const handleDeliverySchedule = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryScheduleInput(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const pickup = form.elements.namedItem("pickup-station") as HTMLInputElement;
    const delivery = form.elements.namedItem("delivery-station") as HTMLInputElement;
    const pickUpScheduleForm = form.elements.namedItem("pickup-schedule") as HTMLInputElement;
    const deliveryScheduleForm = form.elements.namedItem("delivery-schedule") as HTMLInputElement;

    if (
      isPickUpDateGreaterThenDeliveryDate(pickUpSchedule, deliverySchedule) ||
      isRentDaysValid(rentDays)
    ) {
      setIsErrorFound(true);
    }

    if (
      !isStationValid(pickup.value, stations) ||
      !isStationValid(delivery.value, stations)
    ) {
      setIsErrorFound(true);
    }

    setPickUpStationSearched(pickup.value);
    setDeliveryStationSearched(delivery.value);
    setDeliverySchedule(parseDateToIso(deliveryScheduleForm.value));
    setPickUpSchedule(parseDateToIso(pickUpScheduleForm.value));
    setRentDays(
      getRentDays(
        parseDateToIso(pickUpScheduleForm.value),
        parseDateToIso(deliveryScheduleForm.value)
      )
    );

    setIsErrorFound(false);
  };

  return (
    <form
      className="p-4 bg-mycarflix-white rounded-2xl grid gap-4 lg:grid-flow-col lg:items-start"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-4">
        <label
          htmlFor="pickup-station"
          className="flex gap-4 h-12 bg-background py-3 px-4 rounded-lg items-center"
        >
          <Location />
          <input
            id="pickup-station"
            type="text"
            name="pickup-station"
            placeholder="Levantamento"
            value={pickUpStationName}
            onChange={handlePickUpStationChange}
            onBlur={outOfFocus}
            required
            className="placeholder:text-mycarflix-black h-full bg-transparent w-full"
          />
        </label>

        <label
          htmlFor="delivery-station"
          className={`${
            isLocationEqual ? "hidden" : "flex"
          } gap-4 h-12 bg-background py-3 px-4 rounded-lg items-center`}
        >
          <Location />
          <input
            id="delivery-station"
            type="text"
            name="delivery-station"
            value={deliveryStationName}
            onChange={handleDeliveryStationChange}
            placeholder="Entrega"
            onBlur={outOfFocus}
            required
            className="placeholder:text-mycarflix-black h-full bg-transparent w-full"
          />
        </label>

        <label className="text-xs flex gap-2 items-start text-mycarflix-grey">
          <input
            type="checkbox"
            onChange={handleCheckboxChange}
            defaultChecked
          />
          <span>
            Utilizar os mesmos dados do local de levantamento para o local de
            entrega.
          </span>
        </label>
      </div>

      <div>
        <label
          htmlFor="pickup-schedule"
          className="grid gap-4 h-12 bg-background py-3 px-4 rounded-lg items-center"
        >
          <input
            className="w-full bg-transparent"
            id="pickup-schedule"
            name="pickup-schedule"
            type={"datetime-local"}
            value={pickUpScheduleInput}
            required
            onChange={handlePickUpSchedule}
          />
        </label>
        <span className="text-xs text-mycarflix-grey">Data Levantamento</span>
      </div>
      <div>
        <label
          htmlFor="delivery-schedule"
          className="flex gap-4 h-12 bg-background py-3 px-4 rounded-lg items-center"
        >
          <input
            className="w-full bg-transparent"
            id="delivery-schedule"
            name="delivery-schedule"
            type={"datetime-local"}
            value={deliveryScheduleInput}
            required
            onChange={handleDeliverySchedule}
          />
        </label>
        <span className="text-xs text-mycarflix-grey">Data Entrega</span>
      </div>

      <button
        type="submit"
        className="flex gap-4 p-3 rounded-xl items-center justify-center bg-primary text-mycarflix-white"
      >
        <SearchIcon /> <span className="lg:hidden">Search</span>
      </button>
    </form>
  );
}
