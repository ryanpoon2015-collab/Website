import { FHContext } from "@/app/templates/FH_Wrapper";
import { useC } from "@/hooks/useReactHooks";
import BluetoothConnectedIcon from "../svg/icon/BluetoothConnectedIcon";
import BluetoothDisconnectedIcon from "../svg/icon/BluetoothDisconnectedIcon";

interface BluetoothConnectionIconProps {}

const BluetoothConnectionIcon: React.FC<
  BluetoothConnectionIconProps
> = ({}) => {
  const { Bluetooth } = useC(FHContext);
  const isConnected = Bluetooth.status === "connected";

  return (
    <div className="absolute top-8 right-6 z-10">
      {isConnected ? (
        <BluetoothConnectedIcon onClick={Bluetooth.disconnect} />
      ) : (
        <BluetoothDisconnectedIcon onClick={Bluetooth.connect} />
      )}
    </div>
  );
};

export default BluetoothConnectionIcon;
