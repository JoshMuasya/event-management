export interface Guest {
    id: number
    name: string
    email: string
    group: string
}

export interface Collaborator {
    id: number
    name: string
}

export type GuestList = {
    id: number;
    name: string;
    email: string;
    phone: string;
    rsvpStatus: "Pending" | "Confirmed" | "Declined";
    menuPreference: string;
    allergens: string;
    relationship: string;
    group: string;
};