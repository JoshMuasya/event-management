"use client"

import React from 'react'
import GuestTable from './GuestTable';
import { useGuests } from '@/lib/GuestContext';
import LoadingPage from './Loading';

const Invitation = () => {  
    const { loading } = useGuests()

    if (loading) {
        return <LoadingPage />
    }

    return <GuestTable />
}

export default Invitation
