import LogDevice from "@/classes/LogDevice";
import DH from "@/classes/templates/DH";
import getAge from "@/myfunctions/getAge";
import { twMerge } from "tailwind-merge";
import PdfViewer from "./PdfViewer";
import { useS } from "@/hooks/useReactHooks";

interface DBTableProps {
  logDevices: LogDevice[];
  onClick?: (logDevice: LogDevice) => void;
  className?: string;
}

const DBTable: React.FC<DBTableProps> = ({
  logDevices,
  onClick,
  className,
}) => {
  const [showPdf, setShowPdf] = useS<boolean>(false);
  const [selectedUrl, setSelectedUrl] = useS<string | null>(null);

  return (
    <div className={twMerge("wf overflow-x-auto", className)}>
      <table className="t43c wf b-collapse b-2 b-black rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-black/20 font-weig">
            <th className="p-2 b-b b-black">NAME</th>
            <th className="p-2 b-b b-black">AGE</th>
            <th className="p-2 b-b b-black">GENDER</th>
            <th className="p-2 b-b b-black">BIRTH DATE</th>
            <th className="p-2 b-b b-black">CHECK-UP DATE</th>
            <th className="p-2 b-b b-black">
              PHYSIOLOGICAL INFO <br />
              {"(BP, SPO2, Heart"}
              <br />
              {"Rate, Temperature)"}
            </th>
            <th className="p-2 b-b b-black">HEIGHT & WEIGHT</th>
            <th className="p-2 b-b b-black">SYMPTOMS</th>
            <th className="p-2 b-b b-black">RESULTS</th>
            <th className="p-2 b-b b-black">DOCTOR</th>
          </tr>
        </thead>
        <tbody className="">
          {logDevices.map((logDevice) => (
            <tr
              key={logDevice.id}
              className={twMerge("cp", "bg-transparent")}
              onClick={() => onClick?.(logDevice)}
            >
              <td className="p-2 b-b b-[#AAAAAA] text-nowrap max-w-32 overflow-clip text-ellipsis">
                {logDevice.name}
              </td>
              <td className="p-2 b-b b-[#AAAAAA] text-nowrap">
                {getAge(logDevice.birthdate.toDate())}
              </td>
              <td className="p-2 b-b b-[#AAAAAA] text-nowrap">
                {logDevice.gender}
              </td>
              <td className="p-2 b-b b-[#AAAAAA] text-nowrap">
                {DH.shortDateFormat(logDevice.birthdate.toDate())}
              </td>
              <td className="p-2 b-b b-[#AAAAAA] text-nowrap">
                {DH.getCheckupDate(logDevice.id)}
              </td>
              <td className="p-2 text-left b-b b-[#AAAAAA] text-nowrap">
                Temperature: {logDevice.body_temp} °C
                <br />
                Heart Rate: {logDevice.heart_rate} bpm
                <br />
                Blood Pressure: {logDevice.bp_sys}/{logDevice.bp_dia} mmHg
                <br />
                SpO2: {logDevice.spo2} %
              </td>
              <td className="p-2 b-b b-[#AAAAAA] text-nowrap">
                Height: {logDevice.height} cm
                <br />
                Weight: {logDevice.weight} kg
              </td>
              {/* <td className="p-2 b-b b-[#AAAAAA] text-nowrap"> */}
              <td className="p-2 b-b b-[#AAAAAA] min-w-60">
                {logDevice.symptoms}
              </td>
              <td className="p-2 b-b b-[#AAAAAA] text-nowrap">
                <p
                  className="t-link underline"
                  onClick={() => {
                    setSelectedUrl(logDevice.url);
                    setShowPdf(true);
                  }}
                >
                  OPEN
                </p>
              </td>
              <td className="p-2 b-b b-[#AAAAAA] max-w-32 overflow-clip text-ellipsis">
                {logDevice.physician}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/*//! PFD VIEWER */}
      {showPdf && <PdfViewer src={selectedUrl} setShowPdf={setShowPdf} />}
    </div>
  );
};

export default DBTable;
