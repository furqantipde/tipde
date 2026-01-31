import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration from Firebase Console
// Project: tipde-ai
const firebaseConfig = {
    apiKey: "AIzaSyAQdEtjDgbt72iO8QhRkdw1BlXFKSEiB-c",
    authDomain: "tipde-ai.firebaseapp.com",
    projectId: "tipde-ai",
    storageBucket: "tipde-ai.firebasestorage.app",
    messagingSenderId: "661823794891",
    appId: "1:661823794891:web:37ef083cd5ee58b7f7354e",
    measurementId: "G-YL58EP5JBC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
export default app;
