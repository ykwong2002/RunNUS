import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration (replace with your config from Firebase Console)
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
auth.useDeviceLanguage(); // Set auth language to device language
auth.useDeviceLanguage();

// Initialize other Firebase services
const db = getFirestore(app);
const storage = getStorage(app);

// Export the initialized services
export { app, auth, db, storage };
