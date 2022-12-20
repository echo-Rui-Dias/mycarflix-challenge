import { useSearch } from "../../context/SearchProvider";
import { useStation } from "../../context/StationProvider";
import Location from "../../icons/Location";

export interface StationProps {
  id: number;
  name: string;
  closeDays: string;
  openTime: string;
  closeTime: string;
}

export default function Station({
  id,
  name,
  closeDays,
  openTime,
  closeTime,
}: StationProps) {
  const {
    isPickUpOpen,
    setIsPickUpOpen,
    isDeliveryOpen,
    setIsDeliveryOpen,
    setPickUpStation,
    setDeliveryStation,
    setDeliveryStationName,
    setPickUpStationName,
  } = useStation();

  const { isLocationEqual } = useSearch();

  const station: StationProps = {
    id: id,
    name: name,
    closeDays: closeDays,
    openTime: openTime,
    closeTime: closeTime,
  };

  const handleStationClick = () => {
    if (isLocationEqual) {
      setPickUpStation(station);
      setDeliveryStation(station);
      setPickUpStationName(name);
      setDeliveryStationName(name);
    }

    if (!isLocationEqual && isPickUpOpen) {
      setPickUpStation(station);
      setPickUpStationName(name);
    }

    if (!isLocationEqual && isDeliveryOpen) {
      setDeliveryStation(station);
      setDeliveryStationName(name);
    }

    setIsPickUpOpen(false);
    setIsDeliveryOpen(false);
  };

  return (
    <div
      key={id}
      className="flex gap-4 h-12 bg-mycarflix-white hover:bg-background py-3 px-4 rounded-lg items-center cursor-pointer"
      onClick={handleStationClick}
    >
      <Location />
      <span>{name}</span>
    </div>
  );
}
