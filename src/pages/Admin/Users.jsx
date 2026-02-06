import { useEffect, useState, useCallback } from "react";
import adminApi from "../../services/admin.service";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import AddUserModal from "../../components/AddUserModal";
import { useNavigate } from "react-router";
import UserViewModal from "../../components/UserViewModal";
import { resumeService } from "../../services/resume.service";

const Users =  () => {
  const navigate = useNavigate();  
  const { canManageUsers, canDeleteUsers, canSuspendUsers } = useAuth();

  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [role, setRole] = useState("");
  const [membership, setMembership] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);

  const [total, setTotal] = useState(0);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // To distinguish between Add and Edit
  const [viewingUser, setViewingUser] = useState(null);

  // Debounce search to prevent excessive API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to page 1 on search
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.getUsers({ 
  search: debouncedSearch, 
  role, 
  membership, 
  page, 
  status 
});

      setUsers(res.data.data || []);
      setMeta(res.data.meta || {});
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, role, membership, page, status]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    setSelected([]);
  }, [page, debouncedSearch, role, status]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await adminApi.deleteUser(id);
      toast.success("User deleted successfully");
      fetchUsers();
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleViewProfile = async (user) => {
  if (!user || !user.id) {
    toast.error("Invalid user data");
    console.error("User ID is missing:", user);
    return;
  }
  setLoading(true);
  try {
    // Fetch fresh details including resume_count from backend
    const res = await adminApi.getUser(user.id); 
    setViewingUser(res.data);
  } catch (err) {
    toast.error("Could not fetch user details");
  } finally {
    setLoading(false);
  }
};

  const bulkAction = async (action) => {
    if (!selected.length || !action) return;
    
    const confirmMessage = `Apply "${action}" to ${selected.length} users?`;
    if (!confirm(confirmMessage)) return;

    try {
      // Assuming adminApi.bulkAction handles { action: 'delete' | 'suspend' | 'activate', ids: [...] }
      await adminApi.bulkAction({ action, ids: selected });
      toast.success(`Bulk ${action} successful`);
      setSelected([]);
      fetchUsers();
    } catch (err) {
      toast.error(`Bulk ${action} failed`);
    }
  };

  const exportCSV = () => {
    if (!users.length) return toast.error("No data to export");
    const rows = users.map(u => ({
      Name: u.name,
      Email: u.email,
      Role: u.role,
      Status: u.status,
      Joined: u.joined_at,
    }));

    const csv = [
      Object.keys(rows[0]).join(","),
      ...rows.map(r => Object.values(r).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users_export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleSelect = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === users.length) setSelected([]);
    else setSelected(users.map(u => u.id));
  };

//   const bulkAction = async (action) => {
//     if (!selected.length || !action) return;
//     try {
//       await adminApi.bulkAction({ action, ids: selected });
//       toast.success(`Bulk ${action} applied`);
//       setSelected([]);
//       fetchUsers();
//     } catch (err) {
//       toast.error("Bulk action failed");
//     }
//   };

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Page Heading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            User Management
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            View, filter, and manage all registered users on the platform.
          </p>
        </div>
        {canManageUsers && (
          <div className="flex gap-3">
            <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors shadow-sm">
              <span className="material-symbols-outlined text-lg">file_download</span>
                Export CSV
            </button>
            <button 
  onClick={() => setIsModalOpen(true)} // Added this!
  className="flex items-center gap-2 px-4 py-2 bg-[#135bec] text-white rounded-lg text-sm font-bold hover:bg-[#135bec]/90 transition-colors shadow-sm"
>
  <span className="material-symbols-outlined text-lg">person_add</span>
  Add New User
</button>
          </div>
        )}
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 mb-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 flex-1">
            <div className="relative w-full md:w-80">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                search
              </span>
              <input
                className="pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm w-full focus:ring-2 focus:ring-[#135bec] focus:border-transparent outline-none transition-all"
                placeholder="Search by name, email..."
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 w-full md:w-auto">
              <select 
                className="flex-1 md:flex-none h-9 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-3 text-xs font-bold border border-slate-200 dark:border-slate-700 outline-none"
                value={role}
                onChange={(e) => { setRole(e.target.value); setPage(1); }}
              >
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>

              <select 
                className="flex-1 md:flex-none h-9 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-3 text-xs font-bold border border-slate-200 dark:border-slate-700 outline-none"
                value={membership}
                onChange={(e) => { setMembership(e.target.value); setPage(1); }}
              >
                <option value="">Membership</option>
                <option value="free">Free</option>
                <option value="premium">Premium</option>
              </select>

              <select
                className="flex-1 md:flex-none h-9 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-3 text-xs font-bold border border-slate-200 dark:border-slate-700 outline-none"
                value={status}
                onChange={(e) => { setStatus(e.target.value); setPage(1); }}
              >
                <option value="">Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
              </select>
              {/* no of resumes */}
              <select
                className="flex-1 md:flex-none h-9 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-3 text-xs font-bold border border-slate-200 dark:border-slate-700 outline-none"
                value={users.resumes}
                onChange={(e) => { setResumes(e.target.value); setPage(1); }}
              >
                <option value="">No. of Resumes</option>
                <option value="0-1">0-1</option>
                <option value="2-5">2-5</option>
                <option value="6+">6+</option>
              </select> 
            </div>
          </div>

          {canManageUsers && (
            <select
              className="w-full md:w-auto h-10 px-4 bg-slate-900 dark:bg-slate-700 text-white rounded-lg text-sm font-bold hover:opacity-90 transition-opacity outline-none cursor-pointer"
              onChange={(e) => {
                bulkAction(e.target.value);
                e.target.value = ""; // Reset dropdown after selection
              }}
              value=""
            >
              <option value="" disabled>Bulk Actions ({selected.length})</option>
              {canSuspendUsers && <option value="activate">Activate</option>}
              {canSuspendUsers && <option value="suspend">Suspend</option>}
              {canDeleteUsers && <option value="delete">Delete</option>}
            </select>
          )}
        </div>
      </div>

      {/* Main User Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 w-10">
                  <input 
                    type="checkbox" 
                    className="rounded border-slate-300 text-[#135bec] focus:ring-[#135bec] cursor-pointer"
                    checked={users.length > 0 && selected.length === users.length}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-4 py-4 text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">Name & Email</th>
                <th className="px-4 py-4 text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">Role</th>
                <th className="px-4 py-4 text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">Joined Date</th>
                <th className="px-4 py-4 text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                <th className="px-4 py-4 text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">Membership</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr><td colSpan="6" className="text-center py-20 text-slate-400">
                  <div className="flex flex-col items-center gap-2">
                    <span className="material-symbols-outlined animate-spin text-3xl">sync</span>
                    Loading users...
                  </div>
                </td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-20 text-slate-400">No users found.</td></tr>
              ) : users.map(user => (
                <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <input 
                      type="checkbox" 
                      className="rounded border-slate-300 text-[#135bec] focus:ring-[#135bec] cursor-pointer"
                      checked={selected.includes(user.id)}
                      onChange={() => toggleSelect(user.id)}
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-500 shrink-0">
                        {user.avatar ? (
                          <img src={user.avatar} alt="" className="h-full w-full object-cover rounded-full" />
                        ) : (
                          user.name?.charAt(0).toUpperCase()
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.name}</span>
                        <span className="text-xs text-slate-500 truncate">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      user.role === 'admin' 
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' 
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-400 text-nowrap">
                    {new Date(user.joined_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>                 
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'active' 
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' 
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400'
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${user.status === 'active' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.membership === 'premium' 
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' 
                      : 'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400'
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${user.membership === 'premium' ? 'bg-amber-500' : 'bg-slate-500'}`}></span>
                      {user.membership}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => handleViewProfile(user)} className="p-1.5 text-slate-400 hover:text-[#135bec] hover:bg-[#135bec]/10 rounded-lg transition-all" title="View Profile">
                        <span className="material-symbols-outlined text-lg">visibility</span>
                      </button>
                      {canManageUsers && (
            <button 
              onClick={() => handleEdit(user)}
              className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all" 
              title="Edit"
            >
               <span className="material-symbols-outlined text-lg">edit</span>
            </button>
          )}

          {canDeleteUsers && (
            <button
              onClick={() => handleDelete(user.id)}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
              title="Delete"
            >
              <span className="material-symbols-outlined text-lg">delete</span>
            </button>
          )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 gap-4">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Showing <span className="font-bold text-slate-900 dark:text-white">{meta.from || 0}</span> to <span className="font-bold text-slate-900 dark:text-white">{meta.to || 0}</span> of <span className="font-bold text-slate-900 dark:text-white">{meta.total || 0}</span> users
          </div>
          <div className="flex items-center gap-1">
            {meta.links?.map((link, i) => (
              <button
                key={i}
                disabled={!link.url || link.active}
                className={`flex items-center justify-center px-3 h-8 min-w-8 rounded-md text-xs font-bold transition-all ${
                  link.active
                    ? "bg-[#135bec] text-white shadow-md shadow-[#135bec]/20"
                    : "text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 border border-transparent hover:border-slate-200"
                } ${!link.url ? "opacity-30 cursor-not-allowed" : ""}`}
                onClick={() => {
                   const urlObj = new URL(link.url);
                   const pageNum = urlObj.searchParams.get('page');
                   if (pageNum) setPage(Number(pageNum));
                }}
              >
                {link.label.includes('Previous') ? <span className="material-symbols-outlined text-sm">chevron_left</span> : 
                 link.label.includes('Next') ? <span className="material-symbols-outlined text-sm">chevron_right</span> : 
                 link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <AddUserModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setEditingUser(null);
        }} 
        onRefresh={fetchUsers}
        user={editingUser} // Pass the user if we are editing
      />
        {viewingUser && (
          <UserViewModal user={viewingUser} onClose={() => setViewingUser(null)} />
        )}
    </div>
  );
};

export default Users;