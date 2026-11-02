import { Duty, EmptyCar } from '../types';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatKM(km: number): string {
  return `${km.toLocaleString('en-IN')} KM`;
}

export function generateDutyWhatsAppText(duty: Duty): string {
  const tollText = duty.tollTaxIncluded ? 'Toll & State Tax: INCLUDED' : 'Toll & State Tax: EXTRA (By Guest)';
  return `🚕 *SAFAR INDIA CABS VENDORS - B2B DUTY REQUIREMENT* 🚕
━━━━━━━━━━━━━━━━━━━━
📋 *Duty Ref:* ${duty.dutyNumber}
🚖 *Trip Type:* ${duty.tripType.toUpperCase()}
📍 *Pickup:* ${duty.pickupLocation} (${duty.pickupCity})
🏁 *Drop:* ${duty.dropLocation} (${duty.dropCity})
📅 *Pickup Date & Time:* ${duty.pickupDate} at ${duty.pickupTime}
${duty.returnDate ? `🔄 *Return Date:* ${duty.returnDate}\n` : ''}🚘 *Car Required:* ${duty.vehicleCategory}
🛣️ *Distance:* ~${duty.distanceKm} KM
💰 *Vendor Net Rate:* ₹${duty.vendorRate.toLocaleString('en-IN')}
💵 *Advance Payment:* ₹${duty.advanceAmount.toLocaleString('en-IN')}
🧾 *Taxes:* ${tollText}
📝 *Note:* ${duty.specialInstructions || 'Standard verified driver required'}
━━━━━━━━━━━━━━━━━━━━
🏢 *Posted By:* ${duty.operatorName} (${duty.operatorCity})
📞 *Call/WhatsApp:* ${duty.operatorPhone}

👉 *Powered by SafarIndiaCabs Vendors B2B Network*`;
}

export function generateEmptyCarWhatsAppText(empty: EmptyCar): string {
  return `🚨 *KHAALI GAADI / EMPTY RETURN CAB AVAILABLE* 🚨
━━━━━━━━━━━━━━━━━━━━
🚘 *Vehicle:* ${empty.carModel} (${empty.vehicleNumber})
📍 *Current Location:* ${empty.currentCity}
🏁 *Heading Towards:* ${empty.destinationCity}
⏰ *Available Time:* ${empty.availableDate} | ${empty.availableTime}
💺 *Capacity:* ${empty.seatsAvailable} Seats
💰 *Demand / Deal Price:* ₹${empty.askingPrice.toLocaleString('en-IN')} Only!
👨‍✈️ *Driver:* ${empty.driverName} (${empty.driverPhone})
━━━━━━━━━━━━━━━━━━━━
🏢 *Operator:* ${empty.operatorName}
📞 *Call/WhatsApp:* ${empty.operatorPhone}

👉 *Book directly on SafarIndiaCabs Vendors*`;
}
