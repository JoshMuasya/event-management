"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { collection, onSnapshot, writeBatch, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

// Define the Guest type
interface Guest {
  id?: string;
  name: string;
  number?: string;
  checkInStatus?: string | null;
  checkInTime?: Date | string;
}

// Define the context type
interface GuestContextType {
  guests: Guest[];
  uploadGuests: (newGuests: Guest[]) => Promise<void>;
  loading: boolean;
  checkInGuest: (guestId: string) => Promise<void>;
}

// Create context with undefined default
const GuestContext = createContext<GuestContextType | undefined>(undefined);

export const GuestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);

  // Subscribe to Firestore updates
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "guests"), (snapshot) => {
      const guestsData: Guest[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id || '',
          name: data.name,
          number: data.number,
          checkInStatus: data.checkInStatus,
          // Convert Firestore timestamp/string to Date object if it exists
          checkInTime: data.checkInTime ? new Date(data.checkInTime) : undefined,
        };
      });
      setGuests(guestsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Function to upload a new guest list
  const uploadGuests = async (newGuests: Guest[]) => {
    try {
      const batch = writeBatch(db);
      const guestsRef = collection(db, "guests");

      // Delete all existing guests
      const existingGuestsSnapshot = await getDocs(guestsRef);
      existingGuestsSnapshot.forEach((doc) => batch.delete(doc.ref));

      // Add new guests
      newGuests.forEach((guest) => {
        const guestRef = doc(guestsRef);
        batch.set(guestRef, {
          name: guest.name,
          number: guest.number || null,
          checkInStatus: null,
        });
      });

      await batch.commit();
    } catch (error) {
      console.error("Error uploading guests:", error);
      throw error;
    }
  };

  const checkInGuest = async (guestId: string) => {
    try {
      const guestRef = doc(db, "guests", guestId);
      await updateDoc(guestRef, { checkInStatus: "checked-in" });

      // Update local state optimistically (optional)
      setGuests((prevGuests) =>
        prevGuests.map((guest) =>
          guest.id === guestId ? {
            ...guest,
            checkInStatus: "checked-in",
            checkInTime: new Date()
          } : guest
        )
      );
    } catch (error) {
      console.error("Error checking in guest:", error);
    }
  };


  return (
    <GuestContext.Provider value={{ guests, uploadGuests, checkInGuest, loading }}>
      {children}
    </GuestContext.Provider>
  );
};

// Custom hook to use the GuestContext
export const useGuests = (): GuestContextType => {
  const context = useContext(GuestContext);
  if (!context) {
    throw new Error("useGuests must be used within a GuestProvider");
  }
  return context;
};
