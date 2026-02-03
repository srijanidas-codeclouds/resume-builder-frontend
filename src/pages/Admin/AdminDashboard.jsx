import { useEffect, useState } from "react";
import adminApi from "../../services/admin.service";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [systemHealth, setSystemHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError(null);

        const [statsRes, growthRes, healthRes] = await Promise.all([
          adminApi.getStats(),
          adminApi.getUserGrowth().catch(() => ({ data: [] })),
          adminApi.getSystemHealth().catch(() => ({ data: null })),
        ]);

        setStats(statsRes.data);
        setChartData(growthRes.data || []);
        setSystemHealth(healthRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();

    const interval = setInterval(fetchDashboard, 30000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <span className="material-symbols-outlined text-6xl text-red-500">
            error
          </span>
          <h2 className="text-2xl font-bold mt-4">Dashboard Error</h2>
          <p className="text-slate-500 mt-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-[#135bec] text-white rounded-xl font-bold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: "Total Users",
      value: stats?.total_users ?? 0,
      icon: "group",
      trend: stats?.user_growth_percentage ?? "+0%",
      color: "from-blue-600/20 to-indigo-600/20",
      iconColor: "text-blue-500",
    },
    {
      label: "Active Now",
      value: stats?.active_users ?? 0,
      icon: "bolt",
      trend: "Live",
      color: "from-emerald-600/20 to-teal-600/20",
      iconColor: "text-emerald-500",
    },
    {
      label: "Total Resumes",
      value: stats?.total_resumes ?? 0,
      icon: "description",
      trend: stats?.resume_growth_percentage ?? "+0%",
      color: "from-purple-600/20 to-pink-600/20",
      iconColor: "text-purple-500",
    },
  ];

  const healthMetrics = [
    { label: "Server Load", progress: systemHealth?.server_load ?? "0%" },
    { label: "DB Storage", progress: systemHealth?.db_storage ?? "0%" },
    { label: "API Uptime", progress: systemHealth?.api_uptime ?? "99.9%" },
  ];

  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black">
            System <span className="text-[#135bec]">Insights</span>
          </h1>
          <p className="text-slate-500 text-sm">
            Real-time performance metrics
          </p>
        </div>
        {loading && (
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <div className="w-2 h-2 bg-[#135bec] rounded-full animate-pulse" />
            Syncing…
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        {statCards.map((card, i) => (
          <div
            key={i}
            className="relative bg-white dark:bg-slate-900 border p-6 rounded-2xl overflow-hidden"
          >
            <div
              className={`absolute -top-2 -right-2 w-24 h-24 blur-3xl bg-gradient-to-br ${card.color}`}
            />
            <div className="relative flex justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">
                  {card.label}
                </p>
                <h3 className="text-4xl font-black mt-2">
                  {loading ? "…" : card.value.toLocaleString()}
                </h3>
              </div>
              <span
                className={`material-symbols-outlined text-3xl ${card.iconColor}`}
              >
                {card.icon}
              </span>
            </div>
            <div className="mt-4 text-xs font-bold">
              {card.trend === "Live" ? (
                <span className="text-emerald-600 animate-pulse">Live</span>
              ) : (
                <span>{card.trend} since last period</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Health */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border p-6 rounded-3xl">
          <h4 className="font-bold mb-4">User Growth</h4>
          <div className="h-[300px]">
            {loading ? (
              <div className="h-full flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-slate-200 border-t-[#135bec] rounded-full animate-spin" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="growth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#135bec" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#135bec" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis hide />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#135bec"
                    strokeWidth={3}
                    fill="url(#growth)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 bg-slate-900 text-white p-6 rounded-3xl">
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-400">
              check_circle
            </span>
            System Health
          </h4>
          <div className="space-y-4">
            {healthMetrics.map((m, i) => (
              <HealthMetric
                key={i}
                label={m.label}
                progress={m.progress}
                loading={loading}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ======================
   Subcomponents
   ====================== */

const HealthMetric = ({ label, progress, loading }) => (
  <div>
    <div className="flex justify-between text-xs font-bold">
      <span>{label}</span>
      <span>{loading ? "…" : progress}</span>
    </div>
    <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
      <div
        className="h-full bg-white transition-all"
        style={{ width: loading ? "0%" : progress }}
      />
    </div>
  </div>
);

export default AdminDashboard;