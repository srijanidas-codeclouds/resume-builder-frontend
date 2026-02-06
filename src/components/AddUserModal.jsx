import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import adminApi from "../services/admin.service";

const AddUserModal = ({ isOpen, onClose, onRefresh, user = null }) => {
  const isEditMode = !!user;

  const initialFormState = {
    name: "",
    username: "",
    email: "",
    role: "user",
    password: "", // Leave empty for edit mode
  };

  const [formData, setFormData] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false);

  // Synchronize form with the user prop when editing
  useEffect(() => {
    if (user && isOpen) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        role: user.role || "user",
        password: "", // Password usually isn't updated here for security
      });
    } else if (!isOpen) {
      setFormData(initialFormState);
    }
  }, [user, isOpen]);

  const handleNameChange = (e) => {
    const name = e.target.value;
    const baseSlug = name.toLowerCase().replace(/\s+/g, '').slice(0, 10);
    const autoUsername = baseSlug ? `${baseSlug}${Math.floor(Math.random() * 100)}` : "";
    
    setFormData((prev) => ({
      ...prev,
      name: name,
      // Only auto-generate username in "Add" mode
      username: !isEditMode && (prev.username === "" || prev.username.startsWith(baseSlug.slice(0, 3)))
                ? autoUsername 
                : prev.username
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (isEditMode) {
        // Call update API
        await adminApi.updateUser(user.id, formData);
        toast.success("User updated successfully");
      } else {
        // Call create API
        await adminApi.createUser(formData);
        toast.success("User created successfully");
      }
      onRefresh();
      handleClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData(initialFormState);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in zoom-in duration-200">
        
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              {isEditMode ? "Edit User Profile" : "Create New Member"}
            </h3>
            <p className="text-xs text-slate-500">
              {isEditMode ? `Updating ${user.name}` : "Enter details to register a new account."}
            </p>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
            <span className="material-symbols-outlined text-slate-500">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-xs font-black uppercase text-slate-500 mb-1.5 tracking-wider">Full Name</label>
            <input
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-[#135bec]"
              value={formData.name}
              onChange={handleNameChange}
            />
          </div>

          {/* Username (Read-only or disabled in Edit mode depending on your SaaS rules) */}
          <div>
            <label className="block text-xs font-black uppercase text-slate-500 mb-1.5 tracking-wider">Username</label>
            <input
              required
              disabled={isEditMode}
              className={`w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-[#135bec] ${isEditMode ? 'opacity-50 cursor-not-allowed' : ''}`}
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-black uppercase text-slate-500 mb-1.5 tracking-wider">Email Address</label>
            <input
              required
              type="email"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-[#135bec]"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {/* Password (Hidden in Edit Mode or shown as "New Password") */}
          {!isEditMode && (
            <div>
              <label className="block text-xs font-black uppercase text-slate-500 mb-1.5 tracking-wider">Temporary Password</label>
              <input
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-[#135bec]"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          )}

          {/* Role (Radio Buttons for better UX) */}
          <div>
            <label className="block text-xs font-black uppercase text-slate-500 mb-1.5 tracking-wider">System Role</label>
            <div className="flex gap-3">
              {['user', 'admin'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setFormData({...formData, role: r})}
                  className={`flex-1 py-2.5 rounded-xl border font-bold text-sm capitalize transition-all ${
                    formData.role === r 
                    ? 'bg-[#135bec] border-[#135bec] text-white shadow-lg' 
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-500 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-4 py-3 rounded-xl bg-[#135bec] text-white text-sm font-bold hover:bg-[#135bec]/90 flex items-center justify-center gap-2"
            >
              {submitting ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : null}
              {isEditMode ? "Save Changes" : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;