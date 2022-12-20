import { useSearch } from "../../context/SearchProvider";
import {
  getTotal,
  parsePriceToNumber,
  parsePriceToPortuguese,
} from "../../lib/Car/car";

export interface CarProps {
  id: number;
  name: string;
  make: string;
  kmsIncluded: number;
  doors: number;
  priceDay: string;
  image: string;
}

export default function Car({
  id,
  name,
  make,
  kmsIncluded,
  doors,
  priceDay,
  image,
}: CarProps) {
  const { rentDays } = useSearch();

  return (
    <div key={id} className="grid p-4 bg-mycarflix-white rounded-2xl">
      <div className="w-full">
        <img
          className="object-cover w-full rounded-2xl"
          src={image}
          alt={`${name} ${make}`}
        />
      </div>
      <div className="grid border-b border-mycarflix-grey mt-4 pb-2">
        <p className="text-2xl font-bold">
          {getTotal(parsePriceToNumber(priceDay), rentDays)}€
        </p>
        <p className="text-mycarflix-grey">
          {parsePriceToPortuguese(priceDay)}€/Dia
        </p>
      </div>
      <div className="grid pt-2">
        <p className="font-bold">
          <span>{name} </span>
          <span>{make}</span>
        </p>
        <p>{kmsIncluded} km</p>
        <p>{doors} portas</p>
      </div>
    </div>
  );
}
