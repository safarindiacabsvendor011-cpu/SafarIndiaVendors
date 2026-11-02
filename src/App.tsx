import React from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { MarketTab } from './components/MarketTab';
import { MyBookingsTab } from './components/MyBookingsTab';
import { ChatTab } from './components/ChatTab';
import { DriverHubTab } from './components/DriverHubTab';
import { ProfileTab } from './components/ProfileTab';
import { AnalyticsTab } from './components/AnalyticsTab';
import { PostModal } from './components/PostModal';
import { FilterModal } from './components/FilterModal';
import { CommissionEscrowModal } from './components/CommissionEscrowModal';
import { SubscriptionModal } from './components/SubscriptionModal';
import { HelpSupportModal } from './components/HelpSupportModal';
import { DutySlipModal } from './components/DutySlipModal';
import { WhatsAppShareModal } from './components/WhatsAppShareModal';
import { WalletModal } from './components/WalletModal';
import { FleetManager } from './components/FleetManager';
import { InsuranceModal } from './components/InsuranceModal';
import { StateTaxModal } from './components/StateTaxModal';
import { CngFinderModal } from './components/CngFinderModal';
import { AuthModal } from './components/AuthModal';
import { NotificationCenterModal } from './components/NotificationCenterModal';
import { ChallanModal } from './components/ChallanModal';
import { VisualPushBanner } from './components/VisualPushBanner';
import { DriverFeedbackModal } from './components/DriverFeedbackModal';
import { VendorTrustModal } from './components/VendorTrustModal';
import { playNotificationChime } from './utils/audioChime';

import { 
  INITIAL_BOOKINGS, 
  INITIAL_FREE_VEHICLES, 
  INITIAL_CHATS, 
  INITIAL_FLEET, 
  INITIAL_DRIVERS,
  INITIAL_TRANSACTIONS,
  INITIAL_ALERT_CRITERIA,
  INITIAL_NOTIFICATIONS,
  INITIAL_FEEDBACKS
} from './data/initialData';
import { 
  Booking, 
  FreeVehicle, 
  ChatThread, 
  TripType, 
  VehicleCategory,
  FleetVehicle,
  Driver,
  WalletTransaction,
  Duty,
  EmptyCar,
  UserProfile,
  DutyAlertCriteria,
  AppNotification,
  DriverFeedback
} from './types';
import { CheckCircle2, Headphones, Sparkles, MessageCircle, Bell } from 'lucide-react';

export default function App() {
  // 1. Persistent State
  const [userProfile, setUserProfile] = React.useState<UserProfile>(() => {
    const saved = localStorage.getItem('sic_user_profile');
    return saved ? JSON.parse(saved) : {
      name: 'SafarIndiaCabs Partner',
      phone: '8506046346',
      city: 'Delhi NCR',
      attachedVehicle: {
        plateNumber: 'DL 01 ZA 4482',
        model: 'Swift Dzire Tour 2024',
        category: 'Sedan',
      },
      membershipPlan: 'verified',
      membershipExpiry: 'Nov 29, 2026',
      isLoggedIn: true,
    };
  });

  const [bookings, setBookings] = React.useState<Booking[]>(() => {
    const saved = localStorage.getItem('sic_leads_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [freeVehicles, setFreeVehicles] = React.useState<FreeVehicle[]>(() => {
    const saved = localStorage.getItem('sic_free_vehicles');
    return saved ? JSON.parse(saved) : INITIAL_FREE_VEHICLES;
  });

  const [chatThreads, setChatThreads] = React.useState<ChatThread[]>(() => {
    const saved = localStorage.getItem('sic_chats');
    return saved ? JSON.parse(saved) : INITIAL_CHATS;
  });

  const [fleet, setFleet] = React.useState<FleetVehicle[]>(() => {
    const saved = localStorage.getItem('sic_fleet_vehicles');
    return saved ? JSON.parse(saved) : INITIAL_FLEET;
  });

  const [drivers, setDrivers] = React.useState<Driver[]>(() => {
    const saved = localStorage.getItem('sic_fleet_drivers');
    return saved ? JSON.parse(saved) : INITIAL_DRIVERS;
  });

  const [walletBalance, setWalletBalance] = React.useState<number>(() => {
    const saved = localStorage.getItem('sic_vendor_wallet');
    return saved ? Number(saved) : 14850;
  });

  const [transactions, setTransactions] = React.useState<WalletTransaction[]>(() => {
    const saved = localStorage.getItem('sic_vendor_txs');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  // Sync with LocalStorage
  React.useEffect(() => {
    localStorage.setItem('sic_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);
  React.useEffect(() => {
    localStorage.setItem('sic_leads_bookings', JSON.stringify(bookings));
  }, [bookings]);

  React.useEffect(() => {
    localStorage.setItem('sic_free_vehicles', JSON.stringify(freeVehicles));
  }, [freeVehicles]);

  React.useEffect(() => {
    localStorage.setItem('sic_chats', JSON.stringify(chatThreads));
  }, [chatThreads]);

  React.useEffect(() => {
    localStorage.setItem('sic_vendor_wallet', walletBalance.toString());
  }, [walletBalance]);

  const [notifications, setNotifications] = React.useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('sic_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [alertCriteria, setAlertCriteria] = React.useState<DutyAlertCriteria>(() => {
    const saved = localStorage.getItem('sic_alert_criteria');
    return saved ? JSON.parse(saved) : INITIAL_ALERT_CRITERIA;
  });

  const [feedbacks, setFeedbacks] = React.useState<DriverFeedback[]>(() => {
    const saved = localStorage.getItem('sic_driver_feedbacks');
    return saved ? JSON.parse(saved) : INITIAL_FEEDBACKS;
  });

  React.useEffect(() => {
    localStorage.setItem('sic_driver_feedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  const [activePushBannerNotification, setActivePushBannerNotification] = React.useState<AppNotification | null>(null);

  // Sync notifications & alert criteria
  React.useEffect(() => {
    localStorage.setItem('sic_notifications', JSON.stringify(notifications));
  }, [notifications]);

  React.useEffect(() => {
    localStorage.setItem('sic_alert_criteria', JSON.stringify(alertCriteria));
  }, [alertCriteria]);

  // 2. UI Navigation & Filters
  const [activeTab, setActiveTab] = React.useState<string>('market');
  const [alertsEnabled, setAlertsEnabled] = React.useState<boolean>(true);
  const [lang, setLang] = React.useState<'en' | 'hi'>('en');
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  // Filters State
  const [filterState, setFilterState] = React.useState<{
    tripType: TripType;
    vehicles: VehicleCategory[];
    pickup: string;
    drop: string;
  }>({
    tripType: 'Both',
    vehicles: ['Hatchback', 'Sedan'],
    pickup: 'Haldwani',
    drop: '',
  });

  const [activeFilterChips, setActiveFilterChips] = React.useState<string[]>([
    'Hatchback',
    'Sedan',
    'Pickup: Haldwani',
  ]);

  // 3. Modals State
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);
  const [isAuthOpen, setIsAuthOpen] = React.useState(false);
  const [subscriptionReason, setSubscriptionReason] = React.useState<string | null>(null);
  const [isPostOpen, setIsPostOpen] = React.useState(false);
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [isHelpOpen, setIsHelpOpen] = React.useState(false);
  const [isSubscriptionsOpen, setIsSubscriptionsOpen] = React.useState(false);
  const [isWalletOpen, setIsWalletOpen] = React.useState(false);
  const [isFleetOpen, setIsFleetOpen] = React.useState(false);
  const [isInsuranceOpen, setIsInsuranceOpen] = React.useState(false);
  const [isStateTaxOpen, setIsStateTaxOpen] = React.useState(false);
  const [isCngFinderOpen, setIsCngFinderOpen] = React.useState(false);
  const [isChallanOpen, setIsChallanOpen] = React.useState(false);
  
  // Feedback & Vendor Trust Modals State
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = React.useState(false);
  const [feedbackModalBooking, setFeedbackModalBooking] = React.useState<Booking | null>(null);
  const [vendorTrustModalVendor, setVendorTrustModalVendor] = React.useState<Booking['postedBy'] | null>(null);
  const [isVendorTrustModalOpen, setIsVendorTrustModalOpen] = React.useState(false);
  
  const [escrowModalBooking, setEscrowModalBooking] = React.useState<Booking | null>(null);
  const [activeChatId, setActiveChatId] = React.useState<string | null>(null);
  const [dutySlipBooking, setDutySlipBooking] = React.useState<Booking | null>(null);
  const [whatsAppShareItem, setWhatsAppShareItem] = React.useState<{ type: 'duty'; data: Duty } | { type: 'empty'; data: EmptyCar } | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Membership Gate Check for Posting
  const handleOpenPostModal = () => {
    if (userProfile.membershipPlan === 'none') {
      setSubscriptionReason('Duty Leads ya Khali Gaadi publish karne ke liye active membership anivarya hai. Kripya Verified Partner ya Platinum Premium plan chunein.');
      setIsSubscriptionsOpen(true);
      return;
    }
    setIsPostOpen(true);
  };

  // Membership Gate Check for Accepting / Paying Commission
  const handleOpenCommissionPay = (booking: Booking) => {
    if (userProfile.membershipPlan === 'none') {
      setSubscriptionReason('Booking accept karne aur passenger contact unlock karne ke liye active membership anivarya hai. Kripya plan activate karein.');
      setIsSubscriptionsOpen(true);
      return;
    }
    setEscrowModalBooking(booking);
  };

  // Duty Board Refresh (Triggered by Scroll-down / Pull-to-refresh)
  const handleRefreshMarket = () => {
    if (alertsEnabled) {
      playNotificationChime();
    }
    showToast(`Live Duty Mandi Refreshed! Leads & vendor ratings synced for ${userProfile.attachedVehicle.category}.`);
  };

  // 4. Handlers
  const handleRemoveFilterChip = (chip: string) => {
    setActiveFilterChips((prev) => prev.filter((c) => c !== chip));
  };

  const handleApplyFilters = (newFilters: typeof filterState) => {
    setFilterState(newFilters);
    const chips: string[] = [];
    newFilters.vehicles.forEach((v) => chips.push(v));
    if (newFilters.pickup) chips.push(`Pickup: ${newFilters.pickup}`);
    if (newFilters.drop) chips.push(`Drop: ${newFilters.drop}`);
    if (newFilters.tripType !== 'Both') chips.push(newFilters.tripType);
    setActiveFilterChips(chips);
  };

  // Open Chat from Booking Card
  const handleOpenChatFromBooking = (booking: Booking) => {
    let existingThread = chatThreads.find((t) => t.bookingId === booking.id);
    if (!existingThread) {
      existingThread = {
        id: `chat-${booking.id}`,
        bookingId: booking.id,
        bookingTitle: `ID:${booking.id} · ${booking.vehicleType} · ${booking.pickupLocation} to ${booking.dropLocation}`,
        vehicleType: booking.vehicleType,
        tripRoute: `${booking.pickupLocation} ⟶ ${booking.dropLocation}`,
        otherPartyName: booking.postedBy.name,
        otherPartyPhone: booking.postedBy.phone,
        lastMessage: 'Let us confirm the booking details',
        lastTimestamp: 'Just now',
        unreadCount: 0,
        type: 'received',
        commissionAmount: booking.commission,
        totalAmount: booking.totalAmount,
        isDealConfirmed: false,
        isCommissionPaid: false,
        messages: [
          {
            id: `msg-${Date.now()}-1`,
            senderId: booking.postedBy.id,
            senderName: booking.postedBy.name,
            text: `Hello! I have customer booking from ${booking.pickupLocation} to ${booking.dropLocation}. Total Fare: ₹${booking.totalAmount.toLocaleString('en-IN')}, Commission: ₹${booking.commission.toLocaleString('en-IN')}. Is your cab ready?`,
            timestamp: 'Just now',
            isCommissionOffer: true,
            commissionAmount: booking.commission,
          },
        ],
      };
      setChatThreads((prev) => [existingThread!, ...prev]);
    }
    setActiveChatId(existingThread.id);
    setActiveTab('chat');
  };

  // Send Message in Chat
  const handleSendMessage = (threadId: string, text: string) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      senderId: 'user-self',
      senderName: 'SafarIndiaCabs (You)',
      text,
      timestamp: 'Just now',
    };

    setChatThreads((prev) =>
      prev.map((t) => {
        if (t.id === threadId) {
          return {
            ...t,
            lastMessage: text,
            lastTimestamp: 'Just now',
            messages: [...t.messages, newMsg],
          };
        }
        return t;
      })
    );

    // Simulate partner auto-reply
    setTimeout(() => {
      setChatThreads((prev) =>
        prev.map((t) => {
          if (t.id === threadId) {
            const replyMsg = {
              id: `msg-reply-${Date.now()}`,
              senderId: 'agent',
              senderName: t.otherPartyName,
              text: 'The car requirement is confirmed. Please lock the booking by paying commission into SafarIndiaCabs escrow.',
              timestamp: 'Just now',
              isCommissionOffer: !t.isCommissionPaid,
              commissionAmount: t.commissionAmount,
            };
            return {
              ...t,
              lastMessage: replyMsg.text,
              lastTimestamp: 'Just now',
              messages: [...t.messages, replyMsg],
            };
          }
          return t;
        })
      );
    }, 1500);
  };

  // Confirm Commission Payment into Escrow
  const handleConfirmPayCommission = (bookingId: string, amount: number) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return {
            ...b,
            status: 'Assigned',
            hasUnlockedContact: true,
            commissionPaidBy: {
              id: 'user-self',
              name: 'SafarIndiaCabs (You)',
              phone: '8506046346',
              paidAt: 'Just now',
              amount,
            },
          };
        }
        return b;
      })
    );

    setWalletBalance((prev) => Math.max(0, prev - amount));
    setTransactions((prev) => [
      {
        id: `tx-${Date.now()}`,
        type: 'debit',
        amount,
        title: `Commission Escrow Held (Booking #${bookingId})`,
        reference: `ESCROW-SIC-${bookingId}`,
        date: 'Just now',
        status: 'success',
      },
      ...prev,
    ]);

    setChatThreads((prev) =>
      prev.map((t) => {
        if (t.bookingId === bookingId) {
          return {
            ...t,
            isDealConfirmed: true,
            isCommissionPaid: true,
            messages: [
              ...t.messages,
              {
                id: `msg-escrow-${Date.now()}`,
                senderId: 'system',
                senderName: 'SafarIndiaCabs Escrow',
                text: `✅ Commission ₹${amount} received in Mediator Escrow! Passenger contact details are now unlocked. Money will be released to posting agent upon ride completion minus 3% fee.`,
                timestamp: 'Just now',
              },
            ],
          };
        }
        return t;
      })
    );

    showToast(`Lead Secured! ₹${amount} locked safely in Escrow. Details unlocked.`);
  };

  // Complete Ride (Agent Payout minus 3% Fee)
  const handleCompleteRide = (bookingId: string) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    const netPayout = Math.round(booking.commission * 0.97);
    const platformCut = booking.commission - netPayout;
    const updatedBooking: Booking = { ...booking, status: 'Completed' };

    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? updatedBooking : b))
    );

    setTransactions((prev) => [
      {
        id: `tx-payout-${Date.now()}`,
        type: 'credit',
        amount: netPayout,
        title: `Ride Completed! Escrow Payout for #${bookingId} (3% Fee Deducted: ₹${platformCut})`,
        reference: `PAYOUT-SIC-${bookingId}`,
        date: 'Just now',
        status: 'success',
      },
      ...prev,
    ]);

    showToast(`Ride Completed! Agent received ₹${netPayout} (3% platform fee ₹${platformCut} deducted).`);

    // Auto-prompt Driver Feedback immediately to rate each other and update market trust rating!
    setTimeout(() => {
      setFeedbackModalBooking(updatedBooking);
      setIsFeedbackModalOpen(true);
    }, 450);
  };

  // Submit Driver / Vendor Feedback & Recalculate Live Average Rating
  const handleSubmitFeedback = (feedbackData: Omit<DriverFeedback, 'id' | 'createdAt'>) => {
    const newFb: DriverFeedback = {
      ...feedbackData,
      id: `fb-${Date.now()}`,
      createdAt: 'Just now',
    };

    setFeedbacks((prev) => [newFb, ...prev]);

    // Update target booking and recalculate vendor average rating across all their bookings
    setBookings((prev) =>
      prev.map((b) => {
        const isTarget = b.id === feedbackData.bookingId;
        const isSameVendor =
          b.postedBy.id === feedbackData.toVendorId ||
          b.postedBy.name.toLowerCase() === feedbackData.toVendorName.toLowerCase();

        if (isSameVendor) {
          const currentCount = b.postedBy.reviewsCount || 1;
          const currentRating = b.postedBy.rating || 4.8;
          const newCount = currentCount + 1;
          const newAvgRating = Number(
            ((currentRating * currentCount + feedbackData.rating) / newCount).toFixed(1)
          );

          return {
            ...b,
            hasGivenFeedback: isTarget ? true : b.hasGivenFeedback,
            feedbackRating: isTarget ? feedbackData.rating : b.feedbackRating,
            feedbackTags: isTarget ? feedbackData.tags : b.feedbackTags,
            postedBy: {
              ...b.postedBy,
              reviewsCount: newCount,
              rating: newAvgRating,
            },
          };
        }

        if (isTarget) {
          return {
            ...b,
            hasGivenFeedback: true,
            feedbackRating: feedbackData.rating,
            feedbackTags: feedbackData.tags,
          };
        }

        return b;
      })
    );

    showToast(`⭐ Rating Recorded! ${feedbackData.toVendorName}'s average rating updated.`);
  };

  // Cancel Ride (100% Refund to paying vendor)
  const handleCancelRide = (bookingId: string) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled', hasUnlockedContact: false } : b))
    );

    setWalletBalance((prev) => prev + booking.commission);
    setTransactions((prev) => [
      {
        id: `tx-refund-${Date.now()}`,
        type: 'credit',
        amount: booking.commission,
        title: `100% Commission Refund for Cancelled Ride #${bookingId}`,
        reference: `REFUND-SIC-${bookingId}`,
        date: 'Just now',
        status: 'success',
      },
      ...prev,
    ]);

    showToast(`Ride cancelled. 100% Commission ₹${booking.commission} refunded to wallet!`);
  };

  // Duty Matching Engine for Saved Filter Criteria (Radar)
  const checkAndTriggerDutyMatch = (booking: Booking) => {
    if (!alertCriteria.enabled) return;

    const matchedTags: string[] = [];

    // 1. Vehicle Category match
    const bType = booking.vehicleType.toLowerCase();
    const vehicleMatches = alertCriteria.vehicleCategories.some((cat) => {
      const c = cat.toLowerCase();
      return bType.includes(c) || c.includes(bType);
    });

    if (vehicleMatches) {
      matchedTags.push(`Vehicle: ${booking.vehicleType}`);
    } else {
      if (alertCriteria.vehicleCategories.length > 0) return;
    }

    // 2. Pickup Hub match
    if (alertCriteria.preferredPickupCities.length > 0) {
      const bPickup = booking.pickupLocation.toLowerCase();
      const pickupMatches = alertCriteria.preferredPickupCities.some((c) =>
        bPickup.includes(c.toLowerCase()) || c.toLowerCase().includes(bPickup)
      );
      if (pickupMatches) {
        matchedTags.push(`Pickup: ${booking.pickupLocation}`);
      } else {
        return;
      }
    }

    // 3. Drop Destination match
    if (
      alertCriteria.preferredDropCities.length > 0 &&
      !alertCriteria.preferredDropCities.includes('Any Destination')
    ) {
      const bDrop = booking.dropLocation.toLowerCase();
      const dropMatches = alertCriteria.preferredDropCities.some((c) =>
        bDrop.includes(c.toLowerCase()) || c.toLowerCase().includes(bDrop)
      );
      if (dropMatches) {
        matchedTags.push(`Drop: ${booking.dropLocation}`);
      } else {
        return;
      }
    }

    // 4. Financial thresholds
    if (booking.totalAmount < alertCriteria.minFare) return;
    if (booking.commission < alertCriteria.minCommission) return;

    matchedTags.push(`Min Fare: ₹${booking.totalAmount.toLocaleString('en-IN')}`);

    // Create Notification item
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      type: 'duty_match',
      title: `🎯 Match Found: ${booking.pickupLocation} ⟶ ${booking.dropLocation}`,
      message: `New duty matching your radar filter: ${booking.vehicleType} from ${booking.pickupLocation} to ${booking.dropLocation}. Fare ₹${booking.totalAmount.toLocaleString('en-IN')}, Commission ₹${booking.commission.toLocaleString('en-IN')}.`,
      timestamp: 'Just now',
      read: false,
      bookingId: booking.id,
      matchedCriteria: matchedTags,
      bookingData: {
        pickupLocation: booking.pickupLocation,
        dropLocation: booking.dropLocation,
        vehicleType: booking.vehicleType,
        totalAmount: booking.totalAmount,
        commission: booking.commission,
      },
    };

    setNotifications((prev) => [newNotif, ...prev]);

    // Audio Chime
    if (alertCriteria.soundEnabled) {
      playNotificationChime();
    }

    // In-app visual push banner
    if (alertCriteria.pushVisualsEnabled) {
      setActivePushBannerNotification(newNotif);
      setTimeout(() => {
        setActivePushBannerNotification((curr) => (curr?.id === newNotif.id ? null : curr));
      }, 7500);
    }
  };

  // Simulate duty matching user criteria on demand
  const handleSimulateDutyMatch = () => {
    const pickup = alertCriteria.preferredPickupCities[0] || 'Haldwani';
    const drop =
      alertCriteria.preferredDropCities.find((c) => c !== 'Any Destination') || 'New Delhi';
    const veh = alertCriteria.vehicleCategories[0] || userProfile.attachedVehicle.category || 'Sedan';
    const fare = Math.max(3800, alertCriteria.minFare + 400);
    const comm = Math.max(600, alertCriteria.minCommission + 200);

    const simId = `${Math.floor(3580000 + Math.random() * 19000)}`;
    const newSimBooking: Booking = {
      id: simId,
      status: 'Open',
      pickupLocation: pickup,
      dropLocation: drop,
      tripType: 'One Way',
      pickupDate: 'Today @ 01:15 PM',
      vehicleType: veh,
      totalAmount: fare,
      commission: comm,
      platformFeePercent: userProfile.membershipPlan === 'platinum' ? 2 : 3,
      extraRequirements: 'Carrier required, AC in plains. Clean tourist cab needed.',
      isSecured: true,
      postedBy: {
        id: `agent-sim-${Date.now()}`,
        name: 'Kumaon & Doon Travel Desk',
        phone: '+91 94111 22334',
        reviewsCount: 164,
        rating: 4.9,
      },
      customerDetails: {
        name: 'Sunil Pandey',
        phone: '+91 98102 33445',
        pickupAddress: `${pickup} Railway Station Gate 1`,
      },
      hasUnlockedContact: false,
    };

    setBookings((prev) => [newSimBooking, ...prev]);
    checkAndTriggerDutyMatch(newSimBooking);
    showToast(`Radar Match Fired! Duty #${simId} matches your ${veh} & ${pickup} filter.`);
  };

  // Post New Booking
  const handlePostBooking = (newB: Omit<Booking, 'id' | 'hasUnlockedContact' | 'chatId'>) => {
    const newId = `${Math.floor(3500000 + Math.random() * 90000)}`;
    const fullBooking: Booking = {
      ...newB,
      id: newId,
      hasUnlockedContact: false,
      chatId: `chat-${newId}`,
    };
    setBookings((prev) => [fullBooking, ...prev]);
    checkAndTriggerDutyMatch(fullBooking);
    showToast(`New booking ID:${newId} published to Duty Hub!`);
  };

  // Post Free Vehicle
  const handlePostFreeVehicle = (newFv: Omit<FreeVehicle, 'id' | 'postedAt' | 'status'>) => {
    const fv: FreeVehicle = {
      ...newFv,
      id: `fv-${Date.now()}`,
      postedAt: 'Just now',
      status: 'Available',
    };
    setFreeVehicles((prev) => [fv, ...prev]);
    showToast(`Khali Gaadi registered for ${newFv.currentLocation} ⟶ ${newFv.destinationLocation}!`);
  };

  // Plan Selection (Verified ₹299 vs Platinum ₹799)
  const handleSelectPlan = (planId: 'verified' | 'platinum') => {
    setUserProfile((prev) => ({
      ...prev,
      membershipPlan: planId,
      membershipExpiry: 'Dec 02, 2026',
    }));
    setSubscriptionReason(null);
    showToast(
      planId === 'platinum'
        ? '👑 Upgraded to Platinum Premium VIP (₹799/mo)! 2% Platform Fee & 5-min early leads active.'
        : '🛡️ Active Plan: Verified Partner (₹299/mo)!'
    );
  };

  // Adapter for Duty Slip
  const handleOpenDutySlip = (b: Booking) => {
    setDutySlipBooking(b);
  };

  // Adapter for WhatsApp Share
  const handleShareWhatsAppBooking = (b: Booking) => {
    const dutyAdapter: Duty = {
      id: b.id,
      dutyNumber: `SIC-${b.id}`,
      tripType: b.tripType === 'One Way' ? 'oneway' : 'roundtrip',
      pickupCity: b.pickupLocation,
      pickupLocation: b.pickupLocation,
      dropCity: b.dropLocation,
      dropLocation: b.dropLocation,
      pickupDate: b.pickupDate,
      pickupTime: '09:00 AM',
      vehicleCategory: (b.vehicleType.includes('Sedan') ? 'Sedan (Dzire / Etios)' :
                        b.vehicleType.includes('Innova') ? 'Prime SUV (Innova Crysta)' :
                        b.vehicleType.includes('Ertiga') ? 'SUV (Ertiga / Carens)' :
                        'Sedan (Dzire / Etios)') as any,
      customerRate: b.totalAmount,
      vendorRate: b.totalAmount - b.commission,
      commission: b.commission,
      advanceAmount: 1000,
      tollTaxIncluded: true,
      distanceKm: 240,
      operatorName: b.postedBy.name,
      operatorPhone: b.postedBy.phone,
      operatorCity: b.pickupLocation,
      operatorRating: b.postedBy.rating,
      postedAt: 'Just now',
      status: 'open',
      bids: [],
      specialInstructions: b.extraRequirements,
    };
    setWhatsAppShareItem({ type: 'duty', data: dutyAdapter });
  };

  const handleShareWhatsAppFreeVehicle = (fv: FreeVehicle) => {
    const emptyAdapter: EmptyCar = {
      id: fv.id,
      carModel: fv.vehicleNumber,
      vehicleCategory: 'Sedan (Dzire / Etios)',
      vehicleNumber: fv.vehicleNumber,
      driverName: fv.driverName,
      driverPhone: fv.driverPhone,
      currentCity: fv.currentLocation,
      destinationCity: fv.destinationLocation,
      availableDate: fv.availableDate,
      availableTime: 'As per route',
      askingPrice: fv.demandedPrice,
      seatsAvailable: fv.seats,
      postedAt: fv.postedAt,
      operatorName: 'SafarIndiaCabs Partner',
      operatorPhone: '8506046346',
      status: 'available',
    };
    setWhatsAppShareItem({ type: 'empty', data: emptyAdapter });
  };

  return (
    <div className="min-h-screen bg-slate-100/80 text-slate-800 flex justify-center selection:bg-amber-500 selection:text-white">
      
      {/* Mobile-first App container with distinctive aesthetic */}
      <div className="w-full max-w-lg min-h-screen bg-slate-50 border-x border-slate-200/80 shadow-2xl relative flex flex-col">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white font-bold px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 text-xs border border-amber-400 animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400 stroke-[2.5]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Floating Visual Push Banner for Matched Duties */}
        <VisualPushBanner
          notification={activePushBannerNotification}
          onClose={() => setActivePushBannerNotification(null)}
          onOpenBooking={(bId) => {
            setActiveTab('market');
            const targetBooking = bookings.find((b) => b.id === bId);
            if (targetBooking) {
              handleOpenCommissionPay(targetBooking);
            }
          }}
        />

        {/* Top Header */}
        <Header
          onOpenHelp={() => setIsHelpOpen(true)}
          onOpenChats={() => setActiveTab('chat')}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          notificationUnreadCount={notifications.filter((n) => !n.read).length}
          alertsEnabled={alertsEnabled}
          setAlertsEnabled={setAlertsEnabled}
          activeTab={activeTab}
          onLogout={() => showToast('Session remains active. SafarIndiaCabs Verified.')}
          unreadCount={chatThreads.filter((t) => t.unreadCount > 0).length}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-3.5 overflow-y-auto">
          
          {activeTab === 'market' && (
            <MarketTab
              bookings={bookings}
              freeVehicles={freeVehicles}
              onOpenChat={handleOpenChatFromBooking}
              onShareWhatsApp={handleShareWhatsAppBooking}
              onOpenCommissionPay={handleOpenCommissionPay}
              onOpenFilterModal={() => setIsFilterOpen(true)}
              onOpenFreeVehShare={handleShareWhatsAppFreeVehicle}
              activeFilterChips={activeFilterChips}
              onRemoveFilterChip={handleRemoveFilterChip}
              onOpenInsurance={() => setIsInsuranceOpen(true)}
              onOpenStateTax={() => setIsStateTaxOpen(true)}
              onOpenCngFinder={() => setIsCngFinderOpen(true)}
              onOpenHelpRules={() => setIsHelpOpen(true)}
              attachedVehicleCategory={userProfile.attachedVehicle.category}
              onRefresh={handleRefreshMarket}
              onOpenNotificationCenter={() => setIsNotificationsOpen(true)}
              alertCriteria={alertCriteria}
              onRateBooking={(booking) => {
                setFeedbackModalBooking(booking);
                setIsFeedbackModalOpen(true);
              }}
              onOpenVendorTrust={(vendor) => {
                setVendorTrustModalVendor(vendor);
                setIsVendorTrustModalOpen(true);
              }}
            />
          )}

          {activeTab === 'bookings' && (
            <MyBookingsTab
              bookings={bookings}
              onOpenChat={handleOpenChatFromBooking}
              onShareWhatsApp={handleShareWhatsAppBooking}
              onViewDutySlip={handleOpenDutySlip}
              onCompleteRide={handleCompleteRide}
              onCancelRide={handleCancelRide}
              onRateBooking={(booking) => {
                setFeedbackModalBooking(booking);
                setIsFeedbackModalOpen(true);
              }}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsTab
              userProfile={userProfile}
              bookings={bookings}
              walletBalance={walletBalance}
              onNavigateToMarket={(routeFilter) => {
                if (routeFilter) {
                  setFilterState((prev) => ({ ...prev, pickup: routeFilter }));
                  setActiveFilterChips((prev) => [
                    ...prev.filter((c) => !c.startsWith('Pickup:')),
                    `Pickup: ${routeFilter}`,
                  ]);
                }
                setActiveTab('market');
              }}
              onOpenPostKhaliGaadi={() => {
                handleOpenPostModal();
              }}
              onOpenSubscriptionModal={() => {
                setSubscriptionReason('Platinum VIP subscription unlocks lower 2% platform fee & priority bid rankings.');
                setIsSubscriptionsOpen(true);
              }}
              onOpenFilterRadar={() => {
                setIsNotificationsOpen(true);
              }}
            />
          )}

          {activeTab === 'driver' && (
            <DriverHubTab
              onOpenInsurance={() => setIsInsuranceOpen(true)}
              onOpenStateTax={() => setIsStateTaxOpen(true)}
              onOpenCngFinder={() => setIsCngFinderOpen(true)}
              onOpenAnalytics={() => setActiveTab('analytics')}
              onOpenEmergencySOS={() => {
                alert('🚨 SOS ALERT TRIGGERED! Your live GPS coordinates have been sent to SafarIndiaCabs 24x7 Highway Emergency Desk & Nearby Verified Partners.');
              }}
              onCheckChallan={() => {
                setIsChallanOpen(true);
              }}
              onCallRoadsideAssistance={() => {
                window.location.href = 'tel:8506046346';
              }}
            />
          )}

          {activeTab === 'chat' && (
            <ChatTab
              chatThreads={chatThreads}
              activeChatId={activeChatId}
              setActiveChatId={setActiveChatId}
              onSendMessage={handleSendMessage}
              onPayCommissionFromChat={(thread) => {
                const b = bookings.find((item) => item.id === thread.bookingId);
                if (b) handleOpenCommissionPay(b);
              }}
              onSendCommissionOffer={(threadId, amount) => {
                showToast(`Commission deal of ₹${amount} sent to partner.`);
              }}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileTab
              onOpenSubscriptions={() => {
                setSubscriptionReason(null);
                setIsSubscriptionsOpen(true);
              }}
              onOpenManageFleet={() => setIsFleetOpen(true)}
              onOpenTransactions={() => setIsWalletOpen(true)}
              onOpenLanguage={() => setLang(lang === 'en' ? 'hi' : 'en')}
              onOpenHelp={() => setIsHelpOpen(true)}
              onOpenAuthModal={() => setIsAuthOpen(true)}
              onOpenAnalytics={() => setActiveTab('analytics')}
              userProfile={userProfile}
              currentPlanName={
                userProfile.membershipPlan === 'platinum'
                  ? 'Platinum Premium (VIP)'
                  : userProfile.membershipPlan === 'verified'
                  ? 'Verified Partner'
                  : 'No Active Membership'
              }
              planExpiryDate={userProfile.membershipExpiry}
              lang={lang}
            />
          )}

        </main>

        {/* Floating Help Robot Widget (as seen in screenshots) */}
        <div 
          onClick={() => setIsHelpOpen(true)}
          className="fixed bottom-20 right-4 z-30 cursor-pointer group"
          title="SafarIndiaCabs Support Assistant"
        >
          <div className="w-13 h-13 rounded-full bg-white border-2 border-amber-400 p-1 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <img
              src="/assets/aistudio/IMG-20261029-WA0001_67f0d119.jpg"
              alt="Bot"
              className="w-10 h-10 object-contain rounded-full"
            />
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNav
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            if (tab !== 'chat') setActiveChatId(null);
          }}
          onOpenPostModal={handleOpenPostModal}
        />

      </div>

      {/* MODALS */}

      {/* 1. Post Modal (New Booking / Free Vehicle) */}
      <PostModal
        isOpen={isPostOpen}
        onClose={() => setIsPostOpen(false)}
        onPostBooking={handlePostBooking}
        onPostFreeVehicle={handlePostFreeVehicle}
        lang={lang}
      />

      {/* 2. Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={filterState}
      />

      {/* 3. Escrow Mediator Commission Payment Modal */}
      <CommissionEscrowModal
        booking={escrowModalBooking}
        onClose={() => setEscrowModalBooking(null)}
        onConfirmPay={handleConfirmPayCommission}
        walletBalance={walletBalance}
      />

      {/* 4. Subscriptions Modal (₹299 vs ₹799) */}
      <SubscriptionModal
        isOpen={isSubscriptionsOpen}
        onClose={() => {
          setIsSubscriptionsOpen(false);
          setSubscriptionReason(null);
        }}
        currentPlanId={userProfile.membershipPlan}
        onSelectPlan={handleSelectPlan}
        reasonMessage={subscriptionReason}
      />

      {/* 5. Help & Rules Modal */}
      <HelpSupportModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        lang={lang}
      />

      {/* 6. Printable Duty Slip / Voucher Modal */}
      <DutySlipModal
        duty={
          dutySlipBooking
            ? {
                id: dutySlipBooking.id,
                dutyNumber: `SIC-${dutySlipBooking.id}`,
                tripType: dutySlipBooking.tripType === 'One Way' ? 'oneway' : 'roundtrip',
                pickupCity: dutySlipBooking.pickupLocation,
                pickupLocation: dutySlipBooking.pickupLocation,
                dropCity: dutySlipBooking.dropLocation,
                dropLocation: dutySlipBooking.dropLocation,
                pickupDate: dutySlipBooking.pickupDate,
                pickupTime: '08:00 AM',
                vehicleCategory: (dutySlipBooking.vehicleType.includes('Sedan') ? 'Sedan (Dzire / Etios)' :
                                  dutySlipBooking.vehicleType.includes('Innova') ? 'Prime SUV (Innova Crysta)' :
                                  'SUV (Ertiga / Carens)') as any,
                customerRate: dutySlipBooking.totalAmount,
                vendorRate: dutySlipBooking.totalAmount - dutySlipBooking.commission,
                commission: dutySlipBooking.commission,
                advanceAmount: 1000,
                tollTaxIncluded: true,
                distanceKm: 240,
                operatorName: dutySlipBooking.postedBy.name,
                operatorPhone: dutySlipBooking.postedBy.phone,
                operatorCity: dutySlipBooking.pickupLocation,
                operatorRating: dutySlipBooking.postedBy.rating,
                postedAt: 'Today',
                status: 'accepted',
                bids: [],
                passengerName: dutySlipBooking.customerDetails?.name || 'Client',
                passengerPhone: dutySlipBooking.customerDetails?.phone || '+91 98110 00000',
                specialInstructions: dutySlipBooking.extraRequirements,
              }
            : null
        }
        onClose={() => setDutySlipBooking(null)}
        lang={lang}
      />

      {/* 7. WhatsApp Share Modal */}
      <WhatsAppShareModal
        item={whatsAppShareItem}
        onClose={() => setWhatsAppShareItem(null)}
        lang={lang}
      />

      {/* 8. Wallet & Escrow Ledger Modal */}
      <WalletModal
        isOpen={isWalletOpen}
        onClose={() => setIsWalletOpen(false)}
        balance={walletBalance}
        transactions={transactions}
        onAddFunds={(amt) => {
          setWalletBalance((b) => b + amt);
          setTransactions((prev) => [
            {
              id: `tx-${Date.now()}`,
              type: 'credit',
              amount: amt,
              title: 'Wallet Recharge via UPI',
              reference: `UPI/2611/${Math.floor(100000000 + Math.random() * 900000000)}`,
              date: 'Just now',
              status: 'success',
            },
            ...prev,
          ]);
          showToast(`₹${amt} added to wallet!`);
        }}
        onRequestWithdrawal={(amt, upi) => {
          setWalletBalance((b) => b - amt);
          setTransactions((prev) => [
            {
              id: `tx-${Date.now()}`,
              type: 'debit',
              amount: amt,
              title: `Instant Bank/UPI Withdrawal to ${upi}`,
              reference: `WTH-IMPS-${Date.now().toString().slice(-6)}`,
              date: 'Just now',
              status: 'success',
            },
            ...prev,
          ]);
          showToast(`Withdrawal of ₹${amt} initiated to ${upi}!`);
        }}
        lang={lang}
      />

      {/* 9. Fleet Manager Modal */}
      {isFleetOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 text-white rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl relative my-8">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h2 className="text-base font-bold text-white">Manage Vehicles & Drivers</h2>
              <button onClick={() => setIsFleetOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <FleetManager
              fleet={fleet}
              drivers={drivers}
              lang={lang}
              onAddVehicle={(veh) => {
                setFleet((prev) => [{ ...veh, id: `veh-${Date.now()}` }, ...prev]);
                showToast('Vehicle added to fleet!');
              }}
              onAddDriver={(drv) => {
                setDrivers((prev) => [{ ...drv, id: `drv-${Date.now()}` }, ...prev]);
                showToast('Driver added!');
              }}
            />
          </div>
        </div>
      )}

      {/* 10. 3-Month Commercial Cab Insurance Modal */}
      <InsuranceModal
        isOpen={isInsuranceOpen}
        onClose={() => setIsInsuranceOpen(false)}
        savedVehicleNumber={userProfile.attachedVehicle.plateNumber}
        onSuccess={(policy) => {
          showToast(`Policy ${policy} generated! Digital copy saved.`);
        }}
      />

      {/* 11. State Border Entry Permit Tax Modal (Parivahan 4-Step Wizard) */}
      <StateTaxModal
        isOpen={isStateTaxOpen}
        onClose={() => setIsStateTaxOpen(false)}
        savedVehicleNumber={userProfile.attachedVehicle.plateNumber}
        onSuccess={(receipt) => {
          showToast(`Border Permit Tax for ${receipt.state} paid! Receipt ready.`);
        }}
      />

      {/* 12. Highway 24x7 CNG Pump & Pressure Finder */}
      <CngFinderModal
        isOpen={isCngFinderOpen}
        onClose={() => setIsCngFinderOpen(false)}
      />

      {/* 12b. Traffic e-Challan & Notice Checker */}
      <ChallanModal
        isOpen={isChallanOpen}
        onClose={() => setIsChallanOpen(false)}
        defaultVehicleNo={userProfile.attachedVehicle.plateNumber}
      />

      {/* 13. Registration & Vehicle Attachment Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialProfile={userProfile}
        onSaveProfile={(prof) => {
          setUserProfile(prof);
          showToast(`Profile updated! Vehicle ${prof.attachedVehicle.plateNumber} attached.`);
        }}
      />

      {/* 14. Notification Center & Saved Filter Radar Modal */}
      <NotificationCenterModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        alertCriteria={alertCriteria}
        onUpdateCriteria={(newCrit) => {
          setAlertCriteria(newCrit);
          showToast('Radar Filter Criteria updated! Tracking active.');
        }}
        onMarkAllAsRead={() => {
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
          showToast('All notifications marked as read.');
        }}
        onClearNotifications={() => {
          setNotifications([]);
          showToast('Notifications history cleared.');
        }}
        onSelectBooking={(bId) => {
          setActiveTab('market');
          const targetBooking = bookings.find((b) => b.id === bId);
          if (targetBooking) {
            handleOpenCommissionPay(targetBooking);
          }
        }}
        onSimulateDutyMatch={handleSimulateDutyMatch}
        userAttachedVehicleCategory={userProfile.attachedVehicle.category}
      />

      {/* 15. Driver Feedback & Trust Rating Modal */}
      <DriverFeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => {
          setIsFeedbackModalOpen(false);
          setFeedbackModalBooking(null);
        }}
        booking={feedbackModalBooking}
        onSubmitFeedback={handleSubmitFeedback}
      />

      {/* 16. Verified Vendor Trust Card & Community Reviews Modal */}
      <VendorTrustModal
        isOpen={isVendorTrustModalOpen}
        onClose={() => {
          setIsVendorTrustModalOpen(false);
          setVendorTrustModalVendor(null);
        }}
        vendor={vendorTrustModalVendor}
        feedbacks={feedbacks}
        onRateVendor={() => {
          setIsVendorTrustModalOpen(false);
          const completedBooking = bookings.find((b) => b.status === 'Completed');
          if (completedBooking) {
            setFeedbackModalBooking(completedBooking);
            setIsFeedbackModalOpen(true);
          }
        }}
      />

    </div>
  );
}
