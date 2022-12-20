import {
  createContext,
  ReactNode,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { StationProps } from "../components/widgets/Station";

interface StationContextProps {
  pickUpStationName:string;
  setPickUpStationName: Dispatch<SetStateAction<string>>;
  deliveryStationName:string;
  setDeliveryStationName: Dispatch<SetStateAction<string>>;
  pickUpStation: StationProps | {} ;
  setPickUpStation: Dispatch<SetStateAction<StationProps>> | Dispatch<SetStateAction<{}>>;
  deliveryStation: StationProps | {} ;
  setDeliveryStation: Dispatch<SetStateAction<StationProps>> | Dispatch<SetStateAction<{}>>;
  isPickUpOpen: boolean;
  setIsPickUpOpen: Dispatch<SetStateAction<boolean>>;
  isDeliveryOpen: boolean;
  setIsDeliveryOpen: Dispatch<SetStateAction<boolean>>;
}

interface StationProviderProps {
  children: ReactNode;
}

const Station = createContext<StationContextProps>({} as StationContextProps);

export const StationProvider = ({ children }: StationProviderProps) => {
  const [pickUpStationName, setPickUpStationName] = useState<string>("");
  const [deliveryStationName, setDeliveryStationName] = useState<string>("");
  const [pickUpStation, setPickUpStation] = useState<StationProps | {}>({});
  const [deliveryStation, setDeliveryStation] = useState<StationProps | {}>({});
  const [isPickUpOpen, setIsPickUpOpen] = useState<boolean>(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState<boolean>(false);

  return (
    <Station.Provider
      value={{
        pickUpStationName,
        setPickUpStationName,
        deliveryStationName,
        setDeliveryStationName,
        pickUpStation,
        setPickUpStation,
        deliveryStation,
        setDeliveryStation,
        isPickUpOpen,
        setIsPickUpOpen,
        isDeliveryOpen,
        setIsDeliveryOpen
      }}
    >
      {children}
    </Station.Provider>
  );
};

export function useStation(): StationContextProps {
  const context = useContext(Station);
  return context;
}
