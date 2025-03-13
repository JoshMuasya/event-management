"use client"

import React from 'react'
import ThankYouForm from './ThankYouForm'

const ThankYou = () => {
  return (
    <div>
      <ThankYouForm 
      onSave={(msg) => console.log(msg)} onSend={() => console.log("Sent")} />
    </div>
  )
}

export default ThankYou
