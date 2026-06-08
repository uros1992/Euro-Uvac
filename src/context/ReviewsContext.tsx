import React, { 
  createContext, useContext, useState, 
  useEffect 
} from 'react';
import { 
  collection, onSnapshot, 
  query, orderBy 
} from 'firebase/firestore';
import { db } from '../firebase';

interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
  dateSr?: string;
  dateEn?: string;
  isoDate?: string;
}

interface ReviewsContextType {
  reviews: Review[];
  loaded: boolean;
}

const ReviewsContext = createContext<ReviewsContextType>({
  reviews: [],
  loaded: false
});

export const useReviews = () => useContext(ReviewsContext);

const formatDate = (timestamp: any) => {
  const date = timestamp ? timestamp.toDate() : new Date();
  const monthsSR = ['Januar','Februar','Mart','April',
    'Maj','Jun','Jul','Avgust','Septembar',
    'Oktobar','Novembar','Decembar'];
  const monthsEN = ['January','February','March',
    'April','May','June','July','August',
    'September','October','November','December'];
  return {
    sr: `${monthsSR[date.getMonth()]} ${date.getFullYear()}.`,
    en: `${monthsEN[date.getMonth()]} ${date.getFullYear()}`,
    iso: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  };
};

export function ReviewsProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, 'reviews'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched: Review[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        const d = formatDate(data.createdAt);
        fetched.push({
          id: doc.id,
          name: data.name,
          text: data.text,
          rating: data.rating,
          dateSr: d.sr,
          dateEn: d.en,
          isoDate: d.iso
        });
      });
      setReviews(fetched);
      setLoaded(true);
    }, (error) => {
      console.error('Reviews fetch error:', error);
      setLoaded(true);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ReviewsContext.Provider value={{ reviews, loaded }}>
      {children}
    </ReviewsContext.Provider>
  );
}
