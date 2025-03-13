'use client'

import React, { useState } from 'react'
import CheckInInterface from './CheckInInterface'
import { Guest } from '@/types';

const CheckIn = () => {
    const [guests, setGuests] = useState<Guest[]>([]);

    return (
        <div>
            <CheckInInterface
                guests={guests}
                onCheckIn={(id) => setGuests(guests.map((g) => (g.id === id ? { ...g, checkInStatus: "checked-in" } : g)))}
            />
        </div>
    )
}

export default CheckIn
