import AdminWrapper from '@/Components/AdminComponents/AdminWrapper'
import React, { useState, useEffect } from 'react'

// ── Simulated API data (replace with your Laravel API calls via axios/fetch) ──
const MOCK = {
  overview: {
    totalRevenue: 284750,
    totalBookings: 1243,
    occupancyRate: 78,
    avgNightlyRate: 312,
    revenueDelta: +18.4,
    bookingsDelta: +12.1,
    occupancyDelta: +5.3,
    rateDelta: -2.8,
  },
  revenueMonthly: [
    { month: 'Aug', value: 18200 },
    { month: 'Sep', value: 22400 },
    { month: 'Oct', value: 19800 },
    { month: 'Nov', value: 15600 },
    { month: 'Dec', value: 31200 },
    { month: 'Jan', value: 24100 },
    { month: 'Feb', value: 20900 },
    { month: 'Mar', value: 26800 },
    { month: 'Apr', value: 29300 },
    { month: 'May', value: 34100 },
    { month: 'Jun', value: 38900 },
    { month: 'Jul', value: 47250 },
  ],
  properties: [
    { id: 1, name: 'Azure Cliff Villa',   type: 'Villa',  occupancy: 92, revenue: 68400,  bookings: 47,  status: 'active',   rooms: 6  },
    { id: 2, name: 'Palm Shore Suites',   type: 'Hotel',  occupancy: 81, revenue: 52100,  bookings: 312, status: 'active',   rooms: 24 },
    { id: 3, name: 'Coral Bay Retreat',   type: 'Villa',  occupancy: 67, revenue: 41200,  bookings: 28,  status: 'active',   rooms: 4  },
    { id: 4, name: 'Indigo Garden Lodge', type: 'Hotel',  occupancy: 74, revenue: 61800,  bookings: 198, status: 'active',   rooms: 18 },
    { id: 5, name: 'Sunset Ridge Villa',  type: 'Villa',  occupancy: 55, revenue: 29300,  bookings: 19,  status: 'inactive', rooms: 5  },
    { id: 6, name: 'Marina Grand Hotel',  type: 'Hotel',  occupancy: 88, revenue: 95200,  bookings: 521, status: 'active',   rooms: 42 },
  ],
  bookingsByCategory: [
    { label: 'Direct',     value: 38, color: '#C9A96E' },
    { label: 'Online OTA', value: 31, color: '#2D5F5D' },
    { label: 'Corporate',  value: 18, color: '#8B7355' },
    { label: 'Walk-in',    value: 13, color: '#D4C5A9' },
  ],
  recentBookings: [
    { id: 'BK-2841', guest: 'Eleanor Voss',    property: 'Azure Cliff Villa',   checkin: '18 Jul', checkout: '23 Jul', nights: 5, total: 4250, status: 'confirmed'  },
    { id: 'BK-2840', guest: 'Marcus Chen',     property: 'Marina Grand Hotel',  checkin: '17 Jul', checkout: '20 Jul', nights: 3, total: 1140, status: 'checked-in' },
    { id: 'BK-2839', guest: 'Isabelle Dubois', property: 'Palm Shore Suites',   checkin: '16 Jul', checkout: '22 Jul', nights: 6, total: 2820, status: 'confirmed'  },
    { id: 'BK-2838', guest: 'Rafael Torres',   property: 'Coral Bay Retreat',   checkin: '15 Jul', checkout: '19 Jul', nights: 4, total: 3680, status: 'completed'  },
    { id: 'BK-2837', guest: 'Amara Osei',      property: 'Indigo Garden Lodge', checkin: '14 Jul', checkout: '17 Jul', nights: 3, total: 1290, status: 'completed'  },
  ],
}

// ── Utilities ─────────────────────────────────────────────────────────────────
const fmt     = (n) => n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${n}`
const fmtFull = (n) => `$${n.toLocaleString()}`

function useCountUp(target, duration = 1400) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setVal(target); clearInterval(timer) }
      else setVal(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration])
  return val
}

// ── Sparkline ─────────────────────────────────────────────────────────────────
function Sparkline({ data, color = '#C9A96E', height = 48, width = 120 }) {
  const max   = Math.max(...data.map(d => d.value))
  const min   = Math.min(...data.map(d => d.value))
  const range = max - min || 1
  const pts   = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((d.value - min) / range) * (height - 8) - 4
    return `${x},${y}`
  })
  const area = [`0,${height}`, ...pts, `${width},${height}`].join(' ')
  const gradId = `sg-${color.replace('#', '')}`

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0"    />
        </linearGradient>
      </defs>
      <polygon points={area}          fill={`url(#${gradId})`} />
      <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ── Revenue Bar Chart ─────────────────────────────────────────────────────────
function RevenueChart({ data }) {
  const max = Math.max(...data.map(d => d.value))
  const [hovered, setHovered] = useState(null)

  return (
    <div className="flex items-end gap-1.5 h-36 w-full mt-2">
      {data.map((d, i) => {
        const pct   = (d.value / max) * 100
        const isHot = i >= data.length - 3
        return (
          <div key={d.month}
            className="flex flex-col items-center flex-1 gap-1 cursor-pointer"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}>
            {hovered === i && (
              <span className="text-[10px] font-semibold text-amber-300 whitespace-nowrap -mb-1">
                {fmt(d.value)}
              </span>
            )}
            <div className="w-full rounded-t-sm transition-all duration-300"
              style={{
                height: `${pct}%`,
                background: hovered === i
                  ? 'linear-gradient(to top, #C9A96E, #e8c98a)'
                  : isHot
                    ? 'linear-gradient(to top, #8B6B3D, #C9A96E)'
                    : 'linear-gradient(to top, #1a2e2d, #2D5F5D)',
              }} />
            <span className="text-[9px] text-stone-500 font-medium">{d.month}</span>
          </div>
        )
      })}
    </div>
  )
}

// ── Donut Chart ───────────────────────────────────────────────────────────────
function DonutChart({ data }) {
  const total       = data.reduce((s, d) => s + d.value, 0)
  const cx = 60, cy = 60, r = 46, stroke = 16
  const circumference = 2 * Math.PI * r
  const [hovered, setHovered] = useState(null)
  let cumulative = 0

  return (
    <div className="flex items-center gap-6">
      <svg width="120" height="120" viewBox="0 0 120 120">
        {data.map((d, i) => {
          const pct    = d.value / total
          const dash   = pct * circumference
          const gap    = circumference - dash
          const offset = circumference - cumulative * circumference
          cumulative  += pct
          return (
            <circle key={i} cx={cx} cy={cy} r={r}
              fill="none" stroke={d.color}
              strokeWidth={hovered === i ? stroke + 3 : stroke}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={offset}
              strokeLinecap="butt"
              transform={`rotate(-90 ${cx} ${cy})`}
              className="transition-all duration-300 cursor-pointer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            />
          )
        })}
        <text x={cx} y={cy - 6} textAnchor="middle" fill="#e8e0d0" fontSize="14" fontWeight="700">
          {hovered !== null ? `${data[hovered].value}%` : `${total}%`}
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" fill="#8a7f72" fontSize="8">
          {hovered !== null ? data[hovered].label : 'total'}
        </text>
      </svg>
      <div className="flex flex-col gap-2">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2 cursor-pointer"
            onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
            <span className="text-xs text-stone-400">{d.label}</span>
            <span className="text-xs font-semibold text-stone-200 ml-auto pl-3">{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Status Badge ──────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    confirmed:    'bg-amber-900/40 text-amber-300 border border-amber-700/40',
    'checked-in': 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/40',
    completed:    'bg-stone-700/40 text-stone-400 border border-stone-600/40',
    cancelled:    'bg-red-900/40 text-red-300 border border-red-700/40',
    active:       'bg-emerald-900/40 text-emerald-300 border border-emerald-700/40',
    inactive:     'bg-stone-700/40 text-stone-400 border border-stone-600/40',
  }
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${map[status] ?? ''}`}>
      {status}
    </span>
  )
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, prefix = '', suffix = '', delta, icon, sparkData, color }) {
  const animated = useCountUp(typeof value === 'number' ? value : 0)
  const positive = delta >= 0

  return (
    <div className="relative bg-stone-900 border border-stone-800 rounded-2xl p-5 overflow-hidden group hover:border-stone-700 transition-all duration-300">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 30% 50%, ${color}12 0%, transparent 70%)` }} />
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs text-stone-500 font-medium tracking-widest uppercase">{label}</p>
          <p className="text-2xl font-bold text-stone-100 mt-1 tracking-tight">
            {prefix}
            {typeof value === 'number' ? animated.toLocaleString() : value}
            {suffix}
          </p>
        </div>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}20` }}>
          <span className="text-lg">{icon}</span>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div className="flex items-center gap-1.5">
          <span className={`text-xs font-semibold ${positive ? 'text-emerald-400' : 'text-red-400'}`}>
            {positive ? '↑' : '↓'} {Math.abs(delta)}%
          </span>
          <span className="text-[10px] text-stone-600">vs last month</span>
        </div>
        {sparkData && <Sparkline data={sparkData} color={color} />}
      </div>
    </div>
  )
}

// ── Occupancy Bar ─────────────────────────────────────────────────────────────
function OccupancyBar({ value }) {
  const barColor = value >= 85 ? '#22c55e' : value >= 65 ? '#C9A96E' : '#ef4444'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-stone-800 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700"
          style={{ width: `${value}%`, background: barColor }} />
      </div>
      <span className="text-xs text-stone-400 font-semibold w-8 text-right">{value}%</span>
    </div>
  )
}

// ── Page Content ──────────────────────────────────────────────────────────────
function AnalyticsContent() {
  const [dateRange, setDateRange] = useState('This Year')
  const { overview, revenueMonthly, properties, bookingsByCategory, recentBookings } = MOCK
  const sparkSeed = revenueMonthly.slice(-6)

  return (
    <div className="space-y-6 p-6">

      {/* Welcome strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-stone-100">Good morning, Admin ☀️</h1>
          <p className="text-sm text-stone-500 mt-0.5">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            &nbsp;· {properties.filter(p => p.status === 'active').length} active properties
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <select
            value={dateRange}
            onChange={e => setDateRange(e.target.value)}
            className="bg-stone-800 border border-stone-700 text-stone-300 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-amber-600 cursor-pointer">
            {['This Month', 'Last 3 Months', 'This Year', 'All Time'].map(r => (
              <option key={r}>{r}</option>
            ))}
          </select>
          <button className="px-4 py-2 bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-xl text-xs font-semibold text-stone-300 transition-colors">
            ↓ Export
          </button>
          <button className="px-4 py-2 bg-amber-600 hover:bg-amber-500 rounded-xl text-xs font-semibold text-white transition-colors shadow">
            + New Booking
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Revenue"    value={overview.totalRevenue}    prefix="$" delta={overview.revenueDelta}   icon="💰" sparkData={sparkSeed}                                                         color="#C9A96E" />
        <StatCard label="Total Bookings"   value={overview.totalBookings}              delta={overview.bookingsDelta}   icon="📋" sparkData={sparkSeed.map(d => ({ ...d, value: Math.floor(d.value / 30) }))} color="#2D5F5D" />
        <StatCard label="Occupancy Rate"   value={overview.occupancyRate}   suffix="%" delta={overview.occupancyDelta} icon="🏨" sparkData={sparkSeed.map(d => ({ ...d, value: 60 + (d.value % 30) }))}      color="#8B7355" />
        <StatCard label="Avg Nightly Rate" value={overview.avgNightlyRate}  prefix="$" delta={overview.rateDelta}      icon="🌙" sparkData={sparkSeed.map(d => ({ ...d, value: 280 + (d.value % 80) }))}     color="#5B8C85" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-stone-900 border border-stone-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-1">
            <div>
              <p className="text-xs text-stone-500 uppercase tracking-widest font-medium">Monthly Revenue</p>
              <p className="text-xl font-bold text-stone-100">{fmtFull(overview.totalRevenue)}</p>
            </div>
            <span className="text-xs bg-emerald-900/40 text-emerald-400 border border-emerald-800/40 px-2 py-1 rounded-lg font-semibold">
              ↑ {overview.revenueDelta}% YoY
            </span>
          </div>
          <RevenueChart data={revenueMonthly} />
        </div>

        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5">
          <p className="text-xs text-stone-500 uppercase tracking-widest font-medium mb-4">Booking Sources</p>
          <DonutChart data={bookingsByCategory} />
        </div>
      </div>

      {/* Properties Table */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-800">
          <p className="text-sm font-semibold text-stone-200">Properties Overview</p>
          <span className="text-xs text-stone-500">{properties.length} total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-800">
                {['Property', 'Type', 'Rooms', 'Occupancy', 'Bookings', 'Revenue', 'Status'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold text-stone-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {properties.map((p, i) => (
                <tr key={p.id} className="border-b border-stone-800/50 hover:bg-stone-800/30 transition-colors cursor-pointer group">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                        style={{ background: ['#C9A96E20','#2D5F5D20','#8B735520','#5B8C8520','#C9A96E20','#2D5F5D20'][i] }}>
                        {p.type === 'Villa' ? '🏡' : '🏨'}
                      </div>
                      <span className="font-medium text-stone-200 text-sm group-hover:text-amber-300 transition-colors">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5"><span className="text-xs text-stone-400 font-medium">{p.type}</span></td>
                  <td className="px-5 py-3.5"><span className="text-xs text-stone-400">{p.rooms}</span></td>
                  <td className="px-5 py-3.5 min-w-[120px]"><OccupancyBar value={p.occupancy} /></td>
                  <td className="px-5 py-3.5"><span className="text-sm font-semibold text-stone-300">{p.bookings}</span></td>
                  <td className="px-5 py-3.5"><span className="text-sm font-semibold text-amber-400">{fmtFull(p.revenue)}</span></td>
                  <td className="px-5 py-3.5"><StatusBadge status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-800">
          <p className="text-sm font-semibold text-stone-200">Recent Bookings</p>
          <button className="text-xs text-amber-500 hover:text-amber-400 font-semibold transition-colors">View all →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-800">
                {['Booking ID', 'Guest', 'Property', 'Stay', 'Nights', 'Total', 'Status'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold text-stone-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentBookings.map(b => (
                <tr key={b.id} className="border-b border-stone-800/50 hover:bg-stone-800/30 transition-colors">
                  <td className="px-5 py-3.5"><span className="text-xs font-mono text-amber-500/80">{b.id}</span></td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-stone-700 flex items-center justify-center text-[10px] font-bold text-stone-300 flex-shrink-0">
                        {b.guest[0]}
                      </div>
                      <span className="text-stone-200 font-medium text-sm">{b.guest}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5"><span className="text-xs text-stone-400">{b.property}</span></td>
                  <td className="px-5 py-3.5"><span className="text-xs text-stone-400">{b.checkin} – {b.checkout}</span></td>
                  <td className="px-5 py-3.5"><span className="text-xs text-stone-400">{b.nights}n</span></td>
                  <td className="px-5 py-3.5"><span className="text-sm font-semibold text-stone-200">{fmtFull(b.total)}</span></td>
                  <td className="px-5 py-3.5"><StatusBadge status={b.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-stone-700 pb-2">
        © {new Date().getFullYear()} Hotel Admin · Data refreshes every 5 minutes
      </p>
    </div>
  )
}

// ── Default Export ─────────────────────────────────────────────────────────────
const Adminanalytics = () => {
  return (
    <AdminWrapper activeTab='analytics' >
      <AnalyticsContent />
    </AdminWrapper>
  )
}

export default Adminanalytics