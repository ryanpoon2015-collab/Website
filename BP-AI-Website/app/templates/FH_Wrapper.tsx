import { createContext, Dispatch, SetStateAction } from "react";

import { Config, Constants } from "@/classes/Constants";
import type { Device } from "@/classes/Device";
import FH from "@/classes/FH";
import type { MyUser } from "@/classes/MyUser";
import type { AdminSettings } from "@/classes/templates/AdminSettings";
import QuasarPage from "@/components/templates/QuasarPage";
import { useFHWatch } from "@/hooks/useFHWatch";
import { useLoading as useInitialLoading } from "@/hooks/useLoading";
import { useC, useS } from "@/hooks/useReactHooks";

import PageWrapper from "../helpers/PageWrapper";
import RegisterPage from "../helpers/RegisterPage";
import SignInPage from "../helpers/SignInPage";
import EmailVerificationPage from "./EmailVerificationPage";
import { UserContext } from "./User_Wrapper";
import { useBluetooth } from "@/app/z/Bluetooth/useBluetooth";
import Patient from "@/classes/Patient";
import { useFHPagination } from "@/hooks/useFHPagination";

// ? ----------------------
// ? FIRESTORE DATA OBJECTS
// ? ----------------------

export const FHContext = createContext({
  adminSettings: {} as AdminSettings | null,
  myUser: {} as MyUser | null,
  device: {} as Device | null,
  Bluetooth: {} as ReturnType<typeof useBluetooth>,
  temperature: {} as number | null,
  heartRate: {} as number | null,
  spo2: {} as number | null,
  bpSys: {} as number | null,
  bpDia: {} as number | null,
  setTemperature: {} as Dispatch<SetStateAction<number | null>>,
  setHeartRate: {} as Dispatch<SetStateAction<number | null>>,
  setSpo2: {} as Dispatch<SetStateAction<number | null>>,
  setBpSys: {} as Dispatch<SetStateAction<number | null>>,
  setBpDia: {} as Dispatch<SetStateAction<number | null>>,
  clearData: () => {},
  patient: {} as Patient | null,
  setPatient: {} as Dispatch<SetStateAction<Patient | null>>,
});

interface FHWrapperProps {}

const FHWrapper: React.FC<FHWrapperProps> = () => {
  const { user, loadingUser } = useC(UserContext);

  //! ADMIN SETTINGS
  const [adminSettings, loadingAdminSettings] = useFHWatch(
    FH.AdminSettings,
    "settings"
  );

  //! MY USER
  const [myUser, loadingMyUser] = useFHWatch(FH.MyUser, user?.uid);

  //! DEVICE
  const [device, loadingDevice] = useFHWatch(FH.Device, "readings");

  //! BLUETOOTH
  const Bluetooth = useBluetooth(
    Constants.BluetoothServiceId,
    Constants.BluetoothCharacteristicId
  );

  //! TEMPERATURE
  const [temperature, setTemperature] = useS<number | null>(null);

  //! HEART RATE
  const [heartRate, setHeartRate] = useS<number | null>(null);

  //! OXYGEN SATURATION
  const [spo2, setSpo2] = useS<number | null>(null);

  //! BP SYS
  const [bpSys, setBpSys] = useS<number | null>(null);

  //! BP DIA
  const [bpDia, setBpDia] = useS<number | null>(null);

  //! PATIENT
  const [patient, setPatient] = useS<Patient | null>(null);

  //! CLEAR DATA
  function clearData() {
    setTemperature(null);
    setHeartRate(null);
    setSpo2(null);
    setBpSys(null);
    setBpDia(null);
  }

  //! LOADING
  // const loading = useInitialLoading(
  //   loadingAdminSettings,
  //   loadingUser,
  //   loadingMyUser,
  //   loadingDevice
  // );

  //! PAGES
  // if (loading) return <div className="ws hs" />;
  if (adminSettings === null && !Constants.Offline) return <QuasarPage />;
  if (adminSettings?.quasar && !Constants.Offline) return <QuasarPage />;
  if (Config.hasSignIn) {
    if (user === null) return <SignInPage />;

    if (Config.hasEmailVerification && !user.emailVerified) {
      return <EmailVerificationPage user={user} />;
    }

    if (Config.hasRegister && !Constants.Offline) {
      if (myUser === null) return <RegisterPage user={user} />;
    }
  }

  return (
    <FHContext
      value={{
        adminSettings,
        myUser,
        device,
        Bluetooth,
        temperature,
        heartRate,
        spo2,
        bpSys,
        bpDia,
        setTemperature,
        setHeartRate,
        setSpo2,
        setBpSys,
        setBpDia,
        clearData,
        patient,
        setPatient,
      }}
    >
      <PageWrapper />
    </FHContext>
  );
};

export default FHWrapper;
