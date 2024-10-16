import { useGeolocation } from "@uidotdev/usehooks";
import { createContext, useContext } from "react";

const LocationContext = createContext({});

export const useLocation = () => useContext(LocationContext);

export function LocationProvider({ children }) {
    const locationData = useGeolocation();
    return (
        <LocationContext.Provider value={locationData}>
            {children}
        </LocationContext.Provider>
    );
}