import { messaging } from "@/app/firebase";
import FH from "@/classes/FH";
import { User } from "firebase/auth";
import { MessagePayload, getToken, onMessage } from "firebase/messaging";
import { createContext, useContext, useEffect, useState } from "react";
import { Config } from "@/classes/Constants";
import { FCMTokenContext } from "@/app/templates/FCM_Wrapper";

export function useFCM(
  user: User | null,
  foregroundCallaback: (payload: MessagePayload) => any
) {
  const [notifToken, setNotifToken] = useState("");

  useEffect(() => {
    if (!user) return;

    requestPermission();
    requestForToken(setNotifToken);
    onMessageListenerForeground((payload) => {
      console.log("Message received. ", payload);
      foregroundCallaback(payload);
    });
  }, [user]);

  return notifToken;
}

const onMessageListenerForeground = async (
  callback: (payload: MessagePayload) => any
) =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve = await messaging;
      if (!messagingResolve) return;
      console.log("Listening for messages");
      onMessage(messagingResolve, (payload) => {
        callback(payload);
        resolve(payload);
      });
    })()
  );

const requestForToken = async (callback: (token: string) => any) => {
  try {
    if (!Config.hasFCM) return;
    const messagingResolve = await messaging;
    if (!messagingResolve) return;

    const currentToken = await getToken(messagingResolve, {
      vapidKey: Config.vapidKey,
    });
    if (currentToken) {
      console.log("Token: ", currentToken);
      // subscribeTokenToTopic(currentToken);
      callback(currentToken);
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
    }
  } catch (err) {
    console.log("An error occurred while retrieving token. ", err);
  }
};

function requestPermission() {
  console.log("Requesting permission...");
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications.");
    return;
  }

  Notification?.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      // new Notification("Thanks for granting permission!");

      // TODO(developer): Retrieve an Instance ID token for use with FCM.
      // ...
    }
  });
}
