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

  // 哪些页面需要显示底部导航栏
  const showNav = currentUser && ['HOME', 'EXPLORE', 'NOTIFICATIONS', 'MESSAGES', 'PROFILE'].includes(currentView);

  const NavItem = ({ icon: Icon, view }: { icon: any; view: ViewState }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`flex flex-1 flex-col items-center justify-center py-3 active-press ${
        currentView === view ? 'text-zinc-100' : 'text-zinc-500'
      }`}
    >
      <div className="relative">
        <Icon className={`h-6 w-6 ${currentView === view ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`} />
        {view === 'NOTIFICATIONS' && <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-sky-500 rounded-full border border-black" />}
      </div>
    </button>
  );

  return (
    <div className="flex h-full w-full justify-center bg-zinc-950">
      <div className="relative flex h-full w-full max-w-[450px] ignore-vw flex-col border-x border-zinc-900 bg-black shadow-2xl overflow-hidden">
        
        {/* 页面内容区 */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="absolute inset-0 overflow-y-auto scroll-smooth-touch hide-scrollbar"
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 悬浮发布按钮 */}
        {showNav && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentView('CREATE_POST')}
            className="absolute bottom-24 right-5 z-50 rounded-full bg-sky-500 p-4 text-white shadow-xl shadow-sky-500/30"
          >
            <Plus size={24} strokeWidth={3} />
          </motion.button>
        )}

        {/* 底部导航 */}
        {showNav && (
          <nav className="flex w-full items-center justify-around border-t border-zinc-900 glass-header pb-safe z-50">
            <NavItem icon={Home} view="HOME" />
            <NavItem icon={Search} view="EXPLORE" />
            <NavItem icon={Bell} view="NOTIFICATIONS" />
            <NavItem icon={Mail} view="MESSAGES" />
            <button
              onClick={() => setCurrentView('PROFILE')}
              className="flex flex-1 justify-center py-3 active-press"
            >
              <div className={`h-7 w-7 rounded-full border-2 transition-all ${currentView === 'PROFILE' ? 'border-sky-500' : 'border-transparent'}`}>
                <img src={currentUser?.avatar} className="h-full w-full rounded-full object-cover" alt="avatar" />
              </div>
            </button>
          </nav>
        )}
      </div>
    </div>
  );
};

export default App;