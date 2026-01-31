import React, { useState } from 'react';

const UserSettings = () => {
  const [activeTab, setActiveTab] = useState('account');

  const tabs = [
    { id: 'account', label: 'Account', icon: 'fa-user' },
    { id: 'security', label: 'Security', icon: 'fa-shield' },
    { id: 'notifications', label: 'Notifications', icon: 'fa-bell' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400">Manage your account preferences and security settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <nav className="flex lg:flex-col overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 gap-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap
                ${activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-800'}`}
            >
              <i className={`fa ${tab.icon} w-5`}></i>
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Settings Content Area */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Account Section */}
          {activeTab === 'account' && (
            <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
              <h3 className="text-lg font-semibold border-b border-slate-100 dark:border-slate-800 pb-4">Profile Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                  <input type="text" defaultValue="Alex Thompson" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-blue-500 outline-none transition" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                  <input type="email" defaultValue="alex.t@dev.com" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-blue-500 outline-none transition" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Professional Summary</label>
                  <textarea rows="4" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="Tell us about yourself..."></textarea>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition font-medium">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Security Section */}
          {activeTab === 'security' && (
            <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
              <h3 className="text-lg font-semibold border-b border-slate-100 dark:border-slate-800 pb-4">Security Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                      <i className="fa fa-key"></i>
                    </div>
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-xs text-slate-500">Add an extra layer of security to your account.</p>
                    </div>
                  </div>
                  <button className="text-sm font-bold text-blue-600 hover:underline">Enable</button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600">
                      <i className="fa fa-trash"></i>
                    </div>
                    <div>
                      <p className="font-medium text-red-600">Delete Account</p>
                      <p className="text-xs text-slate-500">Permanently remove all your data and resumes.</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 rounded-lg border border-red-200 dark:border-red-900 text-red-600 text-xs font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition">
                    Terminate
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Section */}
          {activeTab === 'notifications' && (
             <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
                <h3 className="text-lg font-semibold border-b border-slate-100 dark:border-slate-800 pb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  {['Email when resume is analyzed', 'Weekly ATS score report', 'New template alerts', 'Account security tips'].map((text, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-slate-700 dark:text-slate-300 text-sm">{text}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={i < 2} />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSettings;