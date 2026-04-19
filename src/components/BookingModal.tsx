import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar as CalendarIcon, Users, User, CheckCircle2, ChevronLeft, ChevronRight, CreditCard, LogOut } from 'lucide-react';
import { collection, query, onSnapshot, doc, setDoc, writeBatch } from 'firebase/firestore';
import { db, auth, signInWithGoogle } from '../firebase';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'sr' | 'en';
}

const translations = {
  en: {
    title: "Book Your Adventure",
    step1: "When would you like to join us?",
    step2: "How many spots do you need?",
    step3: "Who should we book this for?",
    step4: "Let's review your booking.",
    availHigh: "Available",
    availMed: "Limited",
    availLow: "Sold Out / Closed",
    spotsLeft: "spots remaining",
    continue: "Continue",
    back: "Back",
    name: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    summary: "Booking Summary",
    date: "Date",
    guests: "Guests",
    total: "Total Price",
    confirmBtn: "Confirm Booking",
    successTitle: "Booking Confirmed!",
    successMsg: "We can't wait to see you. A confirmation email has been sent with all the details.",
    close: "Close",
    mo: "Mo", tu: "Tu", we: "We", th: "Th", fr: "Fr", sa: "Sa", su: "Su",
    seatAvailable: "Available",
    seatSelected: "Selected",
    seatTaken: "Taken",
    pricePerPerson: 35
  },
  sr: {
    title: "Rezervišite vašu avanturu",
    step1: "Kada biste želeli da nam se pridružite?",
    step2: "Koliko mesta vam je potrebno?",
    step3: "Na koga da vodimo rezervaciju?",
    step4: "Pregled vaše rezervacije.",
    availHigh: "Slobodno",
    availMed: "Ograničeno",
    availLow: "Rasprodato / Zatvoreno",
    spotsLeft: "slobodnih mesta",
    continue: "Nastavi",
    back: "Nazad",
    name: "Ime i prezime",
    email: "Email adresa",
    phone: "Broj telefona",
    summary: "Detalji rezervacije",
    date: "Datum",
    guests: "Broj osoba",
    total: "Ukupna cena",
    confirmBtn: "Potvrdi rezervaciju",
    successTitle: "Rezervacija potvrđena!",
    successMsg: "Jedva čekamo da vas ugostimo. Poslali smo vam email sa svim detaljima.",
    close: "Zatvori",
    mo: "Po", tu: "Ut", we: "Sr", th: "Če", fr: "Pe", sa: "Su", su: "Ne",
    seatAvailable: "Slobodno",
    seatSelected: "Izabrano",
    seatTaken: "Zauzeto",
    pricePerPerson: 35
  }
};

export default function BookingModal({ isOpen, onClose, lang }: BookingModalProps) {
  const t = translations[lang];
  
  const [step, setStep] = useState(1);
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedFullDate, setSelectedFullDate] = useState<Date | null>(null);
  const [selectedDateAvail, setSelectedDateAvail] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', emailPreviewUrl: '' });
  
  const [user, setUser] = useState(auth.currentUser);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservations, setReservations] = useState<any[]>([]);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(u => setUser(u));
    return () => unsub();
  }, []);

  // Fetch all confirmed reservations to compute availability
  useEffect(() => {
    const q = query(collection(db, 'reservations'));
    const unsub = onSnapshot(q, (snapshot) => {
      const res = snapshot.docs.map(doc => doc.data()).filter(d => d.status === 'confirmed');
      setReservations(res);
    }, (err) => {
      // Quietly ignore permissions error if rule hasn't updated yet
    });
    return () => unsub();
  }, []);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      
      // If current date is out of season (Jan-Apr), default view to May 1st
      const today = new Date();
      if (today.getMonth() < 4) {
        setViewDate(new Date(today.getFullYear(), 4, 1));
      } else if (today.getMonth() > 9) {
        // If current date is Nov-Dec, default view to May 1st of next year
        setViewDate(new Date(today.getFullYear() + 1, 4, 1));
      } else {
        setViewDate(today);
      }
      
      setSelectedFullDate(null);
      setSelectedDateAvail(0);
      setSelectedSeats([]);
      setFormData({ name: '', email: '', phone: '', emailPreviewUrl: '' });
    }
  }, [isOpen]);

  // Calendar Logic
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Monday start

  // Availability Logic
  const availability = useMemo(() => {
    const map: Record<number, number> = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      const dayOfWeek = currentDate.getDay(); // 0 is Sunday, 1 is Monday
      
      const dayIso = new Date(Date.UTC(year, month, i)).toISOString().split('T')[0];
      const dayBookings = reservations.filter(r => r.date.startsWith(dayIso));
      const bookedSeatsCount = dayBookings.reduce((sum, r) => sum + r.seats.length, 0);
      
      if (currentDate < today) {
        map[i] = 0; // Past days
      } else if (month < 4 || month > 9) {
        map[i] = 0; // Out of season (Jan-Apr, Nov-Dec)
      } else if (dayOfWeek === 1) {
        map[i] = 0; // Mondays are closed
      } else {
        map[i] = Math.max(0, 12 - bookedSeatsCount); // Available seats calculation
      }
    }
    return map;
  }, [year, month, daysInMonth, reservations]);

  const handlePrevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const handleDateSelect = (day: number) => {
    if (availability[day] > 0) {
      setSelectedFullDate(new Date(year, month, day));
      setSelectedDateAvail(availability[day]);
      setSelectedSeats([]); // Reset seats
      setStep(2);
    }
  };

  const handleSeatToggle = (seatIndex: number) => {
    if (selectedSeats.includes(seatIndex)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatIndex));
    } else {
      setSelectedSeats([...selectedSeats, seatIndex]);
    }
  };

  const submitBooking = async () => {
    if (!selectedFullDate) return;
    setIsSubmitting(true);
    let currentUser = user;
    if (!currentUser) {
      try {
        currentUser = await signInWithGoogle();
        setUser(currentUser);
      } catch (err) {
        console.error(err);
        setIsSubmitting(false);
        return; // User aborted login
      }
    }
    
    try {
      const reservationId = Date.now().toString() + Math.floor(Math.random() * 1000);
      
      const newReservation = {
        userId: currentUser?.uid,
        date: new Date(Date.UTC(selectedFullDate.getFullYear(), selectedFullDate.getMonth(), selectedFullDate.getDate())).toISOString(),
        seats: selectedSeats,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };
      
      const batch = writeBatch(db);
      batch.set(doc(db, 'reservations', reservationId), newReservation);
      batch.set(doc(db, `reservations/${reservationId}/details/info`), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      });
      
      await batch.commit();
      
      try {
         const resp = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: formData.email,
              name: formData.name,
              date: newReservation.date,
              seats: selectedSeats.length
            })
         });
         const data = await resp.json();
         if (data.success && data.previewUrl) {
            // we attach it directly onto the form data to show in step 5
            setFormData(prev => ({ ...prev, emailPreviewUrl: data.previewUrl }));
         }
      } catch(e) {
         console.error("Email send failed:", e);
      }
      
      setIsSubmitting(false);
      handleNext(); // Move to success step
    } catch(err) {
      console.error("Error creating reservation:", err);
      alert("There was an error securing your reservation. Please try again or contact us.");
      setIsSubmitting(false);
    }
  };

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white z-10">
          <div className="flex items-center gap-3">
            {step > 1 && step < 5 && (
              <button onClick={handleBack} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
            )}
            <h3 className="font-serif font-bold text-lg text-uvac-dark">{t.title}</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: DATE SELECTION */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-uvac-primary/10 p-3 rounded-full">
                    <CalendarIcon className="w-6 h-6 text-uvac-primary" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800">{t.step1}</h4>
                </div>

                {/* Calendar Grid */}
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                      <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <div className="text-center font-bold text-gray-700 capitalize">
                      {viewDate.toLocaleString(lang === 'sr' ? 'sr-RS' : 'en-US', { month: 'long', year: 'numeric' })}
                    </div>
                    <button onClick={handleNextMonth} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1 mb-2 text-center text-xs font-semibold text-gray-400">
                    <div>{t.mo}</div><div>{t.tu}</div><div>{t.we}</div><div>{t.th}</div><div>{t.fr}</div><div>{t.sa}</div><div>{t.su}</div>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: startOffset }).map((_, i) => (
                      <div key={`empty-${i}`} className="h-10" />
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1;
                      const avail = availability[day];
                      const isSoldOut = avail === 0;
                      const isLimited = avail > 0 && avail < 12;
                      
                      return (
                        <button
                          key={day}
                          disabled={isSoldOut}
                          onClick={() => handleDateSelect(day)}
                          className={`
                            relative h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all
                            ${isSoldOut ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-uvac-primary/10 hover:text-uvac-primary'}
                            ${!isSoldOut ? 'text-gray-700 bg-white shadow-sm border border-gray-100' : ''}
                          `}
                        >
                          {day}
                          {!isSoldOut && (
                            <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${isLimited ? 'bg-yellow-400' : 'bg-green-500'}`} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Legend */}
                <div className="flex justify-center gap-4 mt-6 text-xs text-gray-500">
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" /> {t.availHigh}</div>
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-400" /> {t.availMed}</div>
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-300" /> {t.availLow}</div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: SEAT SELECTION */}
            {step === 2 && selectedFullDate && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-uvac-primary/10 p-3 rounded-full">
                    <Users className="w-6 h-6 text-uvac-primary" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800">{t.step2}</h4>
                </div>
                
                <p className="text-sm text-gray-500 mb-6 ml-12">
                  {selectedDateAvail} {t.spotsLeft}
                </p>

                {/* Seat Grid */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <div className="grid grid-cols-3 gap-4">
                    {Array.from({ length: 12 }).map((_, i) => {
                      const isTaken = i >= selectedDateAvail;
                      const isSelected = selectedSeats.includes(i);
                      
                      return (
                        <button
                          key={i}
                          disabled={isTaken}
                          onClick={() => handleSeatToggle(i)}
                          className={`
                            relative aspect-square rounded-xl flex flex-col items-center justify-center gap-1 transition-all
                            ${isTaken ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50' : 
                              isSelected ? 'bg-uvac-primary text-white shadow-md transform scale-105' : 
                              'bg-white text-gray-600 border-2 border-gray-200 hover:border-uvac-primary/50 hover:bg-uvac-primary/5'}
                          `}
                        >
                          <User className={`w-6 h-6 ${isSelected ? 'text-white' : isTaken ? 'text-gray-400' : 'text-uvac-primary'}`} />
                          <span className="text-[10px] font-bold uppercase tracking-wider">
                            {isTaken ? t.seatTaken : isSelected ? t.seatSelected : t.seatAvailable}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8">
                  <button 
                    disabled={selectedSeats.length === 0}
                    onClick={handleNext}
                    className="w-full bg-uvac-accent hover:bg-[#c49363] disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg"
                  >
                    {t.continue} ({selectedSeats.length})
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: USER DETAILS */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-uvac-primary/10 p-3 rounded-full">
                    <User className="w-6 h-6 text-uvac-primary" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800">{t.step3}</h4>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.name}</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-uvac-primary focus:border-transparent outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.email}</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-uvac-primary focus:border-transparent outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.phone}</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-uvac-primary focus:border-transparent outline-none transition-all"
                      placeholder="+381 60 123 4567"
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <button 
                    disabled={!formData.name || !formData.email || !formData.phone}
                    onClick={handleNext}
                    className="w-full bg-uvac-accent hover:bg-[#c49363] disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg"
                  >
                    {t.continue}
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: SUMMARY & CONFIRM */}
            {step === 4 && selectedFullDate && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-uvac-primary/10 p-3 rounded-full">
                    <CreditCard className="w-6 h-6 text-uvac-primary" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800">{t.step4}</h4>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-4">
                  <h5 className="font-bold text-uvac-dark border-b border-gray-200 pb-2 mb-4">{t.summary}</h5>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">{t.date}</span>
                    <span className="font-semibold text-gray-800 capitalize">
                      {selectedFullDate.toLocaleDateString(lang === 'sr' ? 'sr-RS' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">{t.guests}</span>
                    <span className="font-semibold text-gray-800">{selectedSeats.length}</span>
                  </div>
                </div>

                <div className="mt-8">
                  <button 
                    disabled={isSubmitting}
                    onClick={submitBooking}
                    className="w-full bg-uvac-primary hover:bg-uvac-dark disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Processing...' : <>{t.confirmBtn} <CheckCircle2 className="w-5 h-5" /></>}
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: SUCCESS */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-8"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h4 className="text-2xl font-serif font-bold text-gray-800 mb-4">{t.successTitle}</h4>
                <p className="text-gray-600 mb-4">{t.successMsg}</p>
                
                {formData.emailPreviewUrl && (
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-8 w-full block">
                    <p className="text-sm text-blue-800 mb-2"><strong>Development Mode:</strong> A test confirmation email was generated.</p>
                    <a 
                      href={formData.emailPreviewUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 underline font-semibold text-sm break-all"
                    >
                      View Live Email Preview ↗
                    </a>
                  </div>
                )}
                
                <button 
                  onClick={onClose}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-4 rounded-xl font-bold text-lg transition-all"
                >
                  {t.close}
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
