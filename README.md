## Mastermind

<div style = 'display:flex'>
<img src= 'https://github.com/elizabeth1l/Mastermind/blob/main/images/login.png' width="250" height ='400'>
<img src = 'https://github.com/elizabeth1l/Mastermind/blob/main/images/home.png' width="250" height ='400'>
<img src = 'https://github.com/elizabeth1l/Mastermind/blob/main/images/game2.png' width="250" height ='400'>

## About

Mastermind is a game where a player tries to guess the four-digit combination created by the computer. At the end of each attempt at guessing the four-digit combination, the computer will provide feedback whether the player had guessed a number correctly, or/and the location of a number correctly. The player must guess the right number combinations within 10 attempts to win the game.

## Getting Started

**Prerequisites**

- Please have <a href="https://apps.apple.com/us/app/xcode/id497799835?mt=12">Xcode</a> downloaded to experience Mastermind on an iOS simulator or download Expo Go through the App Store to view directly on mobile.

- Please have npm installed.

```
npm install npm@latest -g
```

**Installation**

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

After creating this file, you can start editing or run in your terminal `npm start`. You may download Expo Go app through the App Store on your iPhone and scan the QR code to run the app on your phone, or type 'i' to open the iOS simulator through Xcode.

## How to Play

1. Sign up, or log in if you have previously registered with an email and password.
2. Navigate using the bottom tabs. To start the game, click on the tab labeled 'Play'.
3. In the input boxes, type numbers ranging from 0-7. If an alphabetical character or number greater than 7 is typed, an error will appear on the device and you will be prompted to re-enter a number. Click on 'Go' once all four input boxes are filled. You can use the countdown to keep track of how many tries you have left.
4. If you're in a need of a hint, feel free to hit the "Hint" button at anytime. The game will return a random number that exists among the four-digit number. You will not know how many or where the position of the number lies, only that there is at least one somewhere in the four-digit number.
5. Each time a guess is made, the total number of points you can win reduces by 10. Once you've guessed the correct four-digit number, an alert will appear on the device notifying you how many points you have been awarded. Close out of the alert and head to your home page to see your new total. If you would like to play again, return to the 'Play' screen and hit 'Restart'.
