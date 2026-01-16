import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDlBOx2tZlwrYmRMqyI-_ns7dUG6NrN_10',
  authDomain: 'bus-ticket-6a893.firebaseapp.com',
  projectId: 'bus-ticket-6a893',
  storageBucket: 'bus-ticket-6a893.firebasestorage.app',
  messagingSenderId: '132648173090',
  appId: '1:132648173090:web:13d30e5f2449335d36d47b',
  measurementId: 'G-1V9WSB1PK0'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };