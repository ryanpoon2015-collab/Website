import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { Constants, LocalStorage } from "@/classes/Constants";
import useLocalStorage from "@/hooks/useLocalStorage";

import LocationBottomSheet from "./LocationBottomSheet";
import MyBottomSheet from "./MyBottomSheet";

export interface MapMarker {
  latitude?: number | null;
  longitude?: number | null;
  icon: string;
  name: string;
  color: string;
  bottom_sheet?: React.ReactNode;
}

interface MapsProps {
  mapMarkers: MapMarker[];
  type?: "ROADMAP" | "SATELLITE" | "HYBRID" | "TERRAIN";
  roundedCorner?: boolean;
  height?: string;
}

const Maps: React.FC<MapsProps> = ({
  mapMarkers,
  type = "ROADMAP",
  roundedCorner = false,
  height = "16rem",
}) => {
  const [maps, setMaps] = useState<any>();
  const [map, setMap] = useState<any>();
  const [markers, setMarkers] = useState<any>();
  const [openLocationBS, setOpenLocationBS] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<any>();
  const [selectedMapMarker, setSelectedMapMarker] = useState<MapMarker>();

  //! ZOOM / SET ZOOM
  const [zoom, setZoom] = useLocalStorage(
    LocalStorage.mapZoom,
    Constants.DefaulMapZoom
  );

  //! ZOOM UPDATE
  const onMapChange = (e: GoogleMapReact.ChangeEventValue) => {
    setZoom(e.zoom);
  };

  //! TOGGLE LOCATION BOTTOM SHEET
  const toggleOpenLocation = (marker: any, mapMarker: MapMarker) => {
    setSelectedMarker(marker);
    setSelectedMapMarker(mapMarker);
    setOpenLocationBS((open) => !open);
  };

  //! MAP TYPE ID
  const mapTypeId = maps.MapTypeId[type];

  //! UPDATE WATCH MARKER POSITION
  useEffect(() => {
    for (let i = 0; i < mapMarkers.length; i++) {
      if (!markers) return;
      markers[i].setPosition({
        lat: mapMarkers[i].latitude,
        lng: mapMarkers[i].longitude,
      });
    }
  }, [markers, mapMarkers]);

  //! GET CENTER
  const defaultCenter = getCenter(
    mapMarkers.map((marker) => ({
      lat: marker.latitude ?? 14.5995,
      lng: marker.longitude ?? 120.9842,
    }))
  );

  useEffect(() => {
    if (!map || !maps || !mapMarkers || mapMarkers.length < 2) return;
    const bounds = new maps.LatLngBounds();
    for (const marker of mapMarkers) {
      bounds.extend({ lat: marker.latitude, lng: marker.longitude });
    }
    map.fitBounds(bounds);
  }, [map, maps, mapMarkers]);

  const generateKeyFrames = (mapMarker: MapMarker) => {
    return `
      div:has(> img[src='${mapMarker.icon}']) {
        animation: pulse-animation-${mapMarker.name.replace(
          " ",
          "_"
        )} 2s infinite;
        border-radius: 50%;
      }

      @keyframes pulse-animation-${mapMarker.name.replace(" ", "_")} {
        0% {
          box-shadow: 0 0 0 0px ${mapMarker.color};
        }
        100% {
          box-shadow: 0 0 0 20px rgba(42, 183, 183, 0);
        }
      }
    `;
  };

  // console.log(mapMarkers.map((marker) => generateKeyFrames(marker)).join("\n"));

  return (
    <div
      className={twMerge(
        "relative overflow-hidden select-none",
        roundedCorner && "wf h-64 rounded-3xl b-2"
      )}
      style={{
        minHeight: height,
        width: "100%",
        height,
      }}
    >
      <style>
        {mapMarkers.map((marker) => generateKeyFrames(marker)).join("\n")}
      </style>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAzPN7p1Nx8VgwDWN7QmheKnvAI4Bov-X8" }}
        defaultCenter={defaultCenter}
        center={defaultCenter}
        defaultZoom={zoom}
        onChange={onMapChange}
        style={{
          width: "100%",
          height: "100%",
          minHeight: "16rem",
          position: "relative",
          zIndex: 1,
        }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => {
          setMaps(maps);
          setMap(map);

          const _markers = [];

          for (const mapMarker of mapMarkers) {
            const _marker = new maps.Marker({
              position: { lat: mapMarker.latitude, lng: mapMarker.longitude },
              map,
              title: mapMarker.name,
              icon: {
                url: mapMarker.icon, // url
                scaledSize: new maps.Size(50, 50), // scaled size
                origin: new maps.Point(0, 0), // origin
                anchor: new maps.Point(25, 25), // anchor
              },
              clickable: true,
            });

            //! MARKER CLICK
            maps.event.addDomListener(_marker, "click", () =>
              toggleOpenLocation(_marker, mapMarker)
            );
            maps.event.addDomListener(_marker, "touchstart", () => {
              toggleOpenLocation(_marker, mapMarker);
            });
            _markers.push(_marker);
          }

          setMarkers(_markers);
        }}
        options={{
          mapTypeId,
          // zoomControl: !isScreenCapturing,
          // fullscreenControl: !isScreenCapturing,
          zoomControl: false,
          fullscreenControl: false,
        }}
      />

      {/* //! LOCATION BOTTOM SHEET */}
      {selectedMapMarker?.bottom_sheet === undefined ? (
        <LocationBottomSheet
          open={openLocationBS}
          lat={selectedMarker?.position.lat() ?? defaultCenter.lat}
          lng={selectedMarker?.position.lng() ?? defaultCenter.lng}
          onClose={() => setOpenLocationBS(false)}
        />
      ) : (
        <MyBottomSheet
          open={openLocationBS}
          onClose={() => setOpenLocationBS(false)}
        >
          {selectedMapMarker.bottom_sheet}
        </MyBottomSheet>
      )}
    </div>
  );
};

export default Maps;

function getCenter(points: GoogleMapReact.Coords[]): GoogleMapReact.Coords {
  const lat = points.reduce((acc, point) => acc + point.lat, 0) / points.length;
  const lng = points.reduce((acc, point) => acc + point.lng, 0) / points.length;
  return { lat, lng };
}
