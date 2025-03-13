"use client"

import InvitationForm from '@/components/InvitationForm'
import React from 'react'

const page = () => {
  return (
    <div>
      <InvitationForm onSave={(data) => console.log(data)} />
    </div>
  )
}

export default page
