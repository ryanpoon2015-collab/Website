import BackIcon from "@/components/custom/BackIcon";
import SendIcon from "@/components/custom/SendIcon";
import MyInput from "@/components/templates/MyInput";
import PageContainer from "@/components/templates/PageContainer";
import Txt from "@/components/templates/Txt";
import { useInputField } from "@/hooks/useInputField";
import { useC, useF, useS } from "@/hooks/useReactHooks";
import { createContext, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { Pages, PageWrapperContext } from "../helpers/PageWrapper";
import useModal from "@/hooks/useModal";
import MyModal from "@/components/templates/MyModal";
import SendToPhysicianText from "@/components/custom/SendToPhysicianText";
import { FHContext } from "../templates/FH_Wrapper";
import myFetch from "@/myfunctions/myFetch";
import notify from "@/myfunctions/notify";
import DoYouSendToPhysicianText from "@/components/custom/DoYouSendToPhysicianText";
import GeneratingResultsText from "@/components/custom/GeneratingResultsText";
import { FadeLoader } from "react-spinners";
import getAge from "@/myfunctions/getAge";
import ViewResultsText from "@/components/custom/ViewResultsText";
import ViewResultsLinkText from "@/components/custom/ViewResultsLinkText";
import PdfViewer from "@/components/custom/PdfViewer";
import ErrrorGeneratingText from "@/components/custom/ErrrorGeneratingText";
import ThereIsErrorText from "@/components/custom/ThereIsErrorText";
import DataSentModalText from "@/components/custom/DataSentModalText";
import DataSavedSentText from "@/components/custom/DataSavedSentText";

export const AIDiagnosisPageContext = createContext({});

interface AIDiagnosisPageProps { }

const AIDiagnosisPage: React.FC<AIDiagnosisPageProps> = ({ }) => {
  const { setPage, isQuickHealth } = useC(PageWrapperContext);
  const {
    clearData,
    device,
    temperature,
    heartRate,
    spo2,
    bpSys,
    bpDia,
    patient,
  } = useC(FHContext);
  const [chats, setChats] = useS<string[]>([]);
  const [waitingForChat, setWaitingForChat] = useS(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const chatInput = useInputField((chat) => [
    [!chat, "Input cannot be empty."],
  ]);
  const generatingModal = useModal();
  const errorGeneratingModal = useModal();
  const viewResultModal = useModal();
  const sendResultModal = useModal();
  const dataSentModal = useModal();
  const dataSavedSentModal = useModal();

  const heightChartModal = useModal();

  const [reportUrl, setReportUrl] = useS<string | null>(null);
  const [recordId, setRecordId] = useS<string | null>(null);
  const [generatingResults, setGeneratingResults] = useS(false);
  const [sendingToPhysician, setSendingToPhysician] = useS(false);
  const [showPdf, setShowPdf] = useS(false);
  const [errorGenerating, setErrorGenerating] = useS(false);

  function addChat() {
    if (!chatInput.verify() || chats.length % 2 === 0) return;
    const chat = chatInput.getValue()!;
    setChats((prev) => [...prev, chat]);
    chatInput.clear();
  }

  useF(() => {
    if (waitingForChat) return;
    if (chats.length === 0) {
      setWaitingForChat(true);
      timeoutRef.current = setTimeout(() => {
        setChats(["What is your height in cm?"]);
        setWaitingForChat(false);
      }, 1000);
    } else if (chats.length === 2) {
      setWaitingForChat(true);
      timeoutRef.current = setTimeout(() => {
        setChats((prev) => [...prev, "What is your weight in kg?"]);
        setWaitingForChat(false);
      }, 1000);
    } else if (chats.length === 4) {
      setWaitingForChat(true);
      timeoutRef.current = setTimeout(() => {
        setChats((prev) => [
          ...prev,
          "What are the symptoms you are experiencing and for how long now?",
        ]);
        setWaitingForChat(false);
      }, 1000);
    } else if (chats.length === 6) {
      generateResults();
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [chats.length]);

  async function generateResults() {
    if (generatingResults) return;
    if (
      chats.length < 6 ||
      !temperature ||
      !heartRate ||
      !spo2 ||
      !bpSys ||
      !bpDia
    ) {
      notify("Please complete all the questions and vital signs first.");
      return;
    }
    if (!isQuickHealth && (!patient || !device)) return;
    generatingModal.open();
    setGeneratingResults(true);
    const res = await myFetch<{ url: string; id: string }>(
      `http://localhost:5000/${isQuickHealth ? "chatgpt_quick" : "chatgpt_full"}`,
      "POST",
      {},
      isQuickHealth
        ? {
          height: chats[1],
          weight: chats[3],
          symptoms: chats[5],
          body_temp: temperature,
          heart_rate: heartRate,
          spo2: spo2,
          bp_sys: bpSys,
          bp_dia: bpDia,
          id: recordId,
          patient_id: patient?.id,
          name: patient?.name,
        }
        : {
          name: patient!.name,
          birthdate: patient!.birthdate.toDate().toISOString(),
          age: getAge(patient!.birthdate.toDate()),
          sex: patient!.gender,
          contact: patient!.contact,
          height: chats[1],
          weight: chats[3],
          symptoms: chats[5],
          body_temp: temperature,
          heart_rate: heartRate,
          spo2: spo2,
          bp_sys: bpSys,
          bp_dia: bpDia,
          patient_id: patient!.id,
          physician_email: device?.attending_physician,
          physician_name: device?.attending_physician_name,
          id: recordId,
        },
      "json",
      "json"
    );
    setGeneratingResults(false);
    if (!res.error && res.data) {
      setReportUrl(res.data.url);
      setRecordId(res.data.id);
      generatingModal.close();
      viewResultModal.open();
    } else {
      notify(res.error);
      setErrorGenerating(true);
      generatingModal.close();
      errorGeneratingModal.open();
    }
  }

  async function sendToPhysician() {
    if (chats.length < 6) return;
    if (sendingToPhysician || !reportUrl) return;
    setSendingToPhysician(true);
    const res = await myFetch<string>(
      "http://localhost:5000/send_to_physician",
      "POST",
      {},
      {
        physician_email: device?.attending_physician,
        url: reportUrl,
      },
      "json",
      "json"
    );
    setSendingToPhysician(false);
    sendResultModal.close();
    if (!res.error) {
      notify("Report sent to physician.", { type: "success" });
      dataSentModal.open();
    } else {
      notify(res.error);
      setPage(Pages.Main);
      clearData();
    }
  }

  const leftTable = [
    { ft: `4'9"`, cm: "144.8" },
    { ft: `4'10"`, cm: "147.3" },
    { ft: `4'11"`, cm: "149.9" },
    { ft: `5'0"`, cm: "152.4" },
    { ft: `5'1"`, cm: "154.9" },
    { ft: `5'2"`, cm: "157.4" },
    { ft: `5'3"`, cm: "160.0" },
    { ft: `5'4"`, cm: "162.5" },
  ];

  const rightTable = [
    { ft: `5'5"`, cm: "165.1" },
    { ft: `5'6"`, cm: "167.7" },
    { ft: `5'7"`, cm: "170.1" },
    { ft: `5'8"`, cm: "172.7" },
    { ft: `5'9"`, cm: "175.2" },
    { ft: `5'10"`, cm: "177.8" },
    { ft: `5'11"`, cm: "180.3" },
    { ft: `6'0"`, cm: "182.9" },
  ];

  const onHeightSelect = (cm: string) => {
    if (chats.length === 1) {
      setChats((prev) => [...prev, cm]);
      heightChartModal.close();
    } else {
      notify("Please select height only when the bot asks for it.");
    }
  };

  return (
    <AIDiagnosisPageContext value={{}}>
      <div
        className={twMerge(
          "relative z-0 csc-12 wf hf min-hs overflow-scroll-y pt-44 pb-20 px-20 bg-plain-aspect-ratio"
        )}
        style={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/*//! CHATS */}
        <div className="wf css-4">
          {chats.map((chat, index) => (
            <div
              key={index}
              className={twMerge("wf", index % 2 === 0 ? "rss" : "res")}
            >
              <div
                className={twMerge(
                  "px-5 py-3 rounded-xl",
                  index % 2 === 0 ? "bg-[#21718F]" : "bg-[#C3C2C3] t-[#222222]"
                )}
              >
                <p className="t64">{chat}</p>
              </div>
            </div>
          ))}
        </div>

        {/*//! INPUT */}
        <form
          className="absolute bottom-10 rbc bg-white b b-black rounded-xl px-4 py-2"
          style={{ width: "calc(100% - 200px)" }}
          onSubmit={(e) => {
            e.preventDefault();
            addChat();
          }}
        >
          <MyInput
            inputField={chatInput}
            className="wf"
            divClassName="wf"
            placeholder="Type your answer here..."
          />
          <SendIcon onClick={addChat} />
        </form>

        {/*//! HEADER SECTION - Shorter capsule moved right to reveal DiagnoSys logo */}
        <div
          className="absolute top-10 bg-[#28859E] rounded-full px-8 py-2 flex items-center justify-between shadow-lg"
          style={{ left: "420px", right: "140px", height: "60px" }}
        >
          <p className="text-2xl text-white font-bold uppercase tracking-wide">AI Diagnosis</p>
          <button
            onClick={() => heightChartModal.open()}
            className="bg-white px-5 py-1.5 rounded-full shadow-md hover:bg-gray-100 transition-all"
          >
            <p className="text-[#222222] font-bold text-sm">Height chart</p>
          </button>
        </div>

        {/*//! BACK BUTTON */}
        <div className="absolute top-11 right-10">
          <BackIcon
            onClick={() =>
              setPage(isQuickHealth ? Pages.QuickHealth : Pages.FullHealth)
            }
          />
        </div>
      </div>

      {/*//! HEIGHT CHART MODAL */}
      <MyModal
        useModal={heightChartModal}
        title={
          <div className="wf rbc">
            <p className="text-white font-bold text-2xl uppercase tracking-tight">Height Chart</p>
          </div>
        }
      >
        <div className="flex gap-10 p-4">
          <div className="flex-1 border-2 border-[#28859E] rounded-xl overflow-hidden shadow-sm">
            <table className="wf text-center border-collapse">
              <thead>
                <tr className="bg-[#28859E] text-white">
                  <th className="p-3 border-r border-white font-bold text-xs">HEIGHT IN FT.</th>
                  <th className="p-3 font-bold text-xs">HEIGHT IN CM.</th>
                </tr>
              </thead>
              <tbody>
                {leftTable.map((row, i) => (
                  <tr key={i} className={twMerge("border-t border-gray-200", i % 2 === 0 ? "bg-white" : "bg-gray-50")}>
                    <td className="p-2 border-r border-gray-200 t64">{row.ft}</td>
                    <td
                      className="p-2 t64 cursor-pointer hover:bg-cyan-50 active:bg-cyan-100 transition-colors font-bold text-[#21718F]"
                      onClick={() => onHeightSelect(row.cm)}
                    >
                      {row.cm}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex-1 border-2 border-[#28859E] rounded-xl overflow-hidden shadow-sm">
            <table className="wf text-center border-collapse">
              <thead>
                <tr className="bg-[#28859E] text-white">
                  <th className="p-3 border-r border-white font-bold text-xs">HEIGHT IN FT.</th>
                  <th className="p-3 font-bold text-xs">HEIGHT IN CM.</th>
                </tr>
              </thead>
              <tbody>
                {rightTable.map((row, i) => (
                  <tr key={i} className={twMerge("border-t border-gray-200", i % 2 === 0 ? "bg-white" : "bg-gray-50")}>
                    <td className="p-2 border-r border-gray-200 t64">{row.ft}</td>
                    <td
                      className="p-2 t64 cursor-pointer hover:bg-cyan-50 active:bg-cyan-100 transition-colors font-bold text-[#21718F]"
                      onClick={() => onHeightSelect(row.cm)}
                    >
                      {row.cm}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </MyModal>


      <MyModal useModal={generatingModal} title={<GeneratingResultsText />}>
        <FadeLoader color="#28859E" />
      </MyModal>

      <MyModal
        useModal={errorGeneratingModal}
        title={<ErrrorGeneratingText />}
        button1Str="TRY AGAIN"
        onButton1Click={() => {
          errorGeneratingModal.close();
          setErrorGenerating(false);
          generateResults();
        }}
      >
        <ThereIsErrorText />
      </MyModal>

      <MyModal
        useModal={viewResultModal}
        title={<ViewResultsText />}
        button1Str="NEXT"
        onButton1Click={() => {
          viewResultModal.close();
          if (isQuickHealth) {
            sendResultModal.open();
          } else {
            dataSavedSentModal.open();
          }
        }}
      >
        <ViewResultsLinkText onClick={() => setShowPdf(true)} />
      </MyModal>

      <MyModal
        useModal={sendResultModal}
        title={<SendToPhysicianText />}
        button1Str="No"
        onButton1Click={() => {
          setPage(Pages.Main);
          sendResultModal.close();
          clearData();
        }}
        button2Str="Yes"
        onButton2Click={() => {
          sendToPhysician();
        }}
        isMeasuring={sendingToPhysician}
        measuringText="Sending"
      >
        <DoYouSendToPhysicianText />
      </MyModal>

      <MyModal
        useModal={dataSentModal}
        title={<SendToPhysicianText />}
        button1Str="DONE"
        onButton1Click={() => {
          setPage(Pages.Main);
          dataSentModal.close();
          clearData();
        }}
      >
        <DataSentModalText />
      </MyModal>

      <MyModal
        useModal={dataSavedSentModal}
        title={<SendToPhysicianText />}
        button1Str="DONE"
        onButton1Click={() => {
          setPage(Pages.Main);
          dataSavedSentModal.close();
          clearData();
        }}
      >
        <DataSavedSentText />
      </MyModal>

      {showPdf && <PdfViewer src={reportUrl} setShowPdf={setShowPdf} />}
    </AIDiagnosisPageContext>
  );
};

export default AIDiagnosisPage;