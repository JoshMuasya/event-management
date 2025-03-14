"use client"

import React, { useState } from 'react'
import GuestTable from './GuestTable';
import { Guest } from '@/types';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

const Invitation = () => {
    const [guests, setGuests] = useState<Guest[]>([]);

    const handleGuestsUpdate = (newGuests: Guest[]) => {
        setGuests(newGuests);
    };

    const handleDelete = async (id: string) => {
        // Add Firestore delete operation
        await deleteDoc(doc(db, "guests", id));
        setGuests(prev => prev.filter(guest => guest.id !== id));
    };

    const handleAdd = () => {
        // Implement your add logic here
        // For example, you might want to open a modal or add a default guest
        const newGuest: Guest = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: "New Guest",
          email: "newguest@example.com",
          phone: "",
          tags: [],
          rsvpStatus: "pending",
          checkInStatus: "pending"
        };
        
        setGuests(prev => [...prev, newGuest]);
        // Save to Firestore
        setDoc(doc(db, "guests", newGuest.id), newGuest);
      };
    
      const handleEdit = async (guest: Guest) => {
        // Update in Firestore
        await setDoc(doc(db, "guests", guest.id), guest, { merge: true });
        // Update local state
        setGuests(prev => prev.map(g => g.id === guest.id ? guest : g));
      };

    return (
        <div>
            <GuestTable
                guests={guests}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onGuestsUpdate={handleGuestsUpdate}
            />
        </div>
    )
}

export default Invitation
