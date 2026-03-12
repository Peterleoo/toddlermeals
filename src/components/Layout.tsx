import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Home, Heart, BarChart2, Settings as SettingsIcon } from 'lucide-react';
import { clsx } from 'clsx';
import { useLanguage } from '../contexts/LanguageContext';

export default function Layout() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-[#F2F2F7] text-black font-sans selection:bg-blue-200">
      <header className="bg-[#F2F2F7]/80 backdrop-blur-xl px-6 py-4 sticky top-0 z-10 flex items-center justify-between border-b border-black/5">
        <div className="w-8"></div>
        <h1 className="text-xl font-bold tracking-tight text-black text-center">{t('appTitle')}</h1>
        <button 
          onClick={() => navigate('/settings')}
          className="p-2 text-gray-500 hover:text-[#007AFF] hover:bg-gray-200/50 rounded-full transition-colors flex items-center justify-center active:scale-95"
          title={t('settingsTitle')}
        >
          <SettingsIcon size={24} />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 pb-28">
        <Outlet />
      </main>

      <nav className="fixed bottom-3 left-3 right-3 bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_14px_40px_rgba(0,0,0,0.12)] rounded-[28px] flex justify-around items-center h-[72px] pb-safe">
        <NavLink
          to="/"
          className={({ isActive }) =>
            clsx(
              "flex flex-col items-center justify-center w-full h-full text-[10px] font-medium transition-all",
              isActive ? "text-[#007AFF]" : "text-gray-500 hover:text-gray-700"
            )
          }
        >
          {({ isActive }) => (
            <>
              <span
                className={clsx(
                  "flex items-center justify-center w-11 h-11 rounded-full transition-all",
                  isActive ? "bg-white/90 shadow-[0_6px_18px_rgba(0,0,0,0.12)]" : "bg-white/40"
                )}
              >
                <Home size={22} strokeWidth={isActive ? 2.6 : 2} />
              </span>
              <span className="mt-1">{t('navToday')}</span>
            </>
          )}
        </NavLink>
        <NavLink
          to="/preferences"
          className={({ isActive }) =>
            clsx(
              "flex flex-col items-center justify-center w-full h-full text-[10px] font-medium transition-all",
              isActive ? "text-[#007AFF]" : "text-gray-500 hover:text-gray-700"
            )
          }
        >
          {({ isActive }) => (
            <>
              <span
                className={clsx(
                  "flex items-center justify-center w-11 h-11 rounded-full transition-all",
                  isActive ? "bg-white/90 shadow-[0_6px_18px_rgba(0,0,0,0.12)]" : "bg-white/40"
                )}
              >
                <Heart size={22} strokeWidth={isActive ? 2.6 : 2} />
              </span>
              <span className="mt-1">{t('navPreferences')}</span>
            </>
          )}
        </NavLink>
        <NavLink
          to="/reports"
          className={({ isActive }) =>
            clsx(
              "flex flex-col items-center justify-center w-full h-full text-[10px] font-medium transition-all",
              isActive ? "text-[#007AFF]" : "text-gray-500 hover:text-gray-700"
            )
          }
        >
          {({ isActive }) => (
            <>
              <span
                className={clsx(
                  "flex items-center justify-center w-11 h-11 rounded-full transition-all",
                  isActive ? "bg-white/90 shadow-[0_6px_18px_rgba(0,0,0,0.12)]" : "bg-white/40"
                )}
              >
                <BarChart2 size={22} strokeWidth={isActive ? 2.6 : 2} />
              </span>
              <span className="mt-1">{t('navReports')}</span>
            </>
          )}
        </NavLink>
      </nav>
    </div>
  );
}
