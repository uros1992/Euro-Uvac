import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as fbSignOut } from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// Initialize Firebase services with experimentalForceLongPolling to avoid transport errors in proxy environments
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
}, firebaseConfig.firestoreDatabaseId);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Optional: Configure Google provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    if (error?.code === 'auth/popup-closed-by-user') {
      console.log("Prijava otkazana od strane korisnika.");
      return null;
    }
    
    console.error("Greška pri prijavi sa Google-om:", error);
    
    // U AI Studio iframe okruženju, popupi su nekad blokirani
    if (error?.code === 'auth/popup-blocked' || error?.message?.includes('blocked')) {
      alert("Prozor za prijavu je blokiran. Molimo vas da dozvolite pop-up prozore ili otvorite aplikaciju u novom tabu (ikona u gornjem desnom uglu).");
    } else {
      alert("Došlo je do greške pri prijavi. Preporučujemo da otvorite aplikaciju u novom tabu.");
    }
    
    return null;
  }
};

export const signOut = async () => {
  try {
    await fbSignOut(auth);
  } catch (error) {
    console.error("Error signing out", error);
    throw error;
  }
};
