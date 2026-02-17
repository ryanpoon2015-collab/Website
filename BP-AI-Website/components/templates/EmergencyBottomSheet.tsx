import { useContext } from "react";

import { FHContext } from "@/app/templates/FH_Wrapper";
import { useAddress } from "@/hooks/useAddress";
import { dateFormatter } from "@/myfunctions/dateFormatter";

import WarningIcon from "../svg/icon/WarningIcon";
import MyBottomSheet from "./MyBottomSheet";

interface EmergencyBottomSheetProps {
  open: boolean;
  onClose?: () => void;
  latitude: number;
  longitude: number;
  emergencyTimestamp: Date;
}

const EmergencyBottomSheet: React.FC<EmergencyBottomSheetProps> = ({
  open,
  onClose,
  latitude,
  longitude,
  emergencyTimestamp,
}) => {
  const { device } = useContext(FHContext);

  const address = useAddress(latitude, longitude);

  return (
    <MyBottomSheet open={open} onClose={onClose}>
      <div className="px-5 csc">
        {/* //! Child Info Card  */}
        <div className="rounded-xl bg-zinc-200 p-3 rsc-4 wf">
          <WarningIcon />
          <div className="css-1">
            <p className="t6">Emergency!</p>
          </div>
        </div>

        {/* //! Need Help */}
        <div className="mb-10 mt-8 csc-3 tc">
          <p className="t-red-500 tf6">Need Help</p>
          <p className="t-zinc-700 t36">{address}</p>
          <p className="t-zinc-400 t2">
            {device && dateFormatter(emergencyTimestamp)}
          </p>
        </div>

        {/* //! Call Police */}
        {/* <div className="rbs wf mt-10 mb-8">
          <div className="css-1">
            <p className="t2 t-zinc-400">Phone Number</p>
            <div className="rsc-1">
              <PhoneIcon size={12} />
              <p className="t2 t-zinc-400">09999</p>
            </div>
          </div>
        </div> */}
      </div>
    </MyBottomSheet>
  );
};

export default EmergencyBottomSheet;
