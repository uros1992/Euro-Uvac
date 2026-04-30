import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, updateDoc, doc, setDoc, getDoc, where, deleteDoc } from 'firebase/firestore';
import { db, auth, signInWithGoogle } from '../firebase';
import { LogOut, Trash2, CheckCircle2, User, Mail, Phone, Users, Search, ArrowLeft } from 'lucide-react';

export default function AdminDashboard() {
  const [user, setUser] = useState(auth.currentUser);
  const [isAdmin, setIsAdmin] = useState(false);
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (u) => {
      setUser(u);
        if (u) {
        let isAdm = false;
        const userEmail = u.email?.toLowerCase();
        try {
          // Attempt to read admin doc directly
          const adminDoc = await getDoc(doc(db, 'admins', u.uid));
          if (adminDoc.exists()) isAdm = true;
          // Or bootstrap - check case-insensitive
          if (userEmail === 'theman.uros@gmail.com') {
             await setDoc(doc(db, 'admins', u.uid), { email: u.email }, { merge: true });
             isAdm = true;
          }
        } catch(e) {}
        setIsAdmin(isAdm);
        
        let q;
        if (isAdm) {
          q = query(collection(db, 'reservations'));
        } else {
          q = query(collection(db, 'reservations'), where('userId', '==', u.uid));
        }

        const unsubRes = onSnapshot(q, async (snapshot) => {
          const res = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          res.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          
          // Fetch PII in parallel
          const resWithPii = await Promise.all(res.map(async (r: any) => {
            let pii = {};
            if (isAdm || r.userId === u.uid) {
              try {
                 const piiDoc = await getDoc(doc(db, `reservations/${r.id}/details/info`));
                 if (piiDoc.exists()) pii = piiDoc.data();
              } catch(e) {}
            }
            return { ...r, ...pii };
          }));
          
          setReservations(resWithPii);
          setLoading(false);
        }, (err) => {
          console.error("Firestore snapshot error:", err);
          setLoading(false);
        });
        return () => unsubRes();
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (e) {
      // ignore
    }
  };

  const handleCancel = async (id: string) => {
    // window.confirm is blocked inside the AI Studio iframe, so we remove it.
    try {
      if (isAdmin) {
        // Admin deletes entirely from DB
        await deleteDoc(doc(db, `reservations/${id}/details/info`));
        await deleteDoc(doc(db, 'reservations', id));
      } else {
        // Normal user cancels
        await updateDoc(doc(db, 'reservations', id), { status: 'cancelled' });
      }
    } catch (err) {
      console.error("Cancel error:", err);
      // alert is also often blocked in iframes, so we will use console.error
    }
  };

  const handleRestore = async (id: string) => {
      try {
        await updateDoc(doc(db, 'reservations', id), { status: 'confirmed' });
      } catch (err) {
        console.error("Restore error:", err);
        alert("Failed to restore reservation.");
      }
  };

  const getTourTime = (dateStr: string) => {
     // Expected dateStr is a UTC midnight ISO string or similar. We extract YYYY-MM-DD.
     if (!dateStr) return 0;
     const [yyyy, mm, dd] = dateStr.split('T')[0].split('-');
     // Tour operates at 13:00 local time
     return new Date(parseInt(yyyy), parseInt(mm) - 1, parseInt(dd), 13, 0, 0).getTime();
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  if (!user) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6 relative">
        <div className="absolute top-6 left-6 md:top-12 md:left-12">
          <button 
            onClick={() => window.location.hash = ''} 
            className="flex items-center gap-2 text-gray-500 hover:text-uvac-dark font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Site
          </button>
        </div>
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-sm w-full text-center">
          <h2 className="text-2xl font-serif font-bold mb-6">User / Admin Access</h2>
          <button 
            onClick={handleSignIn}
            className="w-full bg-uvac-primary hover:bg-uvac-dark text-white py-3 rounded-xl font-bold transition-colors"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 p-6 md:p-12 relative">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <button 
            onClick={() => window.location.hash = ''} 
            className="flex items-center gap-2 text-gray-500 hover:text-uvac-dark font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Site
          </button>
        </div>
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
          <div>
            <h1 className="text-3xl font-serif font-bold text-uvac-dark">{isAdmin ? "Admin Dashboard" : "My Bookings"}</h1>
            <p className="text-gray-500">{isAdmin ? "Manage all reservations." : "Manage your reservations."}</p>
          </div>
          <button 
            onClick={() => auth.signOut()}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800"
          >
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-sm text-gray-500 uppercase tracking-wider">
                  <th className="p-4 font-bold">Date & Time</th>
                  <th className="p-4 font-bold">Client Details</th>
                  <th className="p-4 font-bold">Seats</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {reservations.map(res => (
                  <tr key={res.id} className="hover:bg-stone-50 transition-colors">
                    <td className="p-4 align-top">
                      <div className="font-bold text-uvac-dark">
                        {new Date(res.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Booked: {new Date(res.createdAt).toLocaleString()}
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="font-bold text-gray-800 flex items-center gap-2"><User className="w-4 h-4 text-gray-400"/> {res.name}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-2 mt-1"><Mail className="w-4 h-4 text-gray-400"/> {res.email}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-2 mt-1"><Phone className="w-4 h-4 text-gray-400"/> {res.phone}</div>
                    </td>
                    <td className="p-4 align-top text-gray-800 font-bold flex items-center gap-2">
                      <Users className="w-4 h-4 text-uvac-primary" />
                      {res.seats.length} guests
                    </td>
                    <td className="p-4 align-top">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${res.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {res.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4 align-top text-right">
                      {res.status === 'confirmed' ? (
                        (isAdmin || getTourTime(res.date) - Date.now() > 24 * 60 * 60 * 1000) ? (
                          <button 
                            onClick={() => handleCancel(res.id)}
                            className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                            title="Cancel Reservation"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        ) : (
                          <span className="text-xs text-gray-400">Cannot cancel <br/>(within 24h)</span>
                        )
                      ) : (
                        isAdmin ? (
                          <button 
                             onClick={() => handleRestore(res.id)}
                             className="text-green-500 hover:bg-green-50 p-2 rounded-lg transition-colors"
                             title="Restore Reservation"
                          >
                             <CheckCircle2 className="w-5 h-5"/>
                          </button>
                        ) : null
                      )}
                    </td>
                  </tr>
                ))}
                {reservations.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">No reservations found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
