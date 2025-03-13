'use client'

import React from 'react'
import ReportDashboard from './ReportDashboard'
import { EventData } from '@/types';

const Reports = () => {
    const sampleEventData: EventData = {
        totalRSVPs: 100, totalAttendees: 80, peakAttendanceTime: "7:00 PM",
        guestBreakdown: {}
    };

    return (
        <div>
            <ReportDashboard
                data={sampleEventData}
                onExport={(format) => console.log(`Export ${format}`)} />
        </div>
    )
}

export default Reports
