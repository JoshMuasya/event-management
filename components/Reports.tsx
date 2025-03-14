'use client'

import React from 'react'
import ReportDashboard from './ReportDashboard'

const Reports = () => {

    const handleExport = (format: "pdf" | "excel") => {
        console.log(`Exporting report as ${format}`);
        // Implement actual export logic here
      };

    return (
        <div>
            <ReportDashboard
                onExport={handleExport} />
        </div>
    )
}

export default Reports
