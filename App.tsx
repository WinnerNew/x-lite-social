
import React, { useState } from 'react';
import { Home, Search, Bell, Mail, User, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import HomeView from './views/HomeView';
import ExploreView from './views/ExploreView';
import MessageView from './views/MessageView';
import ProfileView from './views/ProfileView';
import ChatRoomView from './views/ChatRoomView';
import AuthView from './views/AuthView';
import NotificationsView from './views/NotificationsView';
import SettingsView from './views/SettingsView';
import CreatePostView from './views/CreatePostView';
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
    if (!currentUser && currentView !== 'AUTH') {
       return <AuthView onLogin={handleLogin} />;
    }

    switch (currentView) {
      case 'AUTH': return <AuthView onLogin={handleLogin} />;
      case 'HOME': return <HomeView currentUser={currentUser!} />;
      case 'EXPLORE': return <ExploreView />;
      case 'NOTIFICATIONS': return <NotificationsView />;
      case 'MESSAGES': return <MessageView onSelectChat={(id) => { setActiveChatId(id); setCurrentView('CHAT'); }} />;
      case 'CHAT': return <ChatRoomView chatId={activeChatId!} onBack={() => setCurrentView('MESSAGES')} />;
      case 'PROFILE': return <ProfileView user={currentUser!} onLogout={handleLogout} onSettings={() => setCurrentView('SETTINGS')} onBack={() => setCurrentView('HOME')} />;
      case 'SETTINGS': return <SettingsView onBack={() => setCurrentView('PROFILE')} onLogout={handleLogout} />;
      case 'CREATE_POST': return <CreatePostView onBack={() => setCurrentView('HOME')} />;
      default: return <HomeView currentUser={currentUser!} />;
    }
  };

  const showNavbar = currentUser && !['AUTH', 'CHAT', 'CREATE_POST', 'SETTINGS'].includes(currentView);

  const NavItem = ({ icon: Icon, view }: { icon: any, view: ViewState }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`flex flex-col items-center justify-center flex-1 py-3 transition-colors active:scale-90 ${
        currentView === view ? 'text-zinc-100' : 'text-zinc-500'
      }`}
    >
      <Icon className={`w-7 h-7 ${currentView === view ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`} />
    </button>
  );

  return (
    <div className="flex justify-center w-full min-h-screen bg-zinc-950">
      <div className="w-full max-w-[450px] bg-black min-h-screen relative flex flex-col border-x border-zinc-800 shadow-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.main 
            key={currentView}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 overflow-y-auto hide-scrollbar"
          >
            {renderView()}
          </motion.main>
        </AnimatePresence>

        {showNavbar && (
          <>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentView('CREATE_POST')}
              className="absolute bottom-24 right-5 bg-sky-500 hover:bg-sky-600 text-white p-4 rounded-full shadow-lg shadow-sky-500/20 z-40"
            >
              <Plus size={24} strokeWidth={3} />
            </motion.button>

            <nav className="sticky bottom-0 w-full bg-black/80 backdrop-blur-xl border-t border-zinc-800 flex justify-around items-center z-50 pb-[env(safe-area-inset-bottom)]">
              <NavItem icon={Home} view="HOME" />
              <NavItem icon={Search} view="EXPLORE" />
              <NavItem icon={Bell} view="NOTIFICATIONS" />
              <NavItem icon={Mail} view="MESSAGES" />
              <button 
                onClick={() => setCurrentView('PROFILE')}
                className="flex-1 flex justify-center py-3"
              >
                <div className={`w-7 h-7 rounded-full border-2 overflow-hidden transition-all ${currentView === 'PROFILE' ? 'border-sky-500 scale-110' : 'border-transparent opacity-70'}`}>
                  <img src={currentUser?.avatar} className="w-full h-full object-cover" alt="me" />
                </div>
              </button>
            </nav>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
