import React from 'react';
import { useNavigate } from 'react-router';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
      <div className="text-center">
        {/* Large 404 Visual */}
        <div className="relative inline-block">
          <h1 className="text-[12rem] font-black text-slate-200 dark:text-slate-900 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
             <span className="material-symbols-outlined text-8xl text-[#135bec] animate-bounce">
              search_off
            </span>
          </div>
        </div>

        <div className="mt-8 space-y-2">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Lost in Space?
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto font-medium">
            The page you are looking for doesn't exist or has been moved to another galaxy.
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-8 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-white dark:hover:bg-slate-900 transition-all active:scale-95"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#135bec] text-white font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all active:scale-95"
          >
            Take Me Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;