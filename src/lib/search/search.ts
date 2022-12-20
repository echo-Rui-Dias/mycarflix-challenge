/**
 * @param  {string} date date in type string that you want to parse
 * @returns the date parsed to ISO
 */
export const parseDateToIso = (date: string) => {
    return new Date(date).toISOString();
}

/**
 * 
 * @param pickUpDay stringISO of pick Up date
 * @param DeliveryDay stringISO of delivery date
 * @returns returns rounded number of RentDays
 */
export const getRentDays = (pickUpDay:string, DeliveryDay: string)=>{
    let pickUpDate = new Date(pickUpDay);
    let deliveryDate = new Date(DeliveryDay);

    let rentDays = (deliveryDate.getTime() - pickUpDate.getTime()) / 86400000;
    
    return Math.round(rentDays);
}