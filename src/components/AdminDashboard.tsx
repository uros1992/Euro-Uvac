import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db, auth, signInWithGoogle } from '../firebase';
import { supabase } from '../supabase';
import { LogOut, Trash2, CheckCircle2, User, Mail, Phone, Users, Search, ArrowLeft } from 'lucide-react';

export default function AdminDashboard() {
  const [user, setUser] = useState(auth.currentUser);
  const [isAdmin, setIsAdmin] = useState(false);
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let activeChannel: any = null;

    const fetchReservations = async (u: any, isAdm: boolean) => {
      try {
        let queryBuilder = supabase.from('bookings').select('*');
        if (!isAdm) {
          if (u.email) {
            queryBuilder = queryBuilder.ilike('email', u.email);
          } else {
            queryBuilder = queryBuilder.eq('email', 'null');
          }
        }

        const { data, error } = await queryBuilder;
        if (error) {
          console.error("Error fetching bookings from Supabase:", error);
          setReservations([]);
        } else if (data) {
          const mapped = data.map((b: any) => ({
            id: String(b.id),
            date: b.booking_date,
            createdAt: b.created_at,
            name: b.name,
            email: b.email,
            phone: b.phone,
            seats: Array(parseInt(b.guest_count) || 0).fill(''),
            status: 'confirmed',
            message: b.message
          }));

          mapped.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setReservations(mapped);
        }
      } catch (err) {
        console.error("Fetch reservations error:", err);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged(async (u) => {
      setUser(u);
      if (u) {
        setLoading(true);
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
        
        await fetchReservations(u, isAdm);

        // Subscribe to real-time table modifications
        activeChannel = supabase
          .channel('schema-db-changes')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'bookings' },
            () => {
              fetchReservations(u, isAdm);
            }
          )
          .subscribe();
      } else {
        setReservations([]);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
      if (activeChannel) {
        supabase.removeChannel(activeChannel);
      }
    };
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
      // Deletes completely from Supabase bookings table to represent cancellation/freeing up seats
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }
    } catch (err) {
      console.error("Cancel error:", err);
    }
  };

  const handleRestore = async (id: string) => {
    console.log("Restore not applicable for deleted database record:", id);
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
            onClick={() => window.location.href = '/'} 
            className="flex items-center gap-2 text-gray-500 hover:text-uvac-dark font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Site
          </button>
        </div>
        <div className="bg-white p-10 rounded-xl shadow-xl max-w-sm w-full text-center">
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
            onClick={() => window.location.href = '/'} 
            className="flex items-center gap-2 text-gray-500 hover:text-uvac-dark font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Site
          </button>
        </div>
        <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-stone-100">
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

        <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
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
                      {(res.seats?.length || 0)} guests
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
