"use client";

import React, { useState } from "react";

interface ThankYouFormProps {
  initialMessage?: string;
  onSave: (message: string) => void;
  onSend: () => void;
}

const ThankYouForm: React.FC<ThankYouFormProps> = ({ initialMessage, onSave, onSend }) => {
  const [message, setMessage] = useState(initialMessage || "");

  return (
    <div className="bg-glassy p-6 rounded-lg border border-[#FFD700]/30">
      <h2 className="text-2xl font-playfair text-white mb-4" style={{ textShadow: "2px 2px 4px #FAA722" }}>
        Thank You Note
      </h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your thank you message"
        className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded focus:border-[#FAA722] focus:ring-2 focus:ring-[#FAA722]/50 font-lora h-32 mb-4"
      />
      <div className="flex gap-4">
        <button onClick={() => onSave(message)} className="button-gold">Save</button>
        <button onClick={onSend} className="button-gold">Send</button>
      </div>
    </div>
  );
};

export default ThankYouForm;