export interface Guest {
    id: string;
    name: string;
    email: string;
    phone?: string;
    tags?: string[];
    rsvpStatus?: 'yes' | 'no' | 'maybe' | 'pending';
    checkInStatus?: 'pending' | 'checked-in';
    plusOne?: { name: string; dietary: string };
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

export interface EventData {
    totalRSVPs: number;
    totalAttendees: number;
    peakAttendanceTime: string;
    guestBreakdown: { [category: string]: number };
}

export interface InvitationData {
    eventName: string;
    date: string;
    time: string;
    location: string;
    dressCode: string;
    logoUrl?: string;
    colors: { primary: string; secondary: string };
    message: string;
    imageUrl?: string;
    textColor?: string;
}

export interface ThemeConfig {
    primaryColor?: string;
    secondaryColor?: string;
    fontFamily?: string;
}

export interface InvitationFormProps {
    initialData?: Partial<InvitationData> | null;
    onSave: (data: InvitationData) => void;
    theme?: ThemeConfig;
}

export interface GuestTableProps {
    guests: Guest[];
    onAdd: () => void;
    onEdit: (guest: Guest) => void;
    onDelete: (id: string) => void;
    onGuestsUpdate: (newGuests: Guest[]) => void;
}

export interface RawGuestData {
    id?: string;
    name: string;
    email?: string;
    number?: string | number; // Excel might parse it as a number
    [key: string]: unknown;
}