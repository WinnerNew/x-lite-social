
import React, { useState } from 'react';
import { Home, Search, Bell, Mail, User, Plus, LogOut, Settings } from 'lucide-react';
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

  const NavItem = ({ icon: Icon, view }: { icon: any, view: ViewState }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`flex flex-col items-center justify-center flex-1 py-3 transition-all active:scale-90 ${
        currentView === view ? 'text-white' : 'text-gray-500'
      }`}
    >
      <Icon className={`w-7 h-7 ${currentView === view ? 'fill-current stroke-[2.5px]' : 'stroke-[1.5px]'}`} />
    </button>
  );

  const showNavbar = currentUser && !['AUTH', 'CHAT', 'CREATE_POST', 'SETTINGS'].includes(currentView);

  return (
    <div className="flex flex-col h-screen w-full bg-black text-white relative">
      <div className="flex-1 flex justify-center w-full">
        {/* Main H5 Container - Centered and constrained for larger screens */}
        <div className="w-full max-w-md bg-black border-x border-gray-800 relative flex flex-col h-full shadow-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.main 
              key={currentView}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex-1 overflow-y-auto pb-20 h-full"
            >
              {renderView()}
            </motion.main>
          </AnimatePresence>

          {/* Floating Action Button */}
          {showNavbar && (
            <motion.button 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={() => setCurrentView('CREATE_POST')}
              className="absolute bottom-20 right-4 bg-sky-500 hover:bg-sky-400 text-white p-4 rounded-full shadow-xl z-30 active:scale-90 transition-transform"
            >
              <Plus className="w-6 h-6 stroke-[3]" />
            </motion.button>
          )}

          {/* Navigation Bar */}
          {showNavbar && (
            <nav className="fixed bottom-0 w-full max-w-md bg-black/80 backdrop-blur-xl border-t border-gray-800 flex justify-around items-center z-50 pb-safe">
              <NavItem icon={Home} view="HOME" />
              <NavItem icon={Search} view="EXPLORE" />
              <NavItem icon={Bell} view="NOTIFICATIONS" />
              <NavItem icon={Mail} view="MESSAGES" />
              <button 
                onClick={() => setCurrentView('PROFILE')}
                className={`flex-1 flex justify-center items-center py-3 transition-all active:scale-90 ${currentView === 'PROFILE' ? 'text-white' : 'text-gray-500'}`}
              >
                <div className={`w-7 h-7 rounded-full border-2 overflow-hidden transition-colors ${currentView === 'PROFILE' ? 'border-sky-500' : 'border-transparent'}`}>
                  <img src={currentUser?.avatar} className="w-full h-full object-cover" />
                </div>
              </button>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
