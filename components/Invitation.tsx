"use client"

import React, { useState } from 'react'
import GuestTable from './GuestTable';
import { Guest } from '@/types';

const Invitation = () => {
    const [guests, setGuests] = useState<Guest[]>([]);

    return (
        <div>
            <GuestTable
                guests={guests}
                onAdd={() => console.log("Add")}
                onEdit={(guest) => console.log(guest)}
                onDelete={(id) => setGuests(guests.filter((g) => g.id !== id))}
            />
        </div>
    )
}

export default Invitation
