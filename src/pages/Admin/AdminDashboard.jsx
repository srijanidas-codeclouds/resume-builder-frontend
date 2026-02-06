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
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [membershipData, setMembershipData] = useState([]);
  const [resumeTrends, setResumeTrends] = useState([]);
  const [engagementMetrics, setEngagementMetrics] = useState(null);
  const [topUsers, setTopUsers] = useState([]);
  const [systemHealth, setSystemHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError(null);

        const [
          statsRes,
          growthRes,
          revenueRes,
          membershipRes,
          resumeRes,
          engagementRes,
          topUsersRes,
          healthRes,
        ] = await Promise.all([
          adminApi.getStats(),
          adminApi.getUserGrowth().catch(() => ({ data: [] })),
          adminApi.getRevenueData().catch(() => ({ data: [] })),
          adminApi.getMembershipDistribution().catch(() => ({ data: [] })),
          adminApi.getResumeCreationTrends().catch(() => ({ data: [] })),
          adminApi.getEngagementMetrics().catch(() => ({ data: null })),
          adminApi.getTopUsers().catch(() => ({ data: [] })),
          adminApi.getSystemHealth().catch(() => ({ data: null })),
        ]);

        setStats(statsRes.data);
        setChartData(growthRes.data || []);
        setRevenueData(revenueRes.data || []);
        setMembershipData(membershipRes.data || []);
        setResumeTrends(resumeRes.data || []);
        setEngagementMetrics(engagementRes.data);
        setTopUsers(topUsersRes.data || []);
        setSystemHealth(healthRes.data);
        setLastRefresh(new Date());
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();

    // Changed from 30 seconds to 1 hour (3600000ms) for better performance
    const interval = setInterval(fetchDashboard, 3600000);
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

  console.log("Stats:", stats);

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
    {
      label: "Premium Users",
      value: stats?.premium_users ?? 0,
      icon: "workspace_premium",
      trend: stats?.conversion_rate ?? "0%",
      color: "from-amber-600/20 to-orange-600/20",
      iconColor: "text-amber-500",
    },
  ];

  const saasMetrics = [
    {
      label: "Conversion Rate",
      value: stats?.conversion_rate ?? "0%",
      icon: "trending_up",
      color: "text-emerald-600",
    },
    {
      label: "Churn Rate",
      value: stats?.churn_rate ?? "0%",
      icon: "trending_down",
      color: "text-red-600",
    },
    {
      label: "Avg Resumes/User",
      value: stats?.avg_resumes_per_user ?? 0,
      icon: "functions",
      color: "text-blue-600",
    },
    {
      label: "MAU",
      value: engagementMetrics?.mau ?? 0,
      icon: "calendar_month",
      color: "text-purple-600",
    },
  ];

  const healthMetrics = [
    { label: "Server Load", progress: systemHealth?.server_load ?? "0%" },
    { label: "DB Storage", progress: systemHealth?.db_storage ?? "0%" },
    { label: "API Uptime", progress: systemHealth?.api_uptime ?? "99.9%" },
    {
      label: "Cache",
      progress: systemHealth?.cache_status === "operational" ? "100%" : "0%",
    },
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
            Real-time performance metrics · Last refresh:{" "}
            {lastRefresh.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {loading && (
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <div className="w-2 h-2 bg-[#135bec] rounded-full animate-pulse" />
              Syncing…
            </div>
          )}
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">refresh</span>
          </button>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <div
            key={i}
            className="relative bg-white dark:bg-slate-900 border p-6 rounded-2xl overflow-hidden"
          >
            <div
              className={`absolute -top-2 -right-2 w-24 h-24 blur-3xl bg-linear-to-br ${card.color}`}
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
                <span className="text-emerald-600 animate-pulse">● Live</span>
              ) : (
                <span className="text-slate-600 dark:text-slate-400">
                  {card.trend} from last period
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* SaaS Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {saasMetrics.map((metric, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-900 border p-4 rounded-xl flex items-center gap-3"
          >
            <span className={`material-symbols-outlined text-2xl ${metric.color}`}>
              {metric.icon}
            </span>
            <div>
              <p className="text-xs text-slate-500 font-semibold">
                {metric.label}
              </p>
              <p className="text-xl font-black">{loading ? "…" : metric.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1: User Growth + Revenue */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 border p-6 rounded-3xl">
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-500">
              trending_up
            </span>
            User Growth (7 Days)
          </h4>
          <div className="h-75">
            {loading ? (
              <LoadingSpinner />
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
                  <YAxis />
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

        <div className="bg-white dark:bg-slate-900 border p-6 rounded-3xl">
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-500">
              attach_money
            </span>
            Monthly Recurring Revenue
          </h4>
          <div className="h-75">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="mrr"
                    stroke="#10b981"
                    strokeWidth={3}
                    name="MRR ($)"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Charts Row 2: Resume Trends + Membership Distribution */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border p-6 rounded-3xl">
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-purple-500">
              insert_chart
            </span>
            Resume Creation Trends (14 Days)
          </h4>
          <div className="h-75">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={resumeTrends}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="resumes" fill="#a855f7" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border p-6 rounded-3xl">
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-500">
              donut_large
            </span>
            Membership Split
          </h4>
          <div className="h-75">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={membershipData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderPieLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {membershipData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Row: Top Users + System Health */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border p-6 rounded-3xl">
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-500">
              leaderboard
            </span>
            Top Users by Resumes
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-xs font-bold text-slate-500">
                  <th className="pb-3">User</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Resumes</th>
                  <th className="pb-3">Plan</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center">
                      <LoadingSpinner />
                    </td>
                  </tr>
                ) : topUsers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-500">
                      No data available
                    </td>
                  </tr>
                ) : (
                  topUsers.map((user, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="py-3 font-semibold">{user.name}</td>
                      <td className="py-3 text-sm text-slate-600">
                        {user.email}
                      </td>
                      <td className="py-3">
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-bold">
                          {user.resumes}
                        </span>
                      </td>
                      <td className="py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            user.membership === "premium"
                              ? "bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                          }`}
                        >
                          {user.membership || "free"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-900 text-white p-6 rounded-3xl">
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-400">
              check_circle
            </span>
            System Health
          </h4>
          <div className="space-y-4 mb-6">
            {healthMetrics.map((m, i) => (
              <HealthMetric
                key={i}
                label={m.label}
                progress={m.progress}
                loading={loading}
              />
            ))}
          </div>
          <div className="pt-4 border-t border-white/10 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Status</span>
              <span className="text-emerald-400 font-bold">
                {systemHealth?.status ?? "Unknown"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Last Backup</span>
              <span className="font-semibold">
                {systemHealth?.last_backup ?? "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="bg-linear-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950 border p-6 rounded-3xl">
        <h4 className="font-bold mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-blue-500">
            psychology
          </span>
          Engagement Insights
        </h4>
        <div className="grid md:grid-cols-5 gap-4">
          {[
            { label: "Daily Active Users", value: engagementMetrics?.dau ?? 0 },
            { label: "Weekly Active Users", value: engagementMetrics?.wau ?? 0 },
            {
              label: "Monthly Active Users",
              value: engagementMetrics?.mau ?? 0,
            },
            {
              label: "Avg Session",
              value: engagementMetrics?.avg_session_duration ?? "0m",
            },
            {
              label: "Bounce Rate",
              value: engagementMetrics?.bounce_rate ?? "0%",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-800 p-4 rounded-xl text-center"
            >
              <p className="text-2xl font-black">
                {loading ? "…" : item.value}
              </p>
              <p className="text-xs text-slate-500 font-semibold mt-1">
                {item.label}
              </p>
            </div>
          ))}
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
    <div className="h-1.5 bg-white/20 rounded-full overflow-hidden mt-2">
      <div
        className="h-full bg-white transition-all duration-500"
        style={{ width: loading ? "0%" : progress }}
      />
    </div>
  </div>
);

const LoadingSpinner = () => (
  <div className="h-full flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-slate-200 dark:border-slate-700 border-t-[#135bec] rounded-full animate-spin" />
  </div>
);

const renderPieLabel = ({ name, percent }) => {
  return `${name}: ${(percent * 100).toFixed(0)}%`;
};

export default AdminDashboard;