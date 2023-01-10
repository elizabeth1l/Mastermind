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

const config = {
  FIREBASE_API_KEY: "[FIREBASE INFO HERE]",
  FIREBASE_AUTH_DOMAIN: "[FIREBASE INFO HERE]",
  FIREBASE_PROJECT_ID: "[FIREBASE INFO HERE]",
  FIREBASE_STORAGE_BUCKET: "[FIREBASE INFO HERE]",
  FIREBASE_MESSAGING_SENDER_ID: "[FIREBASE INFO HERE]",
  FIREBASE_APP_ID: "[FIREBASE INFO HERE]",
  FIREBASE_MEASUREMENT_ID: "[FIREBASE INFO HERE]"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
```
