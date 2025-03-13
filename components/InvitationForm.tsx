"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import html2canvas from "html2canvas";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { InvitationData } from "@/types";
import { storage } from "@/firebase/firebase";

interface InvitationFormProps {
  initialData?: Partial<InvitationData>;
  onSave: (data: InvitationData) => void;
}

const InvitationForm: React.FC<InvitationFormProps> = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState<InvitationData>({
    eventName: initialData?.eventName || "",
    date: initialData?.date || "",
    time: initialData?.time || "",
    location: initialData?.location || "",
    dressCode: initialData?.dressCode || "",
    logoUrl: initialData?.logoUrl || "",
    colors: initialData?.colors || { primary: "#6A0DAD", secondary: "#FFD700" },
    message: initialData?.message || "",
    textColor: initialData?.textColor || "#ffffff",
  });
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const dataURLtoBlob = (dataUrl: string) => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const handleSave = async () => {
    if (previewRef.current) {
      try {
        const canvas = await html2canvas(previewRef.current);
        const dataUrl = canvas.toDataURL("image/png");
        const blob = dataURLtoBlob(dataUrl);
        const storageRef = ref(storage, `invitations/${Date.now()}.png`);
        await uploadBytes(storageRef, blob);
        const downloadUrl = await getDownloadURL(storageRef);
        onSave({ ...formData, imageUrl: downloadUrl });
      } catch (error) {
        console.error("Error saving design:", error);
      }
    }
  };

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  useEffect(() => {
    return () => {
      if (backgroundImageUrl) {
        URL.revokeObjectURL(backgroundImageUrl);
      }
    };
  }, [backgroundImageUrl]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Form Section */}
      <div className="bg-[#6A0DAD]/80 backdrop-blur-lg p-6 rounded-xl border border-[#FFD700]/40 shadow-lg">
        <h2 className="text-2xl font-playfair text-[#FFD700] mb-4">Design Invitation</h2>
        <form className="space-y-4">
          <input
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            placeholder="Event Name"
            className="w-full p-3 bg-[#3B0073] text-white border border-[#FFD700] rounded-lg focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/50 font-lora placeholder-gray-300"
          />
          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-3 bg-[#3B0073] text-white border border-[#FFD700] rounded-lg focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/50 font-lora"
          />
          <input
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full p-3 bg-[#3B0073] text-white border border-[#FFD700] rounded-lg focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/50 font-lora"
          />
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-3 bg-[#3B0073] text-white border border-[#FFD700] rounded-lg focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/50 font-lora placeholder-gray-300"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            className="w-full p-3 bg-[#3B0073] text-white border border-[#FFD700] rounded-lg focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/50 font-lora h-32 placeholder-gray-300"
          />
          <div className="flex space-x-4">
            <div>
              <label className="text-white font-lora">Primary Color</label>
              <input
                type="color"
                value={formData.colors.primary}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    colors: { ...formData.colors, primary: e.target.value },
                  })
                }
                className="w-full h-10"
              />
            </div>
            <div>
              <label className="text-white font-lora">Secondary Color</label>
              <input
                type="color"
                value={formData.colors.secondary}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    colors: { ...formData.colors, secondary: e.target.value },
                  })
                }
                className="w-full h-10"
              />
            </div>
          </div>
          <div>
            <label className="text-white font-lora">Background Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  if (backgroundImageUrl) {
                    URL.revokeObjectURL(backgroundImageUrl);
                  }
                  const url = URL.createObjectURL(file);
                  setBackgroundImageUrl(url);
                }
              }}
              className="w-full p-3 bg-[#3B0073] text-white border border-[#FFD700] rounded-lg"
            />
          </div>
          <div>
            <label className="text-white font-lora">Text Color</label>
            <input
              type="color"
              value={formData.textColor}
              onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
              className="w-full h-10"
            />
          </div>
          <button
            type="button"
            onClick={handleSave}
            className="w-full py-3 bg-[#FFD700] text-[#3B0073] font-bold rounded-lg shadow-lg hover:bg-[#e6c200] transition"
          >
            Save Design
          </button>
        </form>
      </div>

      {/* Preview Section */}
      <div>
        <h2 className="text-2xl font-playfair text-[#FFD700] mb-4">Preview</h2>
        <motion.div
          ref={previewRef}
          key={JSON.stringify(formData)}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="p-6 rounded-xl border border-[#FFD700]/40 shadow-lg"
          style={{
            background: backgroundImageUrl
              ? `linear-gradient(135deg, ${hexToRgba(formData.colors.primary, 0.7)}, ${hexToRgba(formData.colors.secondary, 0.7)}), url(${backgroundImageUrl}) center/cover no-repeat`
              : `linear-gradient(135deg, ${formData.colors.primary}, ${formData.colors.secondary})`,
          }}
        >
          {formData.logoUrl && (
            <Image
              src={formData.logoUrl}
              alt="Logo"
              height={100}
              width={100}
              className="mb-4 mx-auto w-24 h-24 object-contain"
            />
          )}
          <h3
            className="text-3xl font-playfair"
            style={{ color: formData.textColor }}
          >
            {formData.eventName}
          </h3>
          <p className="font-lora" style={{ color: formData.textColor }}>
            📅 Date: {formData.date}
          </p>
          <p className="font-lora" style={{ color: formData.textColor }}>
            ⏰ Time: {formData.time}
          </p>
          <p className="font-lora" style={{ color: formData.textColor }}>
            📍 Location: {formData.location}
          </p>
          <p className="mt-4 font-lora" style={{ color: formData.textColor }}>
            {formData.message}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default InvitationForm;