import { useEffect, useState } from "react";
import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
  GeocodeOptions,
} from "react-geocode";

setDefaults({
  key: "AIzaSyBuXFiS6zeNvm8IqXqY7FSmsQPYfzpqt_w", // Your API key here.
  language: "en", // Default language for responses.
  region: "es", // Default region for responses.
} as GeocodeOptions);

export const useAddress = (
  lat: number | undefined,
  lng: number | undefined
): string | null => {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (lat && lng) {
      // Get address from latitude & longitude.
      fromLatLng(lat, lng)
        .then(({ results }) => {
          if (!results || results.length === 0) return;

          const formatted_address: string | undefined | null =
            results[0].formatted_address;
          setAddress(formatted_address ?? null);
        })
        .catch(console.error);
    }
  }, [lat, lng]);

  return address;
};
