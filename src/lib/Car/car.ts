import { CarProps } from "../../components/widgets/Car";

/**
 *
 * @param price Price to be parsed
 * @returns price in type number
 */
export const parsePriceToNumber = (price: string) => {
  let newPrice = price.replace(",", ".").slice(1, price.length);
  return Number(parseFloat(newPrice).toFixed(2));
};

/**
 *
 * @param priceDay daily cost of the car
 * @param numberOfDays number of days that the car would be in use
 * @returns total price of the car rent
 */
export const getTotal = (priceDay: number, numberOfDays: number) => {
  return (priceDay * numberOfDays).toFixed(2).replace(".", ",");
};

/**
 *
 * @param price price of daily rent
 * @returns return the price parsed to Portuguese price format
 */
export const parsePriceToPortuguese = (price: string) => {
  return price.replace(".", ",").replace("€", "");
};

/**
 * 
 * @param cars array of cars
 * @param isAscending is price ascending or descending
 * @returns returns the array sorted
 */
export const carsSorted = (cars: Array<CarProps>, isAscending: boolean) => {
  if (isAscending) {
    return cars.sort((a: any, b: any) => {
      return parsePriceToNumber(a.priceDay) - parsePriceToNumber(b.priceDay);
    });
  }
  return cars.sort((a: any, b: any) => {
    return parsePriceToNumber(b.priceDay) - parsePriceToNumber(a.priceDay);
  });
};
