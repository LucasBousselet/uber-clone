import { fakeData } from "./fakeData";

const getOriginCoordinatesAsync = () => {
    return Promise.resolve(fakeData.origin);
}

const getDestinationCoordinatesAsync = () => {
    return Promise.resolve(fakeData.destination);
}

const getTravelInforAsync = () => {
    return Promise.resolve(fakeData.travelTimeInformation);
}


export {
    getOriginCoordinatesAsync,
    getDestinationCoordinatesAsync,
    getTravelInforAsync
}