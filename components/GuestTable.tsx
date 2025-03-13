"use client";

import React from "react";
import { motion } from "framer-motion";
import { Guest } from "@/types";

interface GuestTableProps {
  guests: Guest[];
  onAdd: () => void;
  onEdit: (guest: Guest) => void;
  onDelete: (id: string) => void;
}

const GuestTable: React.FC<GuestTableProps> = ({ guests, onAdd, onEdit, onDelete }) => {
  return (
    <div className="bg-glassy p-6 rounded-lg border border-[#FFD700]/30">
      <button onClick={onAdd} className="button-gold mb-4">Add Guest</button>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-white font-lora">
          <thead>
            <tr className="bg-[#FAA722]/20 border-b border-[#FFD700]/30">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => (
              <motion.tr
                key={guest.id}
                whileHover={{ backgroundColor: "rgba(250, 167, 34, 0.1)" }}
                className="border-b border-[#FFD700]/30"
              >
                <td className="p-3">{guest.name}</td>
                <td className="p-3">{guest.email}</td>
                <td className="p-3">
                  <button onClick={() => onEdit(guest)} className="text-[#FFD700] hover:text-white mr-2">Edit</button>
                  <button onClick={() => onDelete(guest.id)} className="text-[#FFD700] hover:text-white">Delete</button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GuestTable;