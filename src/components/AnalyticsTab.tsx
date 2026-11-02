import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { 
  TrendingUp, 
  IndianRupee, 
  MapPin, 
  Car, 
  ShieldCheck, 
  Zap, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar, 
  Sparkles, 
  Filter, 
  Download, 
  Share2, 
  RefreshCw,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Award
} from 'lucide-react';
import { 
  BOOKING_TRENDS_7D, 
  BOOKING_TRENDS_30D, 
  MONTHLY_COMMISSION_DATA, 
  POPULAR_ROUTES, 
  VEHICLE_DEMAND_SHARE, 
  VENDOR_ACTIONABLE_INSIGHTS,
  BookingTrendPoint,
  RouteMetric,
  VendorInsight
} from '../data/analyticsData';
import { UserProfile, Booking } from '../types';

interface AnalyticsTabProps {
  userProfile: UserProfile;
  bookings: Booking[];
  walletBalance: number;
  onNavigateToMarket?: (routeFilter?: string) => void;
  onOpenPostKhaliGaadi?: () => void;
  onOpenSubscriptionModal?: () => void;
  onOpenFilterRadar?: () => void;
}

type Timeframe = '7D' | '30D' | '6M';

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({
  userProfile,
  bookings,
  walletBalance,
  onNavigateToMarket,
  onOpenPostKhaliGaadi,
  onOpenSubscriptionModal,
  onOpenFilterRadar,
}) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('30D');
  const [selectedRoute, setSelectedRoute] = useState<RouteMetric | null>(null);
  const [activeTooltip, setActiveTooltip] = useState<{
    x: number;
    y: number;
    title: string;
    value: string;
    sub: string;
  } | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [insightFeedback, setInsightFeedback] = useState<string | null>(null);

  // D3 Chart Refs
  const trendSvgRef = useRef<SVGSVGElement | null>(null);
  const commissionSvgRef = useRef<SVGSVGElement | null>(null);
  const donutSvgRef = useRef<SVGSVGElement | null>(null);

  // Select trend dataset based on timeframe
  const trendData: BookingTrendPoint[] = timeframe === '7D' ? BOOKING_TRENDS_7D : BOOKING_TRENDS_30D;

  // Calculate high-level KPIs
  const totalVolume = trendData.reduce((acc, curr) => acc + curr.grossAmount, 0);
  const totalCommission = trendData.reduce((acc, curr) => acc + curr.commissionEarned, 0);
  const totalCompleted = trendData.reduce((acc, curr) => acc + curr.completedBookings, 0);
  const avgTripValue = Math.round(totalVolume / (totalCompleted || 1));
  const platformCutSaved = Math.round(totalCommission * (userProfile.membershipPlan === 'platinum' ? 0.01 : 0));

  // --- 1. D3 Area & Line Chart for Booking Trends ---
  useEffect(() => {
    if (!trendSvgRef.current) return;

    const svg = d3.select(trendSvgRef.current);
    svg.selectAll('*').remove();

    const width = 480;
    const height = 210;
    const margin = { top: 20, right: 20, bottom: 30, left: 35 };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X Scale
    const xScale = d3
      .scalePoint<string>()
      .domain(trendData.map((d) => d.label))
      .range([0, innerWidth])
      .padding(0.2);

    // Y Scale
    const maxVal = d3.max(trendData, (d) => d.totalBookings) || 50;
    const yScale = d3
      .scaleLinear()
      .domain([0, Math.ceil(maxVal * 1.2)])
      .range([innerHeight, 0]);

    // Gradient for Area
    const defs = svg.append('defs');
    const areaGradient = defs
      .append('linearGradient')
      .attr('id', 'bookingAreaGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    areaGradient.append('stop').attr('offset', '0%').attr('stop-color', '#f59e0b').attr('stop-opacity', 0.45);
    areaGradient.append('stop').attr('offset', '100%').attr('stop-color', '#f59e0b').attr('stop-opacity', 0.02);

    // Grid lines (horizontal)
    const yAxisTicks = yScale.ticks(4);
    yAxisTicks.forEach((tickVal) => {
      g.append('line')
        .attr('x1', 0)
        .attr('x2', innerWidth)
        .attr('y1', yScale(tickVal))
        .attr('y2', yScale(tickVal))
        .attr('stroke', '#f1f5f9')
        .attr('stroke-dasharray', '3,3');

      g.append('text')
        .attr('x', -8)
        .attr('y', yScale(tickVal) + 3)
        .attr('fill', '#94a3b8')
        .attr('font-size', '10px')
        .attr('text-anchor', 'end')
        .text(tickVal);
    });

    // Area Generator
    const areaGen = d3
      .area<BookingTrendPoint>()
      .x((d) => xScale(d.label) || 0)
      .y0(innerHeight)
      .y1((d) => yScale(d.totalBookings))
      .curve(d3.curveMonotoneX);

    // Line Generator for Total Bookings
    const lineGen = d3
      .line<BookingTrendPoint>()
      .x((d) => xScale(d.label) || 0)
      .y((d) => yScale(d.totalBookings))
      .curve(d3.curveMonotoneX);

    // Line Generator for Completed Bookings
    const completedLineGen = d3
      .line<BookingTrendPoint>()
      .x((d) => xScale(d.label) || 0)
      .y((d) => yScale(d.completedBookings))
      .curve(d3.curveMonotoneX);

    // Append Area
    g.append('path')
      .datum(trendData)
      .attr('fill', 'url(#bookingAreaGradient)')
      .attr('d', areaGen);

    // Append Total Line
    g.append('path')
      .datum(trendData)
      .attr('fill', 'none')
      .attr('stroke', '#f59e0b')
      .attr('stroke-width', 2.8)
      .attr('d', lineGen);

    // Append Completed Line
    g.append('path')
      .datum(trendData)
      .attr('fill', 'none')
      .attr('stroke', '#10b981')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '4,3')
      .attr('d', completedLineGen);

    // Dots and Interactive Overlay
    trendData.forEach((d) => {
      const cx = xScale(d.label) || 0;
      const cy = yScale(d.totalBookings);

      // Total Dot
      g.append('circle')
        .attr('cx', cx)
        .attr('cy', cy)
        .attr('r', 4)
        .attr('fill', '#ffffff')
        .attr('stroke', '#f59e0b')
        .attr('stroke-width', 2.5)
        .attr('cursor', 'pointer')
        .on('mouseenter', (event) => {
          const rect = trendSvgRef.current?.getBoundingClientRect();
          if (rect) {
            setActiveTooltip({
              x: event.clientX - rect.left,
              y: event.clientY - rect.top,
              title: `${d.label} Bookings`,
              value: `${d.totalBookings} Total (${d.completedBookings} Completed)`,
              sub: `Gross Volume: ₹${d.grossAmount.toLocaleString('en-IN')} | Comm: ₹${d.commissionEarned.toLocaleString('en-IN')}`,
            });
          }
        })
        .on('mouseleave', () => {
          setActiveTooltip(null);
        });

      // X Axis Label
      g.append('text')
        .attr('x', cx)
        .attr('y', innerHeight + 18)
        .attr('fill', '#64748b')
        .attr('font-size', '10px')
        .attr('text-anchor', 'middle')
        .text(d.label);
    });

  }, [trendData]);

  // --- 2. D3 Bar Chart for Monthly Commission & Net Vendor Earnings ---
  useEffect(() => {
    if (!commissionSvgRef.current) return;

    const svg = d3.select(commissionSvgRef.current);
    svg.selectAll('*').remove();

    const width = 480;
    const height = 190;
    const margin = { top: 18, right: 15, bottom: 32, left: 45 };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleBand<string>()
      .domain(MONTHLY_COMMISSION_DATA.map((d) => d.month))
      .range([0, innerWidth])
      .padding(0.28);

    const maxCommission = d3.max(MONTHLY_COMMISSION_DATA, (d) => d.grossCommission) || 200000;
    const yScale = d3
      .scaleLinear()
      .domain([0, maxCommission * 1.15])
      .range([innerHeight, 0]);

    // Horizontal Guidelines
    const ticks = yScale.ticks(3);
    ticks.forEach((tickVal) => {
      g.append('line')
        .attr('x1', 0)
        .attr('x2', innerWidth)
        .attr('y1', yScale(tickVal))
        .attr('y2', yScale(tickVal))
        .attr('stroke', '#f1f5f9');

      g.append('text')
        .attr('x', -8)
        .attr('y', yScale(tickVal) + 3)
        .attr('fill', '#94a3b8')
        .attr('font-size', '9px')
        .attr('text-anchor', 'end')
        .text(`₹${(tickVal / 1000).toFixed(0)}k`);
    });

    // Bars
    MONTHLY_COMMISSION_DATA.forEach((d) => {
      const bx = xScale(d.month) || 0;
      const bw = xScale.bandwidth();
      const by = yScale(d.grossCommission);
      const bh = innerHeight - by;

      // Background rounded pill bar
      g.append('rect')
        .attr('x', bx)
        .attr('y', by)
        .attr('width', bw)
        .attr('height', bh)
        .attr('rx', 4)
        .attr('fill', d.month.includes('Nov') ? '#f59e0b' : '#3b82f6')
        .attr('opacity', 0.85)
        .attr('cursor', 'pointer')
        .on('mouseenter', (event) => {
          const rect = commissionSvgRef.current?.getBoundingClientRect();
          if (rect) {
            setActiveTooltip({
              x: event.clientX - rect.left,
              y: event.clientY - rect.top,
              title: `${d.month} Earnings`,
              value: `Gross Comm: ₹${d.grossCommission.toLocaleString('en-IN')}`,
              sub: `Net Credited: ₹${d.netVendorEarnings.toLocaleString('en-IN')} (3% Cut: ₹${d.platformFeePaid})`,
            });
          }
        })
        .on('mouseleave', () => setActiveTooltip(null));

      // Bar Top Label
      g.append('text')
        .attr('x', bx + bw / 2)
        .attr('y', by - 5)
        .attr('fill', '#334155')
        .attr('font-size', '10px')
        .attr('font-weight', 'bold')
        .attr('text-anchor', 'middle')
        .text(`₹${(d.grossCommission / 1000).toFixed(0)}k`);

      // X Label
      const shortLabel = d.month.split(' ')[0];
      g.append('text')
        .attr('x', bx + bw / 2)
        .attr('y', innerHeight + 18)
        .attr('fill', '#64748b')
        .attr('font-size', '10px')
        .attr('text-anchor', 'middle')
        .text(shortLabel);
    });

  }, []);

  // --- 3. D3 Donut Chart for Vehicle Demand Share ---
  useEffect(() => {
    if (!donutSvgRef.current) return;

    const svg = d3.select(donutSvgRef.current);
    svg.selectAll('*').remove();

    const width = 160;
    const height = 160;
    const radius = Math.min(width, height) / 2;

    const g = svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const pie = d3.pie<typeof VEHICLE_DEMAND_SHARE[0]>().value((d) => d.percentage).sort(null);
    const arc = d3.arc<d3.PieArcDatum<typeof VEHICLE_DEMAND_SHARE[0]>>()
      .innerRadius(radius * 0.58)
      .outerRadius(radius * 0.92)
      .padAngle(0.04)
      .cornerRadius(4);

    const arcs = g.selectAll('.arc')
      .data(pie(VEHICLE_DEMAND_SHARE))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d) => d.data.color)
      .attr('cursor', 'pointer')
      .on('mouseenter', (event, d) => {
        const rect = donutSvgRef.current?.getBoundingClientRect();
        if (rect) {
          setActiveTooltip({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
            title: d.data.category,
            value: `${d.data.percentage}% Market Demand`,
            sub: `${d.data.totalTrips} Trips · Avg Ticket ₹${d.data.avgTicketSize.toLocaleString('en-IN')}`,
          });
        }
      })
      .on('mouseleave', () => setActiveTooltip(null));

    // Center Label
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.1em')
      .attr('fill', '#0f172a')
      .attr('font-size', '14px')
      .attr('font-weight', '800')
      .text('939');

    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.3em')
      .attr('fill', '#64748b')
      .attr('font-size', '9px')
      .attr('font-weight', '600')
      .text('TOTAL TRIPS');

  }, []);

  // Share or Export Summary
  const handleExportStatement = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setInsightFeedback('✅ Monthly Vendor Performance Statement generated & saved to downloads!');
      setTimeout(() => setInsightFeedback(null), 4000);
    }, 1000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `📊 *SafarIndiaCabs Vendor Performance Report*\n` +
      `👤 Operator: ${userProfile.name} (${userProfile.phone})\n` +
      `🚗 Registered Vehicle: ${userProfile.attachedVehicle.model} [${userProfile.attachedVehicle.plateNumber}]\n` +
      `💰 30-Day Gross Volume: ₹${totalVolume.toLocaleString('en-IN')}\n` +
      `💵 Net Commission Earned: ₹${totalCommission.toLocaleString('en-IN')}\n` +
      `🛣️ Top High-Margin Corridor: Haldwani ⟶ New Delhi (Avg ₹4,200)\n` +
      `🛡️ Escrow Payout Safety: 100% Guaranteed via SafarIndiaCabs Escrow`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-4 pb-24 max-w-lg mx-auto px-3 pt-2">
      
      {/* 1. Header Banner & Filter Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white rounded-2xl p-4 shadow-md relative overflow-hidden border border-amber-500/20">
        <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-start justify-between relative z-10">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 border border-amber-400/30">
                <Sparkles className="w-3 h-3 text-amber-300" />
                Live Vendor BI & Analytics
              </span>
              {userProfile.membershipPlan === 'platinum' && (
                <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-tight flex items-center gap-0.5 shadow-xs">
                  <Award className="w-3 h-3" />
                  Platinum VIP
                </span>
              )}
            </div>
            <h1 className="text-xl font-black text-white mt-1 tracking-tight">
              Performance & Yield Radar
            </h1>
            <p className="text-xs text-slate-300 mt-0.5">
              Actionable insights on booking velocity, escrow commissions & hot routes.
            </p>
          </div>

          <button
            onClick={handleShareWhatsApp}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all border border-white/10 flex items-center gap-1"
            title="Share Performance on WhatsApp"
          >
            <Share2 className="w-4 h-4 text-amber-300" />
            <span className="text-[11px] font-semibold hidden sm:inline">Share</span>
          </button>
        </div>

        {/* Timeframe Selector Pill */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
          <div className="flex items-center gap-1 bg-black/30 p-1 rounded-xl border border-white/10">
            {(['7D', '30D', '6M'] as Timeframe[]).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  timeframe === tf
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {tf === '7D' ? 'Last 7 Days' : tf === '30D' ? 'Last 30 Days' : '6 Months'}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportStatement}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-bold transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Generating...' : 'Statement'}</span>
          </button>
        </div>
      </div>

      {/* Insight notification banner if feedback active */}
      {insightFeedback && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{insightFeedback}</span>
        </div>
      )}

      {/* 2. Key Metrics Grid (KPI Cards) */}
      <div className="grid grid-cols-2 gap-2.5">
        
        {/* Metric 1: Gross Trip Volume */}
        <div className="bg-white rounded-xl p-3 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-semibold">Gross Trip Volume</span>
            <div className="w-6 h-6 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <IndianRupee className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-lg font-black text-slate-900 tracking-tight">
            ₹{totalVolume.toLocaleString('en-IN')}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+24.8% vs prev period</span>
          </div>
        </div>

        {/* Metric 2: Net Commission Earned */}
        <div className="bg-white rounded-xl p-3 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-semibold">Commission Earned</span>
            <div className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-lg font-black text-emerald-600 tracking-tight">
            ₹{totalCommission.toLocaleString('en-IN')}
          </div>
          <div className="text-[10px] text-slate-500 mt-1 font-medium">
            3% mediator fee credited via Escrow
          </div>
        </div>

        {/* Metric 3: Completed Trips */}
        <div className="bg-white rounded-xl p-3 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-semibold">Completed Duties</span>
            <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <Car className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-lg font-black text-slate-900 tracking-tight">
            {totalCompleted} Trips
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-blue-600 mt-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>97.2% fulfillment rate</span>
          </div>
        </div>

        {/* Metric 4: Avg Trip Ticket / Platinum Cut */}
        <div className="bg-white rounded-xl p-3 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-semibold">Avg Ticket Fare</span>
            <div className="w-6 h-6 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
              <Zap className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-lg font-black text-slate-900 tracking-tight">
            ₹{avgTripValue.toLocaleString('en-IN')}
          </div>
          <div className="text-[10px] text-purple-700 font-semibold mt-1 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-purple-600" />
            <span>Escrow Protected</span>
          </div>
        </div>

      </div>

      {/* 3. D3 Booking Trends Chart Container */}
      <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs relative">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              Duty Booking Velocity & Trends
            </h2>
            <p className="text-[11px] text-slate-500">
              Daily volume of published vs completed client leads (D3 Vector Curve)
            </p>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-bold">
            <span className="flex items-center gap-1 text-amber-600">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Total
            </span>
            <span className="flex items-center gap-1 text-emerald-600">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Completed
            </span>
          </div>
        </div>

        {/* SVG Container with Tooltip */}
        <div className="relative w-full overflow-hidden">
          <svg
            ref={trendSvgRef}
            className="w-full h-auto select-none"
            style={{ minHeight: '190px' }}
          />

          {activeTooltip && (
            <div
              className="absolute z-20 pointer-events-none bg-slate-900 text-white p-2 rounded-xl shadow-xl text-xs border border-slate-700 transform -translate-x-1/2 -translate-y-full mb-2"
              style={{ left: `${activeTooltip.x}px`, top: `${activeTooltip.y}px` }}
            >
              <div className="font-bold text-amber-400 text-[11px]">{activeTooltip.title}</div>
              <div className="font-extrabold text-white text-xs">{activeTooltip.value}</div>
              <div className="text-[10px] text-slate-300 mt-0.5">{activeTooltip.sub}</div>
            </div>
          )}
        </div>

        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span className="font-medium">Peak Surge Day: <strong className="text-slate-800">Saturday & Sunday</strong></span>
          <span className="text-amber-600 font-bold">Demand Spike: +38%</span>
        </div>
      </div>

      {/* 4. D3 Monthly Commission Earnings */}
      <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs relative">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <IndianRupee className="w-4 h-4 text-emerald-600" />
              Monthly Commission & Escrow Payouts
            </h2>
            <p className="text-[11px] text-slate-500">
              Gross commission vs Net payouts credited into vendor wallet (3% mediator cut)
            </p>
          </div>

          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
            Escrow Verified
          </span>
        </div>

        <div className="relative w-full overflow-hidden">
          <svg
            ref={commissionSvgRef}
            className="w-full h-auto select-none"
            style={{ minHeight: '180px' }}
          />
        </div>

        {/* Escrow safety explainer */}
        <div className="mt-2 bg-amber-50/70 border border-amber-200/60 rounded-xl p-2.5 text-[11px] text-amber-900 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Mediator Commission Escrow Guarantee:</span>
            <p className="text-amber-800 text-[10px] mt-0.5">
              When another vendor accepts your duty, commission is locked securely in SafarIndiaCabs Escrow. Once ride is completed by driver, funds release with 3% charge deduction automatically. If passenger cancels, 100% refund is processed.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Popular Intercity Corridors & Route Analysis */}
      <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-rose-500" />
              Popular Intercity Corridors
            </h2>
            <p className="text-[11px] text-slate-500">
              High-demand North India routes, average fares, and return cab opportunities
            </p>
          </div>

          <button
            onClick={() => onNavigateToMarket && onNavigateToMarket()}
            className="text-[11px] font-bold text-amber-600 hover:text-amber-700 flex items-center gap-0.5"
          >
            <span>Duty Mandi</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {POPULAR_ROUTES.map((route, idx) => {
            const isSelected = selectedRoute?.id === route.id;
            const progressPercent = Math.min(100, Math.round((route.tripsCount / 184) * 100));

            return (
              <div
                key={route.id}
                onClick={() => setSelectedRoute(isSelected ? null : route)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  isSelected 
                    ? 'border-amber-400 bg-amber-50/50 shadow-xs' 
                    : 'border-slate-100 hover:border-slate-200 bg-slate-50/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <div>
                      <div className="font-bold text-xs text-slate-900 flex items-center gap-1">
                        <span>{route.source}</span>
                        <span className="text-amber-500 font-black">⟶</span>
                        <span>{route.destination}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {route.distanceKm} km · {route.topVehicle} · ₹{route.suggestedRatePerKm}/km
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-black text-slate-900">
                      ₹{route.avgFare.toLocaleString('en-IN')}
                    </div>
                    <span className={`inline-block px-1.5 py-0.5 text-[9px] font-bold rounded-md uppercase tracking-tight ${
                      route.returnCabDemand === 'Surge'
                        ? 'bg-rose-100 text-rose-700'
                        : route.returnCabDemand === 'High'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {route.returnCabDemand} Return
                    </span>
                  </div>
                </div>

                {/* Progress Bar for Density */}
                <div className="mt-2.5">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                    <span>Demand Density: <strong>{route.tripsCount} bookings</strong></span>
                    <span className="text-emerald-600 font-bold">+{route.growthPercent}% MoM</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Collapsible Actionable Details for Selected Route */}
                {isSelected && (
                  <div className="mt-3 pt-2.5 border-t border-amber-200/80 text-[11px] text-slate-700 flex items-center justify-between bg-white p-2 rounded-lg">
                    <div>
                      <span className="font-bold text-slate-900">Avg Commission: </span>
                      <span className="text-emerald-600 font-bold">₹{route.avgCommission}</span>
                      <span className="text-slate-400 mx-1">|</span>
                      <span>Empty Return Rate: ~₹{Math.round(route.avgFare * 0.75)}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {onOpenPostKhaliGaadi && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenPostKhaliGaadi();
                          }}
                          className="px-2 py-1 rounded bg-slate-900 text-white text-[10px] font-bold hover:bg-slate-800"
                        >
                          Post Return Cab
                        </button>
                      )}
                      {onNavigateToMarket && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigateToMarket(route.source.split(' ')[0]);
                          }}
                          className="px-2 py-1 rounded bg-amber-500 text-slate-950 text-[10px] font-bold hover:bg-amber-600"
                        >
                          View Duties
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Vehicle Category Demand & Fleet Utilization */}
      <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mb-2">
          <Car className="w-4 h-4 text-blue-500" />
          Vehicle Category Demand Distribution
        </h2>
        <p className="text-[11px] text-slate-500 mb-3">
          Market share of cab types requested by travel agents & tour operators
        </p>

        <div className="flex items-center justify-between gap-2">
          {/* Donut Chart */}
          <div className="w-36 h-36 shrink-0 relative flex items-center justify-center">
            <svg ref={donutSvgRef} className="w-36 h-36 select-none" />
          </div>

          {/* Legend */}
          <div className="flex-1 space-y-1.5">
            {VEHICLE_DEMAND_SHARE.map((item) => (
              <div key={item.category} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="truncate font-semibold text-slate-700">{item.category}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-extrabold text-slate-900">{item.percentage}%</span>
                  <span className="text-[9px] text-slate-400 block">Avg ₹{item.avgTicketSize}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Attached Vehicle Alignment */}
        <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
              DL
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                Your Attached Vehicle: {userProfile.attachedVehicle.model}
              </div>
              <div className="text-[10px] text-slate-500">
                Category: <strong>{userProfile.attachedVehicle.category}</strong> · Plate: {userProfile.attachedVehicle.plateNumber}
              </div>
            </div>
          </div>

          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
            Top Demand Match (46%)
          </span>
        </div>
      </div>

      {/* 7. Actionable Operator Insights & High-Yield Recommendations */}
      <div className="bg-gradient-to-b from-amber-50/60 to-white rounded-2xl p-3.5 border border-amber-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Actionable Vendor Intelligence
              </h2>
              <p className="text-[11px] text-slate-600">
                High-yield tips to maximize your fleet revenue and avoid empty dry runs
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2.5">
          {VENDOR_ACTIONABLE_INSIGHTS.map((insight) => (
            <div
              key={insight.id}
              className="bg-white p-3 rounded-xl border border-slate-200/70 shadow-xs space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-tight ${
                    insight.type === 'surge'
                      ? 'bg-rose-100 text-rose-700'
                      : insight.type === 'opportunity'
                      ? 'bg-emerald-100 text-emerald-700'
                      : insight.type === 'savings'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {insight.type.toUpperCase()}
                  </span>
                  <h3 className="text-xs font-bold text-slate-900">
                    {insight.title}
                  </h3>
                </div>

                <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 shrink-0">
                  {insight.impact}
                </span>
              </div>

              <p className="text-[11px] text-slate-600 leading-relaxed">
                {insight.description}
              </p>

              <div className="flex items-center justify-between pt-1">
                {insight.recommendedRoute ? (
                  <span className="text-[10px] font-semibold text-slate-500 flex items-center gap-1">
                    <Compass className="w-3 h-3 text-slate-400" />
                    Target: {insight.recommendedRoute}
                  </span>
                ) : <span />}

                <button
                  onClick={() => {
                    if (insight.type === 'surge' && onOpenPostKhaliGaadi) {
                      onOpenPostKhaliGaadi();
                    } else if (insight.type === 'savings' && onOpenSubscriptionModal) {
                      onOpenSubscriptionModal();
                    } else if (insight.type === 'pricing' && onOpenFilterRadar) {
                      onOpenFilterRadar();
                    } else if (onNavigateToMarket) {
                      onNavigateToMarket(insight.recommendedRoute?.split(' ')[0] || '');
                    }
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold transition-all flex items-center gap-1"
                >
                  <span>{insight.actionLabel}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8. Subscription Savings Calculator & Plan Upgrade Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 p-3.5 rounded-2xl shadow-md flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-amber-950">
            <Award className="w-4 h-4" />
            <span>Platform Escrow Commission Cut</span>
          </div>
          <div className="text-sm font-black text-slate-950 mt-0.5">
            {userProfile.membershipPlan === 'platinum' ? '2% Discounted Fee (VIP Active)' : '3% Standard Partner Fee'}
          </div>
          <p className="text-[11px] text-amber-950/80 mt-0.5">
            {userProfile.membershipPlan === 'platinum'
              ? 'You save ₹10 per ₹1,000 commission on every accepted duty!'
              : 'Upgrade to Platinum Premium (₹799/mo) to unlock 2% fee cut & priority bids.'}
          </p>
        </div>

        {onOpenSubscriptionModal && (
          <button
            onClick={onOpenSubscriptionModal}
            className="px-3 py-1.5 rounded-xl bg-slate-950 text-amber-400 font-black text-xs hover:bg-slate-900 active:scale-95 transition-all shadow-sm shrink-0 ml-2"
          >
            {userProfile.membershipPlan === 'platinum' ? 'VIP Status' : 'Upgrade Plan'}
          </button>
        )}
      </div>

    </div>
  );
};
