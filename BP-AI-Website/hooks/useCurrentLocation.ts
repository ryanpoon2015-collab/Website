import { useState, useEffect } from "react";

type Coordinates = {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
};

const useCurrentLocation = (): Coordinates => {
  const [coordinates, setCoordinates] = useState<Coordinates>({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCoordinates({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              error: null,
            });
          },
          (error) => {
            setCoordinates((prevCoordinates) => ({
              ...prevCoordinates,
              error: error.message,
            }));
          }
        );
      } else {
        setCoordinates((prevCoordinates) => ({
          ...prevCoordinates,
          error: "Geolocation is not supported by this browser.",
        }));
      }
    };

    // getLocation();

    const interval = setInterval(getLocation, 3000);

    return () => {
      clearInterval(interval);
      // Cleanup function to clear the watcher when the component unmounts
    };
  }, []); // Empty dependency array means this effect runs once after the component mounts

  return coordinates;
};

export default useCurrentLocation;
