import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyA7dV3FVeebsvOOvY2qn0r26x_TZQA3w7I',
  authDomain: 'iwamad-chat-22ebd.firebaseapp.com',
  databaseURL: 'https://iwamad-chat-22ebd-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'iwamad-chat-22ebd',
  storageBucket: 'iwamad-chat-22ebd.firebasestorage.app',
  messagingSenderId: '35964696192',
  appId: '1:35964696192:web:dcc8ac6729061b14171865',
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
