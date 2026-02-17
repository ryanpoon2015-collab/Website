import PageContainer from "@/components/templates/PageContainer";
// Removed Txt import to avoid errors
import { createContext, useRef, useState } from "react";
import { Pages, PageWrapperContext } from "../helpers/PageWrapper";
import { useC, useF, useS } from "@/hooks/useReactHooks";
import CheckVitalSignsText from "@/components/custom/CheckVitalSignsText";
import TemperatureVitalButton from "@/components/custom/TemperatureVitalButton";
import HeartRateVitalButton from "@/components/custom/HeartRateVitalButton";
import OxygenSaturationVitalButton from "@/components/custom/OxygenSaturationVitalButton";
import BloodPressureVitalIcon from "@/components/custom/BloodPressureVitalIcon";
import MyModal from "@/components/templates/MyModal";
import useModal from "@/hooks/useModal";
import PleasePlaceTempText from "@/components/custom/PleasePlaceTempText";
import VitalCheckingText from "@/components/custom/VitalCheckingText";
import { FHContext } from "../templates/FH_Wrapper";
import notify from "@/myfunctions/notify";
import myFetch from "@/myfunctions/myFetch"; // RESTORED FOR REALITY MODE
import GrayIcon from "@/components/custom/GrayIcon";
import PleasePlaceSpo2Text from "@/components/custom/PleasePlaceSpo2Text";
import PleasePlaceBloodPressureText from "@/components/custom/PleasePlaceBloodPressureText";
import NextButton from "@/components/custom/NextButton";

export const CheckVitalSignsPageContext = createContext({});

interface CheckVitalSignsPageProps { }

// --- Simple Keypad Component for Manual Input ---
const NumericKeypad = ({ onInput, onDelete, onClear, onSave, value }: any) => {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "/"];

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Display Screen */}
      <div className="w-full bg-gray-100 p-4 rounded-lg text-center border border-gray-300">
        <span className="text-3xl font-bold text-gray-700 h-10 block font-sans">
          {value || "0"}
        </span>
      </div>

      {/* Keys */}
      <div className="grid grid-cols-3 gap-2 w-full">
        {keys.map((key) => (
          <button
            key={key}
            onClick={() => onInput(key)}
            className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm text-2xl font-bold active:bg-gray-100 font-sans text-slate-700"
          >
            {key}
          </button>
        ))}

        {/* CLR BUTTON */}
        <button
          onClick={onClear}
          className="border border-red-200 p-4 rounded-xl shadow-sm font-bold font-sans"
          style={{ backgroundColor: '#fee2e2', color: '#dc2626' }} // Light Red
        >
          CLR
        </button>

        {/* DELETE BUTTON */}
        <button
          onClick={onDelete}
          className="border border-orange-200 p-4 rounded-xl shadow-sm font-bold font-sans"
          style={{ backgroundColor: '#ffedd5', color: '#ea580c' }} // Light Orange
        >
          ⌫
        </button>

        {/* SAVE BUTTON */}
        <button
          onClick={onSave}
          className="p-4 rounded-xl shadow-sm font-bold font-sans"
          style={{ backgroundColor: '#16a34a', color: 'white' }} // Explicit Green
        >
          SAVE
        </button>
      </div>
    </div>
  );
};

const CheckVitalSignsPage: React.FC<CheckVitalSignsPageProps> = ({ }) => {
  const { setPage, isQuickHealth, setDisableCheckVitalSigns } =
    useC(PageWrapperContext);
  const {
    temperature,
    setTemperature,
    heartRate,
    setHeartRate,
    spo2,
    setSpo2,
    bpSys,
    bpDia,
    setBpSys,
    setBpDia,
  } = useC(FHContext);

  // Existing Hardware Modals
  const tempModal = useModal();
  const spo2Modal = useModal();
  const bpModal = useModal();

  // New Modals for Logic
  const optionsModal = useModal(); // Asks "Re-test" or "Manual"
  const manualInputModal = useModal(); // Shows the Keypad

  const [measuring, setMeasuring] = useS(false);

  // New State for Selection
  const [selectedVital, setSelectedVital] = useS<string | null>(null);
  const [manualInputValue, setManualInputValue] = useS("");

  // Initialize with 0 instead of Date.now() to prevent Hydration Error
  const [startedMeasuringBP, setStartedMeasuringBP] = useS(0);

  useF(() => {
    startedRef.current = startedMeasuringBP;
  }, [startedMeasuringBP]);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startedRef = useRef<number>(Date.now());

  function clearTick() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  // --- NEW HANDLERS FOR EDIT/RETEST ---

  // 1. Called when clicking an existing GrayIcon
  const handleExistingClick = (vitalName: string) => {
    setSelectedVital(vitalName);
    optionsModal.open();
  };

  // 2. Called when "Re-Test" is clicked
  const handleRetest = () => {
    optionsModal.close();
    // Trigger the correct hardware modal based on selection
    if (selectedVital === "Temperature") tempModal.open();
    if (selectedVital === "Heart Rate" || selectedVital === "Oxygen Saturation")
      spo2Modal.open();
    if (selectedVital === "Blood Pressure") bpModal.open();
  };

  // 3. Called when "Manual Input" is clicked
  const handleManualInput = () => {
    optionsModal.close();
    setManualInputValue(""); // Clear previous input
    manualInputModal.open();
  };

  // 4. Keypad Logic
  const onKeypadInput = (char: string) => {
    setManualInputValue((prev) => prev + char);
  };

  const onKeypadSave = () => {
    const val = manualInputValue;
    if (!val) return;

    // Parse and save based on vital type
    if (selectedVital === "Temperature") {
      setTemperature(parseFloat(val));
    } else if (selectedVital === "Heart Rate") {
      setHeartRate(parseInt(val));
    } else if (selectedVital === "Oxygen Saturation") {
      setSpo2(parseInt(val));
    } else if (selectedVital === "Blood Pressure") {
      // Expecting format like "120/80"
      if (val.includes("/")) {
        const [sys, dia] = val.split("/");
        setBpSys(parseInt(sys));
        setBpDia(parseInt(dia));
      } else {
        notify("Format must be Sys/Dia (e.g. 120/80)");
        return; // Don't close if error
      }
    }

    manualInputModal.close();
  };

  // --- ACTUAL HARDWARE LOGIC ---

  //! MEASURE TEMPERATURE
  async function measureTemperature() {
    if (measuring) return;
    setMeasuring(true);
    const res = await myFetch<number>(
      "http://localhost:5000/measure_temperature",
      "GET",
      {},
      {},
      "json",
      "json"
    );
    setMeasuring(false);
    console.log(res);
    if (!res.error && res.data) {
      setTemperature(res.data);
    } else {
      notify(res.error);
    }
    tempModal.close();
  }

  //! START CONTEC
  async function startContec() {
    if (measuring) return;
    setMeasuring(true);
    const res = await myFetch<number>(
      "http://localhost:5000/contec_start",
      "GET",
      {},
      {},
      "json",
      "json"
    );
    console.log(res);
    if (!res.error) {
      clearTick();
      intervalRef.current = setInterval(() => {
        readContec();
      }, 1000);
    } else {
      notify(res.error);
    }
  }

  //! READ CONTEC
  async function readContec() {
    const res = await myFetch<{ pulse_rate: number; spo2: number }>(
      "http://localhost:5000/contec_read",
      "GET",
      {},
      {},
      "json",
      "json"
    );
    console.log(res);
    if (!res.error && res.data) {
      setSpo2(res.data.spo2);
      setHeartRate(res.data.pulse_rate);
      clearTick();
      setMeasuring(false);
      spo2Modal.close();
    } else {
      if (res.error !== "No valid data available") notify(res.error);
    }
  }

  //! START BP
  async function startBP() {
    if (measuring) return;
    setMeasuring(true);
    const res = await myFetch<number>(
      "http://localhost:5000/bp_start",
      "GET",
      {},
      {},
      "json",
      "json"
    );
    console.log(res);
    if (!res.error) {
      clearTick();
      const startedAt = Date.now();
      setStartedMeasuringBP(startedAt);

      intervalRef.current = setInterval(() => {
        readBP();
      }, 5000);
    } else {
      notify(res.error);
      setMeasuring(false);
      clearTick();
    }
  }

  //! STOP BP
  async function stopBP() {
    clearTick();
    setMeasuring(false);
    bpModal.close();
    const res2 = await myFetch(
      "http://localhost:5000/bp_stop",
      "GET",
      {},
      {},
      "json",
      "json"
    );
    if (res2.error) {
      notify(res2.error);
      console.log(res2);
    }
  }

  //! READ BP
  async function readBP() {
    const elapsed = Date.now() - startedRef.current;
    if (elapsed < 30_000) {
      console.log("30 seconds have not passed yet.");
      return;
    }
    if (elapsed >= 65_000) {
      console.log("65 seconds have passed. Stopping BP.");
      await stopBP();
      return;
    }

    const res = await myFetch<{
      bp_sys: number;
      bp_dia: number;
    }>("http://localhost:5000/bp_read", "GET", {}, {}, "json", "json");
    console.log(res);
    if (!res.error && res.data) {
      setBpSys(res.data.bp_sys);
      setBpDia(res.data.bp_dia);
      await stopBP();
    } else {
      if (res.error !== "No valid data available") {
        notify(res.error);
        console.log(res);
        setMeasuring(false);
        clearTick();
      }
    }
  }

  useF(() => {
    // Initialize all values to null on mount
    setTemperature(null);
    setHeartRate(null);
    setSpo2(null);
    setBpSys(null);
    setBpDia(null);
    return () => {
      clearTick();
      stopBP();
    };
  }, []);

  return (
    <CheckVitalSignsPageContext value={{}}>
      <PageContainer
        onBack={() => {
          setPage(isQuickHealth ? Pages.QuickHealth : Pages.FullHealth);
          setDisableCheckVitalSigns(false);
        }}
      >
        <CheckVitalSignsText />
        <div className="ccc-6">
          <div className="rcc-6">
            {/* TEMPERATURE BUTTON */}
            {temperature === null ? (
              <TemperatureVitalButton onClick={tempModal.open} />
            ) : (
              <div onClick={() => handleExistingClick("Temperature")}>
                <GrayIcon text={`${temperature} °C`} />
              </div>
            )}

            {/* HEART RATE BUTTON */}
            {heartRate === null ? (
              <HeartRateVitalButton onClick={spo2Modal.open} />
            ) : (
              <div onClick={() => handleExistingClick("Heart Rate")}>
                <GrayIcon text={`${heartRate} BPM`} />
              </div>
            )}
          </div>
          <div className="rcc-4">
            {/* SPO2 BUTTON */}
            {spo2 === null ? (
              <OxygenSaturationVitalButton onClick={spo2Modal.open} />
            ) : (
              <div onClick={() => handleExistingClick("Oxygen Saturation")}>
                <GrayIcon text={`${spo2} %`} />
              </div>
            )}

            {/* BLOOD PRESSURE BUTTON */}
            {bpSys === null || bpDia === null ? (
              <BloodPressureVitalIcon onClick={bpModal.open} />
            ) : (
              <div onClick={() => handleExistingClick("Blood Pressure")}>
                <GrayIcon text={`${bpSys}/${bpDia} mmHg`} />
              </div>
            )}
          </div>
        </div>

        {/*//! NEXT BUTTON */}
        {temperature !== null &&
          heartRate !== null &&
          spo2 !== null &&
          bpSys !== null &&
          bpDia !== null && (
            <div className="absolute top-1/2 -translate-y-1/4 right-20">
              <NextButton
                onClick={() => {
                  setPage(Pages.QuickHealth);
                  setDisableCheckVitalSigns(true);
                }}
              />
            </div>
          )}
      </PageContainer>

      {/*//! --- MODALS SECTION --- */}

      {/* 1. SELECTION MODAL (Re-Test vs Manual) */}
      <MyModal
        useModal={optionsModal}
        title={
          <div className="flex items-center gap-2">
            {/* Dark Circle Icon */}
            <div className="w-4 h-4 rounded-full bg-slate-800"></div>
            {/* Title Text */}
            <span className="text-xl font-bold text-white font-sans">
              Edit {selectedVital}
            </span>
          </div>
        }
        // We hide the default footer buttons to use custom ones
        button1Str=""
        button2Str=""
      >
        <div className="flex flex-col gap-4 p-4 w-full">
          {/* Font Update: Bold, Darker, Sans */}
          <p className="text-center text-slate-700 font-bold mb-2 font-sans text-lg">
            Select an option to update this value.
          </p>

          {/* RE-TEST BUTTON */}
          <button
            onClick={handleRetest}
            className="font-bold py-4 rounded-xl shadow-md transition-colors font-sans"
            style={{ backgroundColor: '#1f5f7a', color: 'white' }}
          >
            Re-Test (Hardware)
          </button>

          {/* MANUAL INPUT BUTTON */}
          <button
            onClick={handleManualInput}
            className="font-bold py-4 rounded-xl shadow-md transition-colors font-sans"
            style={{ backgroundColor: '#64748b', color: 'white' }}
          >
            Manual Input
          </button>
        </div>
      </MyModal>

      {/* 2. MANUAL INPUT KEYPAD MODAL */}
      <MyModal
        useModal={manualInputModal}
        title={
          <div className="flex items-center gap-2">
            {/* Dark Circle Icon */}
            <div className="w-4 h-4 rounded-full bg-slate-800"></div>
            {/* Title Text */}
            <span className="text-xl font-bold text-white font-sans">
              Enter {selectedVital}
            </span>
          </div>
        }
        button1Str="" // Hiding default buttons
      >
        <div className="w-full p-2">
          {selectedVital === "Blood Pressure" && (
            <p className="text-xs text-center text-gray-400 mb-2 font-sans">
              Format: Systolic/Diastolic (e.g. 120/80)
            </p>
          )}
          <NumericKeypad
            value={manualInputValue}
            onInput={onKeypadInput}
            onDelete={() => setManualInputValue((p: string) => p.slice(0, -1))}
            onClear={() => setManualInputValue("")}
            onSave={onKeypadSave}
          />
        </div>
      </MyModal>

      {/* 3. ACTUAL HARDWARE MODALS */}
      {/* Temperature Modal */}
      <MyModal
        useModal={tempModal}
        title={<VitalCheckingText />}
        button1Str="MEASURE"
        onButton1Click={measureTemperature}
        isMeasuring={measuring}
      >
        <PleasePlaceTempText />
      </MyModal>

      {/* SpO2/HR Modal */}
      <MyModal
        useModal={spo2Modal}
        title={<VitalCheckingText />}
        button1Str="MEASURE"
        onButton1Click={startContec}
        isMeasuring={measuring}
      >
        <PleasePlaceSpo2Text />
      </MyModal>

      {/* Blood Pressure Modal */}
      <MyModal
        useModal={bpModal}
        title={<VitalCheckingText />}
        button1Str="MEASURE"
        onButton1Click={startBP}
        isMeasuring={measuring}
        onclose={() => {
          stopBP();
        }}
      >
        <PleasePlaceBloodPressureText />
      </MyModal>
    </CheckVitalSignsPageContext>
  );
};

export default CheckVitalSignsPage;