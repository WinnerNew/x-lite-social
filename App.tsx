import React, { useState } from 'react';
import { Home, Search, Bell, Mail, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import HomeView from './views/HomeView';
import ExploreView from './views/ExploreView';
import MessageView from './views/MessageView';
import ProfileView from './views/ProfileView';
import ChatRoomView from './views/ChatRoomView';
import AuthView from './views/AuthView';
import NotificationsView from './views/NotificationsView';
import SettingsView from './views/SettingsView';
import SystemSettingsView from './views/SystemSettingsView';
import CreatePostView from './views/CreatePostView';
import EditProfileView from './views/EditProfileView';
import { User as UserType, ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('AUTH');
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  const handleLogin = (user: UserType) => {
    setCurrentUser(user);
    setCurrentView('HOME');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('AUTH');
  };

  const renderView = () => {
    if (!currentUser && currentView !== 'AUTH') return <AuthView onLogin={handleLogin} />;

    switch (currentView) {
      case 'AUTH': return <AuthView onLogin={handleLogin} />;
      case 'HOME': return <HomeView currentUser={currentUser!} />;
      case 'EXPLORE': return <ExploreView />;
      case 'NOTIFICATIONS': return <NotificationsView />;
      case 'MESSAGES': return <MessageView onSelectChat={(id) => { setActiveChatId(id); setCurrentView('CHAT'); }} />;
      case 'CHAT': return <ChatRoomView chatId={activeChatId!} onBack={() => setCurrentView('MESSAGES')} />;
      case 'PROFILE': return (
        <ProfileView
          user={currentUser!}
          onLogout={handleLogout}
          onSettings={() => setCurrentView('SETTINGS')}
          onEditProfile={() => setCurrentView('EDIT_PROFILE')}
          onBack={() => setCurrentView('HOME')}
        />
      );
      case 'EDIT_PROFILE': return (
        <EditProfileView
          user={currentUser!}
          onSave={(u) => { setCurrentUser(u); setCurrentView('PROFILE'); }}
          onCancel={() => setCurrentView('PROFILE')}
        />
      );
      case 'SETTINGS': return (
        <SettingsView 
          onBack={() => setCurrentView('PROFILE')} 
          onLogout={handleLogout}
          onSystemSettings={() => setCurrentView('SYSTEM_SETTINGS')}
        />
      );
      case 'SYSTEM_SETTINGS': return <SystemSettingsView onBack={() => setCurrentView('SETTINGS')} />;
      case 'CREATE_POST': return <CreatePostView onBack={() => setCurrentView('HOME')} />;
      default: return <HomeView currentUser={currentUser!} />;
    }
  };

  const showNav = currentUser && ['HOME', 'EXPLORE', 'NOTIFICATIONS', 'MESSAGES', 'PROFILE'].includes(currentView);

  const NavItem = ({ icon: Icon, view }: { icon: any; view: ViewState }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`flex flex-1 flex-col items-center justify-center py-2 transition-all active:scale-90 ${
        currentView === view ? 'text-zinc-100' : 'text-zinc-500'
      }`}
    >
      <div className="relative">
        <Icon className={`h-[26px] w-[26px] ${currentView === view ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
        {view === 'NOTIFICATIONS' && <div className="absolute top-0 right-0 w-[8px] h-[8px] bg-sky-500 rounded-full border-[1.5px] border-black" />}
      </div>
    </button>
  );

  return (
    <div className="flex h-full w-full justify-center bg-zinc-950">
      <div className="relative flex h-full w-full max-w-[450px] ignore-vw flex-col border-x border-twitter bg-black shadow-2xl overflow-hidden">
        
        {/* View Content */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentView}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute inset-0 overflow-y-auto scroll-smooth-touch hide-scrollbar"
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Compose Button - Precise Floating style */}
        {showNav && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentView('CREATE_POST')}
            className="absolute bottom-[90px] right-5 z-50 rounded-full bg-sky-500 p-4 text-white shadow-lg shadow-sky-500/20 active:bg-sky-600 transition-colors"
          >
            <Plus size={26} strokeWidth={3} />
          </motion.button>
        )}

        {/* Bottom Nav Bar */}
        {showNav && (
          <nav className="flex w-full items-center justify-around border-t border-twitter glass-header pb-safe z-50 h-[56px] px-2">
            <NavItem icon={Home} view="HOME" />
            <NavItem icon={Search} view="EXPLORE" />
            <NavItem icon={Bell} view="NOTIFICATIONS" />
            <NavItem icon={Mail} view="MESSAGES" />
            <button
              onClick={() => setCurrentView('PROFILE')}
              className="flex flex-1 justify-center py-2 active:scale-90 transition-transform"
            >
              <div className={`h-[28px] w-[28px] rounded-full border-[2px] transition-all overflow-hidden ${currentView === 'PROFILE' ? 'border-zinc-100' : 'border-transparent'}`}>
                <img src={currentUser?.avatar} className="h-full w-full object-cover" alt="avatar" />
              </div>
            </button>
          </nav>
        )}
      </div>
    </div>
  );
};

export default App;