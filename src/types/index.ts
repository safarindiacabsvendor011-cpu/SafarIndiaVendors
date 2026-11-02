export type TripType = 'One Way' | 'Round Trip' | 'Local' | 'Both' | 'oneway' | 'roundtrip' | 'airport';

export type VehicleCategory = 
  | 'Hatchback'
  | 'Sedan'
  | 'Ertiga'
  | 'SUV'
  | 'INNOVA CRYSTA'
  | 'Tempo Traveller'
  | 'Sedan (Dzire / Etios)'
  | 'SUV (Ertiga / Carens)'
  | 'Prime SUV (Innova Crysta)'
  | 'Tempo Traveller (12-20s)'
  | 'Luxury (Camry / Fortuner)';

export interface Booking {
  id: string; // e.g. "3575348"
  status: 'Open' | 'Assigned' | 'Completed' | 'Expired' | 'Cancelled';
  pickupLocation: string;
  dropLocation: string;
  tripType: 'One Way' | 'Round Trip';
  pickupDate: string; // e.g. "Today @ 11:10 AM" or "Nov 04, 2026 @ 08:00 AM"
  vehicleType: VehicleCategory;
  carImage?: string;
  totalAmount: number; // e.g. 6000
  commission: number; // e.g. 1000
  platformFeePercent: number; // 3%
  extraRequirements: string;
  isSecured: boolean;
  postedBy: {
    id: string;
    name: string;
    phone: string;
    reviewsCount: number;
    rating: number;
  };
  commissionPaidBy?: {
    id: string;
    name: string;
    phone: string;
    paidAt: string;
    amount: number;
  };
  customerDetails?: {
    name: string;
    phone: string;
    pickupAddress: string;
  };
  hasUnlockedContact?: boolean;
  chatId?: string;
}

export interface FreeVehicle {
  id: string;
  driverName: string;
  driverPhone: string;
  vehicleType: VehicleCategory;
  vehicleNumber: string;
  currentLocation: string;
  destinationLocation: string;
  availableDate: string;
  demandedPrice: number;
  seats: number;
  postedAt: string;
  status: 'Available' | 'Booked';
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isCommissionOffer?: boolean;
  commissionAmount?: number;
  isPaid?: boolean;
}

export interface ChatThread {
  id: string;
  bookingId: string;
  bookingTitle: string;
  vehicleType: string;
  tripRoute: string;
  otherPartyName: string;
  otherPartyPhone: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
  type: 'posted' | 'received'; // whether current user posted the booking or bidding
  messages: ChatMessage[];
  commissionAmount: number;
  totalAmount: number;
  isDealConfirmed: boolean;
  isCommissionPaid: boolean;
}

export interface SubscriptionPlan {
  id: 'partner' | 'elite';
  name: string;
  price: number;
  billingPeriod: string;
  features: string[];
  badge: string;
  popular?: boolean;
}

export interface Bid {
  id: string;
  vendorName: string;
  phone: string;
  quote: number;
  note: string;
  timestamp: string;
}

export interface Duty {
  id: string;
  dutyNumber: string;
  tripType: any;
  pickupCity: string;
  pickupLocation: string;
  dropCity: string;
  dropLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnDate?: string;
  vehicleCategory: VehicleCategory;
  customerRate: number;
  vendorRate: number;
  commission: number;
  advanceAmount: number;
  tollTaxIncluded: boolean;
  distanceKm: number;
  operatorName: string;
  operatorPhone: string;
  operatorCity: string;
  operatorRating: number;
  postedAt: string;
  status: 'open' | 'accepted' | 'completed' | 'cancelled';
  bids: Bid[];
  assignedDriver?: {
    name: string;
    phone: string;
    vehicleNumber: string;
  };
  passengerName?: string;
  passengerPhone?: string;
  specialInstructions?: string;
  isUrgent?: boolean;
}

export interface EmptyCar {
  id: string;
  carModel: string;
  vehicleCategory: VehicleCategory;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  currentCity: string;
  destinationCity: string;
  availableDate: string;
  availableTime: string;
  askingPrice: number;
  seatsAvailable: number;
  postedAt: string;
  operatorName: string;
  operatorPhone: string;
  status: 'available' | 'booked';
}

export interface FleetVehicle {
  id: string;
  vehicleNumber: string;
  model: string;
  category: VehicleCategory;
  fuelType: 'CNG' | 'Diesel' | 'Petrol' | 'EV';
  aitpPermit: boolean;
  fitnessExp: string;
  insuranceExp: string;
  status: 'available' | 'on_trip' | 'maintenance';
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  licenseNumber: string;
  experienceYears: number;
  rating: number;
  policeVerified: boolean;
  assignedVehicle: string;
}

export interface VendorPartner {
  id: string;
  companyName: string;
  ownerName: string;
  city: string;
  phone: string;
  whatsapp: string;
  fleetSize: number;
  rating: number;
  tripsCompleted: number;
  verified: boolean;
  specialities: string[];
}

export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  title: string;
  reference: string;
  date: string;
  status: 'success' | 'pending';
}
