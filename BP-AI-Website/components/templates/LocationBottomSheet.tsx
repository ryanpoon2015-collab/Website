import { useAddress } from "@/hooks/useAddress";

import PinIcon from "../svg/icon/PinIcon";
import MyBottomSheet from "./MyBottomSheet";

interface LocationBottomSheetProps {
  open: boolean;
  lat?: number;
  lng?: number;
  title?: string;
  onClose?: () => void;
}

const LocationBottomSheet: React.FC<LocationBottomSheetProps> = ({
  open,
  lat,
  lng,
  title,
  onClose,
}) => {
  const address = useAddress(lat, lng);

  return (
    <MyBottomSheet open={open} onClose={onClose}>
      <div className="px-5 pb-5 rbc">
        <div className="css-1">
          <p className="t-zinc-700 t36">{title}</p>
          <p className="t-zinc-500 t2">{address}</p>
        </div>
        <PinIcon />
      </div>
    </MyBottomSheet>
  );
};

export default LocationBottomSheet;
