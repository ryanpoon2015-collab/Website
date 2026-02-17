importScripts(
    'https://www.gstatic.com/firebasejs/9.18.0/firebase-app-compat.js' // Import Firebase app compatibility library
  );
  importScripts(
    'https://www.gstatic.com/firebasejs/9.18.0/firebase-messaging-compat.js' // Import Firebase messaging compatibility library
  );
  
  var FIREBASE_CONFIG = {
    apiKey: "AIzaSyDrTfIqyWC5O0SW6U1l4R6gHQkrKpXMWz4",
    authDomain: "current-voltage-reader.firebaseapp.com",
    projectId: "current-voltage-reader",
    storageBucket: "current-voltage-reader.appspot.com",
    messagingSenderId: "535798972221",
    appId: "1:535798972221:web:0bfa14925da4f488768f54",
  };
  
  // Initialize Firebase
  firebase.initializeApp(FIREBASE_CONFIG);  // Initialize Firebase app with config
  const messaging = firebase.messaging();  // Initialize Firebase messaging

  // console log if received messge
    messaging.onMessage((payload) => {
        console.log('Message received. ', payload);
    });