import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase web configuration is public; it does not grant administrator access.
export const firebaseConfig = {
  apiKey: 'AIzaSyA0dvZ_5lj2ECik-7-hFNblc3NIa5xI3JY',
  authDomain: 'vedant-capital-dbbe8.firebaseapp.com',
  projectId: 'vedant-capital-dbbe8',
  storageBucket: 'vedant-capital-dbbe8.firebasestorage.app',
  messagingSenderId: '219402869756',
  appId: '1:219402869756:web:eeccfba181d3cdeb11b079',
  measurementId: 'G-MS5N75Z87K',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);