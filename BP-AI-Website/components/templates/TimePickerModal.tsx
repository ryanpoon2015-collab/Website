import MyModal from "../templates/MyModal";
import useModal from "@/hooks/useModal";
import MyInput from "../templates/MyInput";
import { useInputField } from "@/hooks/useInputField";
import MyDropDownPicker from "../templates/MyDropdownPicker";
import { useF, useS } from "@/hooks/useReactHooks";
import MyButton from "../templates/MyButton";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useTimePicker } from "@/hooks/useTimePicker";

interface TimePickerModalProps {
  useTimePicker: ReturnType<typeof useTimePicker>;
}

const TimePickerModal: React.FC<TimePickerModalProps> = ({ useTimePicker }) => {
  const {
    hour,
    minute,
    meridian: meridianInit,
    modal,
    onUpdate,
  } = useTimePicker;

  const hourInput = useInputField((hour) => [
    [!hour, "Hour is required"],
    [isNaN(Number(hour)), "Hour must be a number"],
    [Number(hour) < 1 || Number(hour) > 12, "Hour must be between 1 and 12"],
    [Number(hour) % 1 !== 0, "Hour must be an integer"],
  ]);

  const minuteInput = useInputField((minute) => [
    [!minute, "Minute is required"],
    [isNaN(Number(minute)), "Minute must be a number"],
    [
      Number(minute) < 0 || Number(minute) > 59,
      "Minute must be between 0 and 59",
    ],
    [Number(minute) % 1 !== 0, "Minute must be an integer"],
  ]);

  const [meridian, setMeridian] = useS<"AM" | "PM">(meridianInit);

  function setTime() {
    if (!hourInput.verify() || !minuteInput.verify()) return;
    // setHour(Number(hourInput.getValue()));
    // setMinute(Number(minuteInput.getValue()));
    // setMeridian(meridian);
    onUpdate(
      Number(hourInput.getValue()),
      Number(minuteInput.getValue()),
      meridian
    );
    modal.close();
  }

  // // * Set default values for hour and minute inputs
  // useF(() => {
  //   hourInput.setValue(hour.toString());
  //   minuteInput.setValue(minute.toString());
  // }, [hour, minute]);

  return (
    <MyModal useModal={modal} title="Select Time">
      <div className="csc-6 t-white">
        {/*//! TIME */}
        <div className="rsc-1">
          <MyInput
            inputField={hourInput}
            placeholder="00"
            type="number"
            className="p-1 text-center"
            divClassName="w-12"
            defaultValue={hour.toString()}
          />
          <p className="t44">:</p>
          <MyInput
            inputField={minuteInput}
            placeholder="00"
            type="number"
            className="p-1 text-center"
            divClassName="w-12"
            defaultValue={minute.toString()}
          />
          <div className="w-24 pl-2">
            {/* <MyDropDownPicker
              options={[
                { label: "AM", value: "AM" },
                { label: "PM", value: "PM" },
              ]}
              value={meridian}
              darkMode
              setValue={(val) => setMeridian(val as "AM" | "PM")}
            /> */}
          </div>
        </div>

        {/*//! BUTTONS */}
        <div className="wf rcc-4">
          {/* <MyButton label="Cancel" outlined onClick={modal.close} /> */}
          <MyButton label="OK" onClick={setTime} />
        </div>
      </div>
    </MyModal>
  );
};

export default TimePickerModal;
