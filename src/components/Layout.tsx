import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Home, Heart, BarChart2, Settings as SettingsIcon } from 'lucide-react';
import { clsx } from 'clsx';
import { useLanguage } from '../contexts/LanguageContext';
import { useModal } from '../contexts/ModalContext';

export default function Layout() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { isModalOpen } = useModal();

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

      {!isModalOpen && (
        <nav className="fixed bottom-0 left-0 right-0 flex justify-center items-center h-[100px] pb-8 px-6 z-50">
          <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-[32px] border border-black/5 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] p-2">
            <div className="flex items-center justify-around h-full">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  clsx(
                    "flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-all duration-300 active:scale-95",
                    isActive ? "text-[#007AFF]" : "text-gray-500"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Home size={28} strokeWidth={isActive ? 2.5 : 2} />
                    <span className="text-xs font-semibold">{t('navToday')}</span>
                  </>
                )}
              </NavLink>
              <NavLink
                to="/preferences"
                className={({ isActive }) =>
                  clsx(
                    "flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-all duration-300 active:scale-95",
                    isActive ? "text-[#007AFF]" : "text-gray-500"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Heart size={28} strokeWidth={isActive ? 2.5 : 2} />
                    <span className="text-xs font-semibold">{t('navPreferences')}</span>
                  </>
                )}
              </NavLink>
              <NavLink
                to="/reports"
                className={({ isActive }) =>
                  clsx(
                    "flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-all duration-300 active:scale-95",
                    isActive ? "text-[#007AFF]" : "text-gray-500"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <BarChart2 size={28} strokeWidth={isActive ? 2.5 : 2} />
                    <span className="text-xs font-semibold">{t('navReports')}</span>
                  </>
                )}
              </NavLink>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}