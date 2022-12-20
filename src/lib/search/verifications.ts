import { StationProps } from "../../components/widgets/Station";

/**
 *
 * @param pickUpSchedule pick Up schedule as string
 * @param deliverySchedule Delivery schedule as string
 * @returns
 */
export const isPickUpDateGreaterThenDeliveryDate = (
  pickUpSchedule: string,
  deliverySchedule: string
) => {
  if (new Date(pickUpSchedule) >= new Date(deliverySchedule)) {
    return true;
  }
  return false;
};

/**
 * 
 * @param numberOfRentDays number of days that car will be rented
 * @returns returns boolean
 */
export const isRentDaysValid = (numberOfRentDays: number) => {
  if (numberOfRentDays >= 1) {
    return true;
  }
  return false;
};

/**
 *
 * @param locationSearched station from input
 * @param stationList list of all locations
 * @returns retuns true if input value matches some of the station Names from all stations
 */
export const isStationValid = (
  stationSearched: string,
  stationList: Array<StationProps>
) => {
  return stationList.some((station: StationProps) => {
    return station.name === stationSearched;
  });
};
