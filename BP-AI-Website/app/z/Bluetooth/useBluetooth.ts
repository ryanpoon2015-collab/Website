import notify from "@/myfunctions/notify";
import { useEffect, useRef } from "react";
import useLocalStorage from "../../../hooks/useLocalStorage";
import DH from "@/classes/templates/DH";
import { useS } from "../../../hooks/useReactHooks";

export type BluetoothStatus =
  | "disconnected"
  | "connecting"
  | "connected"
  | "error";

export const useBluetooth = (serviceId: string, characteristicId: string) => {
  const [status, setBluetoothStatus] = useS<BluetoothStatus>(
    "disconnected"
  );
  const [
    characteristic,
    setCharacteristic,
  ] = useS<BluetoothRemoteGATTCharacteristic | null>(null);
  const [device, setDevice] = useS<BluetoothDevice | null>(null);
  const [lastUpdate, setLastUpdate] = useLocalStorage("bluetooth_last_update", DH.format());

  // Global lock to prevent overlapping GATT operations
  const gattLock = useRef<boolean>(false);

  const acquireLock = async () => {
    while (gattLock.current) {
      await new Promise(resolve => setTimeout(resolve, 10));
    }
    gattLock.current = true;
  };

  const releaseLock = () => {
    gattLock.current = false;
  };

  const connect = async () => {
    try {
      //! Requires "react-bluetooth" package
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: [serviceId] }],
        // Change this to the service UUID of your BLE device
      });
      console.log("Connected to device:", device.name);
      setDevice(device);

      const server = await device.gatt?.connect();
      console.log("Connected to GATT server:", server);

      // Assuming you want to interact with a specific service and characteristic
      const service = await server?.getPrimaryService(
        serviceId
      );
      console.log("Primary service:", service);

      // Example: Reading a characteristic
      const characteristic = await service?.getCharacteristic(
        characteristicId
      );

      if (!characteristic) {
        console.error("Error: Characteristic not found");
        throw new Error("Characteristic not found");
      }

      setCharacteristic(characteristic);

      // await FH.MyUser.update(myUser, { device_id: deviceId });
      notify("Connected to Device", { type: "success" });
      setBluetoothStatus("connected");
    } catch (error) {
      notify("Failed to connect to Device", { type: "error" });
      console.error("Error connecting to Bluetooth device:", error);
      setBluetoothStatus("error");
    }
  };

  const disconnect = () => {
    if (device && device.gatt?.connected) {
      device.gatt.disconnect();
      notify("Disconnected from Device", { type: "success" });
    } else {
      console.error("No device connected or already disconnected.");
    }
    setBluetoothStatus("disconnected");
    setCharacteristic(null);
    setDevice(null);
  };


  const write = async (data: string) => {
    if (status !== "connected") {
      console.error("Bluetooth device is not connected.");
      return;
    }

    if (characteristic === null) {
      setBluetoothStatus("error");
      console.error("Error Bluetooth write: Characteristic is null.");
      return;
    }

    const encoder = new TextEncoder();
    const dataToSend = encoder.encode(data);

    await acquireLock();
    try {
      await characteristic.writeValue(dataToSend);
    } catch (error) {
      setBluetoothStatus("error");
      console.error("Error writing to Bluetooth characteristic:", error);
      return;
    } finally {
      releaseLock();
    }
    // console.log("Data sent to Bluetooth device:", data);
  };

  const read = async () => {
    if (status !== "connected") {
      console.error("Bluetooth device is not connected.");
      return;
    }

    if (characteristic === null) {
      setBluetoothStatus("error");
      console.error("Error Bluetooth read: Characteristic is null.");
      return;
    }

    let value: DataView | null = null;

    await acquireLock();
    try {
      const value = await characteristic.readValue();
      const decoder = new TextDecoder("utf-8");
      const data = decoder.decode(value);
      if (data === "") {
        console.error("Error: Device data is empty");
      }
      setLastUpdate(DH.format());
      return data;
    } catch (error) {
      setBluetoothStatus("error");
      console.error("Error reading Bluetooth characteristic:", error);
      return;
    } finally {
      releaseLock();
    }
  };

  return { status, connect, write, read, disconnect, lastUpdate };
};
