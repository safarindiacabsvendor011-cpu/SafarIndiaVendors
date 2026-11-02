export interface BookingTrendPoint {
  date: string;
  label: string; // e.g. "25 Oct", "Mon"
  totalBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  grossAmount: number; // in ₹
  commissionEarned: number; // in ₹
}

export interface MonthlyCommissionPoint {
  month: string; // e.g. "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"
  grossTripVolume: number; // in ₹
  grossCommission: number; // in ₹
  netVendorEarnings: number; // in ₹
  platformFeePaid: number; // 2-3% platform cut
  platinumSavings: number; // 1% saved with Platinum
  completedTrips: number;
}

export interface RouteMetric {
  id: string;
  source: string;
  destination: string;
  distanceKm: number;
  tripsCount: number;
  avgFare: number;
  avgCommission: number;
  growthPercent: number;
  topVehicle: string;
  returnCabDemand: 'High' | 'Medium' | 'Surge';
  suggestedRatePerKm: number;
}

export interface VehicleShareMetric {
  category: string;
  percentage: number;
  totalTrips: number;
  avgTicketSize: number;
  color: string;
}

export interface VendorInsight {
  id: string;
  type: 'opportunity' | 'surge' | 'pricing' | 'savings';
  title: string;
  description: string;
  impact: string;
  actionLabel: string;
  recommendedRoute?: string;
}

// 30 Days Trend Data
export const BOOKING_TRENDS_30D: BookingTrendPoint[] = [
  { date: '2026-10-04', label: '04 Oct', totalBookings: 14, completedBookings: 12, cancelledBookings: 1, grossAmount: 58000, commissionEarned: 8400 },
  { date: '2026-10-07', label: '07 Oct', totalBookings: 18, completedBookings: 16, cancelledBookings: 1, grossAmount: 76000, commissionEarned: 11200 },
  { date: '2026-10-10', label: '10 Oct', totalBookings: 22, completedBookings: 19, cancelledBookings: 2, grossAmount: 94000, commissionEarned: 14600 },
  { date: '2026-10-13', label: '13 Oct', totalBookings: 19, completedBookings: 17, cancelledBookings: 0, grossAmount: 82000, commissionEarned: 12800 },
  { date: '2026-10-16', label: '16 Oct', totalBookings: 25, completedBookings: 23, cancelledBookings: 1, grossAmount: 112000, commissionEarned: 17500 },
  { date: '2026-10-19', label: '19 Oct', totalBookings: 31, completedBookings: 28, cancelledBookings: 2, grossAmount: 142000, commissionEarned: 22400 },
  { date: '2026-10-22', label: '22 Oct', totalBookings: 28, completedBookings: 26, cancelledBookings: 1, grossAmount: 128000, commissionEarned: 19800 },
  { date: '2026-10-25', label: '25 Oct', totalBookings: 36, completedBookings: 33, cancelledBookings: 2, grossAmount: 168000, commissionEarned: 26500 },
  { date: '2026-10-28', label: '28 Oct', totalBookings: 42, completedBookings: 39, cancelledBookings: 1, grossAmount: 196000, commissionEarned: 31200 },
  { date: '2026-10-31', label: '31 Oct', totalBookings: 38, completedBookings: 35, cancelledBookings: 2, grossAmount: 178000, commissionEarned: 28400 },
  { date: '2026-11-02', label: '02 Nov', totalBookings: 45, completedBookings: 41, cancelledBookings: 2, grossAmount: 215000, commissionEarned: 34800 },
];

// 7 Days Trend Data
export const BOOKING_TRENDS_7D: BookingTrendPoint[] = [
  { date: '2026-10-27', label: 'Mon', totalBookings: 32, completedBookings: 30, cancelledBookings: 1, grossAmount: 148000, commissionEarned: 23200 },
  { date: '2026-10-28', label: 'Tue', totalBookings: 35, completedBookings: 32, cancelledBookings: 2, grossAmount: 162000, commissionEarned: 25400 },
  { date: '2026-10-29', label: 'Wed', totalBookings: 29, completedBookings: 27, cancelledBookings: 1, grossAmount: 134000, commissionEarned: 21000 },
  { date: '2026-10-30', label: 'Thu', totalBookings: 38, completedBookings: 35, cancelledBookings: 2, grossAmount: 178000, commissionEarned: 28500 },
  { date: '2026-10-31', label: 'Fri', totalBookings: 46, completedBookings: 43, cancelledBookings: 1, grossAmount: 220000, commissionEarned: 35600 },
  { date: '2026-11-01', label: 'Sat', totalBookings: 52, completedBookings: 49, cancelledBookings: 2, grossAmount: 254000, commissionEarned: 41200 },
  { date: '2026-11-02', label: 'Sun', totalBookings: 48, completedBookings: 45, cancelledBookings: 1, grossAmount: 236000, commissionEarned: 38900 },
];

// Monthly Commission & Revenue Earnings (6 Months)
export const MONTHLY_COMMISSION_DATA: MonthlyCommissionPoint[] = [
  {
    month: 'Jun 2026',
    grossTripVolume: 580000,
    grossCommission: 88000,
    netVendorEarnings: 85360,
    platformFeePaid: 2640,
    platinumSavings: 880,
    completedTrips: 112,
  },
  {
    month: 'Jul 2026',
    grossTripVolume: 690000,
    grossCommission: 104000,
    netVendorEarnings: 100880,
    platformFeePaid: 3120,
    platinumSavings: 1040,
    completedTrips: 138,
  },
  {
    month: 'Aug 2026',
    grossTripVolume: 820000,
    grossCommission: 126000,
    netVendorEarnings: 122220,
    platformFeePaid: 3780,
    platinumSavings: 1260,
    completedTrips: 165,
  },
  {
    month: 'Sep 2026',
    grossTripVolume: 940000,
    grossCommission: 148000,
    netVendorEarnings: 143560,
    platformFeePaid: 4440,
    platinumSavings: 1480,
    completedTrips: 194,
  },
  {
    month: 'Oct 2026',
    grossTripVolume: 1240000,
    grossCommission: 198000,
    netVendorEarnings: 192060,
    platformFeePaid: 5940,
    platinumSavings: 1980,
    completedTrips: 248,
  },
  {
    month: 'Nov 2026 (MTD)',
    grossTripVolume: 490000,
    grossCommission: 79700,
    netVendorEarnings: 77309,
    platformFeePaid: 2391,
    platinumSavings: 797,
    completedTrips: 94,
  },
];

// Popular Intercity Routes
export const POPULAR_ROUTES: RouteMetric[] = [
  {
    id: 'rt-1',
    source: 'Haldwani / Kathgodam',
    destination: 'New Delhi / IGI Airport',
    distanceKm: 285,
    tripsCount: 184,
    avgFare: 4200,
    avgCommission: 680,
    growthPercent: 28.4,
    topVehicle: 'Sedan (Dzire Tour)',
    returnCabDemand: 'Surge',
    suggestedRatePerKm: 13.5,
  },
  {
    id: 'rt-2',
    source: 'Dehradun / Mussoorie',
    destination: 'Delhi NCR',
    distanceKm: 260,
    tripsCount: 156,
    avgFare: 5800,
    avgCommission: 950,
    growthPercent: 22.1,
    topVehicle: 'SUV (Ertiga / Crysta)',
    returnCabDemand: 'High',
    suggestedRatePerKm: 15.0,
  },
  {
    id: 'rt-3',
    source: 'Delhi NCR',
    destination: 'Jaipur (Pink City)',
    distanceKm: 310,
    tripsCount: 142,
    avgFare: 4800,
    avgCommission: 750,
    growthPercent: 18.7,
    topVehicle: 'Sedan',
    returnCabDemand: 'Surge',
    suggestedRatePerKm: 13.0,
  },
  {
    id: 'rt-4',
    source: 'Chandigarh / Mohali',
    destination: 'Shimla / Manali',
    distanceKm: 125,
    tripsCount: 118,
    avgFare: 3600,
    avgCommission: 580,
    growthPercent: 31.5,
    topVehicle: 'Prime SUV (Innova)',
    returnCabDemand: 'Medium',
    suggestedRatePerKm: 16.5,
  },
  {
    id: 'rt-5',
    source: 'Delhi / Noida',
    destination: 'Agra / Mathura',
    distanceKm: 220,
    tripsCount: 104,
    avgFare: 3900,
    avgCommission: 620,
    growthPercent: 14.2,
    topVehicle: 'Sedan',
    returnCabDemand: 'High',
    suggestedRatePerKm: 12.5,
  },
  {
    id: 'rt-6',
    source: 'Haridwar / Rishikesh',
    destination: 'Delhi IGI Airport T3',
    distanceKm: 240,
    tripsCount: 96,
    avgFare: 4400,
    avgCommission: 700,
    growthPercent: 19.8,
    topVehicle: 'Ertiga',
    returnCabDemand: 'High',
    suggestedRatePerKm: 14.0,
  },
];

// Vehicle Category Distribution
export const VEHICLE_DEMAND_SHARE: VehicleShareMetric[] = [
  { category: 'Sedan (Dzire / Etios)', percentage: 46, totalTrips: 432, avgTicketSize: 3950, color: '#f59e0b' },
  { category: 'SUV (Ertiga / Carens)', percentage: 32, totalTrips: 301, avgTicketSize: 5800, color: '#0ea5e9' },
  { category: 'Prime SUV (Innova Crysta)', percentage: 16, totalTrips: 150, avgTicketSize: 7400, color: '#8b5cf6' },
  { category: 'Tempo & Hatchback', percentage: 6, totalTrips: 57, avgTicketSize: 8900, color: '#10b981' },
];

// Actionable Insights for Vendors
export const VENDOR_ACTIONABLE_INSIGHTS: VendorInsight[] = [
  {
    id: 'ins-1',
    type: 'surge',
    title: 'Weekend Kumaon & Garhwal Surge Alert',
    description: 'Demand for Haldwani & Dehradun to Delhi trips spikes by +42% on Sunday afternoons. Publish your available fleet by Saturday night to secure ₹600-₹900 extra commission per duty.',
    impact: '+₹4,200/wk Potential',
    actionLabel: 'Post Khali Gaadi',
    recommendedRoute: 'Haldwani ⟶ New Delhi',
  },
  {
    id: 'ins-2',
    type: 'opportunity',
    title: 'High Return Duty Conversion on Delhi-Jaipur',
    description: '74% of cabs returning from Jaipur travel empty. Over 18 one-way duties are currently posted from Jaipur to Delhi NCR with ₹1,000+ commission payout.',
    impact: 'Save ₹2,800 Fuel Waste',
    actionLabel: 'Browse Jaipur Duties',
    recommendedRoute: 'Jaipur ⟶ Delhi NCR',
  },
  {
    id: 'ins-3',
    type: 'savings',
    title: 'Platinum VIP Membership Escrow Savings',
    description: 'Your 2% discounted platform fee cut has saved you ₹8,380 in mediator deductions over the last 90 days compared to non-subscription vendors.',
    impact: '₹8,380 Net Saved',
    actionLabel: 'View Platinum Benefits',
  },
  {
    id: 'ins-4',
    type: 'pricing',
    title: 'Innova Crysta Hill Rate Calibration',
    description: 'Market bid quotes for Dehradun-Mussoorie-Delhi route have settled at ₹18.5/km. Pricing between ₹6,800 to ₹7,200 yields 94% instant booking acceptance.',
    impact: '94% Acceptance Rate',
    actionLabel: 'Set Alert Filter',
    recommendedRoute: 'Dehradun ⟶ Delhi',
  },
];
