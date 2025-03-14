"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { collection, onSnapshot, writeBatch, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

// Define the Guest type
interface Guest {
  id?: string;
  name: string;
  number?: string | null;
  checkInStatus?: string | null;
  checkInTime?: string; // Store as ISO string in Firestore
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
          id: doc.id || "",
          name: data.name,
          number: data.number,
          checkInStatus: data.checkInStatus,
          // Handle Firestore timestamp or string
          checkInTime: data.checkInTime || undefined, // Keep as string for consistency
        };
      });
      setGuests(guestsData);
      setLoading(false);
    }, (error) => {
      console.error("Error in snapshot listener:", error);
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
      const checkInTime = new Date().toISOString(); // Store as ISO string

      // Update Firestore with both status and time
      await updateDoc(guestRef, {
        checkInStatus: "checked-in",
        checkInTime: checkInTime,
      });

      // Update local state optimistically
      setGuests((prevGuests) =>
        prevGuests.map((guest) =>
          guest.id === guestId
            ? {
                ...guest,
                checkInStatus: "checked-in",
                checkInTime: checkInTime, // Keep as string
              }
            : guest
        )
      );
    } catch (error) {
      console.error("Error checking in guest:", error);
      throw error; // Optionally rethrow to handle in UI
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