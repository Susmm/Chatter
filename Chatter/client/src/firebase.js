/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyC8ttcZDV31PGWAGxlickniDYD03gO2tJQ",

  authDomain: "imageupload-96920.firebaseapp.com",

  projectId: "imageupload-96920",

  storageBucket: "imageupload-96920.appspot.com",

  messagingSenderId: "923265846238",

  appId: "1:923265846238:web:5c06ba5611f8df7d18ab4f"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);