import { initializeApp } from "firebase/app" // Import Firebase app initialization function
import { getAuth } from "firebase/auth"  // Import Firebase authentication function
import { getFirestore } from "firebase/firestore"  // Import Firestore database function
import { getMessaging, isSupported } from "firebase/messaging"  // Import Firebase messaging functions
import { getStorage } from "firebase/storage" // Import Firebase storage function

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkpo6fkAhebcDU1jiIGu_Ci76mxEMbGq4",
  authDomain: "bp-ai-web.firebaseapp.com",
  projectId: "bp-ai-web",
  storageBucket: "bp-ai-web.firebasestorage.app",
  messagingSenderId: "679756557929",
  appId: "1:679756557929:web:00ad490a25afc949e5fcf8"
};;

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported()
    if (isSupportedBrowser) {
      return getMessaging(app)
    }
    return null
  } catch (err) {
    console.log(err)
    return null
  }
})()
