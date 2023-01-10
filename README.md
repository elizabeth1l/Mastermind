## Mastermind

## About

Mastermind is a game where a player tries to guess the number combination created by the computer. At the end of each attempt at guessing the 4 number combination, the computer will provide feedback whether the player had guessed a number correctly, or/and the location of a number correctly. The player must guess the right number combinations within 10 attempts to win the game.

## Getting Started

Download the mobile app onto your desktop. Please have <a href="https://apps.apple.com/us/app/xcode/id497799835?mt=12">Xcode</a> downloaded to experience Mastermind on an iOS simulator or use Expo Go to view directly on mobile.

```
git clone git@github.com:elizabeth1l/Mastermind.git
npm install
```

Create a file called firebase.js and import your Firebase config:

```
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "[FIREBASE INFO HERE]",
  authDomain: "[FIREBASE INFO HERE]",
  projectId: "[FIREBASE INFO HERE]",
  storageBucket: "[FIREBASE INFO HERE]",
  messagingSenderId: "[FIREBASE INFO HERE]",
  appId: "[FIREBASE INFO HERE]",
  measurementId: "[FIREBASE INFO HERE]",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
```

After creating this file, you can start editing or run in your terminal `npm start`. You may download EXPO Go app on your iPhone and scan the QR code to run the app on your phone, or press 'i' to open the iOS simulator through Xcode.
