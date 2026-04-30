import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as fbSignOut } from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// Initialize Firebase services with experimentalForceLongPolling to avoid transport errors in restricted network environments
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
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
      return null;
    }
    
    console.error("Detaljna greška pri prijavi:", error);
    const errorCode = error?.code || 'nepoznato';
    const errorMessage = error?.message || 'Nema dodatnih informacija';
    
    if (error?.code === 'auth/popup-blocked') {
      alert("Prozor za prijavu je blokiran. Molimo vas da dozvolite pop-up prozore u pretraživaču ili otvorite aplikaciju u novom tabu.");
    } else if (error?.code === 'auth/unauthorized-domain') {
      alert(`Ovaj domen nije ovlašćen u Firebase konzoli. Greška: ${errorCode}`);
    } else {
      alert(`Greška pri prijavi: ${errorCode}\n\nPoruka: ${errorMessage}\n\nPreporuka: Otvorite aplikaciju u novom tabu koristeći ikonicu u gornjem desnom uglu.`);
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
