import { useEffect, useState } from "react";
import adminApi from "../../services/admin.service";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await adminApi.getStats();
        setStats(res.data);
      } catch (err) {
        console.error("Dashboard stats failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { 
      label: "Total Users", 
      value: stats?.total_users, 
      icon: "group", 
      trend: "+12%", 
      color: "from-blue-600/20 to-indigo-600/20",
      iconColor: "text-blue-500"
    },
    { 
      label: "Active Now", 
      value: stats?.active_users, 
      icon: "bolt", 
      trend: "Live", 
      color: "from-emerald-600/20 to-teal-600/20",
      iconColor: "text-emerald-500"
    },
    { 
      label: "Total Resumes", 
      value: stats?.total_resumes, 
      icon: "description", 
      trend: "+5.4%", 
      color: "from-purple-600/20 to-pink-600/20",
      iconColor: "text-purple-500"
    },
  ];

  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            System <span className="text-[#135bec]">Insights</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Real-time performance metrics and user activity.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-all">
          <span className="material-symbols-outlined text-lg">calendar_today</span>
          Last 30 Days
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((card, index) => (
          <div 
            key={index} 
            className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1"
          >
            <div className={`absolute -right-2 -top-2 w-24 h-24 rounded-full blur-3xl bg-gradient-to-br ${card.color} opacity-40 group-hover:opacity-80 transition-opacity`} />
            
            <div className="relative flex justify-between items-start">
              <div className="space-y-2">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  {card.label}
                </p>
                <h3 className="text-4xl font-black text-slate-900 dark:text-white tabular-nums">
                  {loading ? (
                    <div className="h-10 w-24 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-lg" />
                  ) : (
                    card.value?.toLocaleString()
                  )}
                </h3>
              </div>
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 ${card.iconColor}`}>
                <span className="material-symbols-outlined text-2xl">{card.icon}</span>
              </div>
            </div>

            <div className="relative mt-6 flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                card.trend === 'Live' 
                ? 'bg-emerald-100 text-emerald-700 animate-pulse' 
                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
              }`}>
                {card.trend}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">since last period</span>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold text-slate-800 dark:text-slate-200">User Growth</h4>
            <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-slate-600">more_horiz</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dummyData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#135bec" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#135bec" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="value" stroke="#135bec" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar Health Stats */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-slate-900 dark:bg-[#135bec] p-6 rounded-3xl text-white relative overflow-hidden">
            <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-9xl opacity-10">security</span>
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-400">check_circle</span>
              System Health
            </h4>
            <div className="space-y-5 relative z-10">
              <HealthMetric label="Server Load" progress="42%" />
              <HealthMetric label="DB Storage" progress="68%" />
              <HealthMetric label="API Uptime" progress="99.9%" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-3">
              <ActionButton icon="person_add" label="Add User" />
              <ActionButton icon="settings" label="Config" />
              <ActionButton icon="database" label="Backup" />
              <ActionButton icon="mail" label="Email All" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components
const HealthMetric = ({ label, progress }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between text-xs font-bold uppercase tracking-tighter opacity-80">
      <span>{label}</span>
      <span>{progress}</span>
    </div>
    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
      <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: progress }} />
    </div>
  </div>
);

const ActionButton = ({ icon, label }) => (
  <button className="flex flex-col items-center justify-center p-3 rounded-2xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors gap-1">
    <span className="material-symbols-outlined text-slate-500">{icon}</span>
    <span className="text-[10px] font-black uppercase text-slate-400">{label}</span>
  </button>
);

const dummyData = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 500 },
  { name: 'Thu', value: 280 },
  { name: 'Fri', value: 590 },
  { name: 'Sat', value: 320 },
  { name: 'Sun', value: 480 },
];

export default AdminDashboard;