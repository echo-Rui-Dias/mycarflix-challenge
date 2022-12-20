import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  Dispatch,
  SetStateAction
} from "react";

interface SearchContextProps {
  pickUpStationSearched: string;
  setPickUpStationSearched: Dispatch<SetStateAction<string>>;
  deliveryStationSearched: string;
  setDeliveryStationSearched: Dispatch<SetStateAction<string>>;
  pickUpSchedule: string;
  setPickUpSchedule: Dispatch<SetStateAction<string>>;
  deliverySchedule: string;
  setDeliverySchedule: Dispatch<SetStateAction<string>>;
  isLocationEqual: boolean;
  setIsLocationEqual: Dispatch<SetStateAction<boolean>>;
  rentDays: number;
  setRentDays: Dispatch<SetStateAction<number>>;
  isErrorFound: boolean;
  setIsErrorFound: Dispatch<SetStateAction<boolean>>;
  isAscending: boolean;
  setIsAscending: Dispatch<SetStateAction<boolean>>;
}

interface SearchProviderProps {
  children: ReactNode;
}

const Search = createContext<SearchContextProps>({} as SearchContextProps);

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [pickUpStationSearched, setPickUpStationSearched] = useState<string>("");
  const [deliveryStationSearched, setDeliveryStationSearched] = useState<string>("");
  const [pickUpSchedule, setPickUpSchedule] = useState<string>("");
  const [deliverySchedule, setDeliverySchedule] = useState<string>("");
  const [isLocationEqual, setIsLocationEqual] = useState<boolean>(true);
  const [rentDays, setRentDays] = useState<number>(1);
  const [isErrorFound, setIsErrorFound] = useState<boolean>(true);
  const [isAscending, setIsAscending] = useState<boolean>(true);

  

  return (
    <Search.Provider
      value={{
        pickUpStationSearched,
        setPickUpStationSearched,
        deliveryStationSearched,
        setDeliveryStationSearched,
        pickUpSchedule,
        setPickUpSchedule,
        deliverySchedule,
        setDeliverySchedule,
        isLocationEqual,
        setIsLocationEqual,
        rentDays,
        setRentDays,
        isErrorFound,
        setIsErrorFound,
        isAscending,
        setIsAscending
      }}
    >
      {children}
    </Search.Provider>
  );
};

export function useSearch(): SearchContextProps {
  const context = useContext(Search);
  return context;
}
