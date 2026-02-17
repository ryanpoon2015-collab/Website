import WebsiteVersion from "@/components/custom/WebsiteVersion";
import BluetoothConnectionIcon from "@/components/templates/BluetoothConnectionIcon";
import PageContainer from "@/components/templates/PageContainer";
import Txt from "@/components/templates/Txt";
import { useBLEContinuous } from "@/app/z/Bluetooth/useBLEContinuous";

interface Sample_Bluetooth_PageProps {}

const Sample_Bluetooth_Page: React.FC<Sample_Bluetooth_PageProps> = ({}) => {
  const [Bluetooth, [xStr, yStr, boolStr]] = useBLEContinuous({
    intervalS: 0,
    willRead: true,
    writeData: ["Hello World", 41244, 3.141414],
  });

  console.log(xStr, yStr, boolStr);

  return (
    <PageContainer>
      <Txt.title className=""> TITLE </Txt.title>
      <WebsiteVersion />
      <BluetoothConnectionIcon />
      <p className="t44">{Bluetooth.lastUpdate}</p>
    </PageContainer>
  );
};

export default Sample_Bluetooth_Page;
