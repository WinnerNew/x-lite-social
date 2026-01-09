
import React from 'react';
import { ArrowLeft, ChevronRight, User, Shield, Bell, HelpCircle, LogOut } from 'lucide-react';

interface SettingsViewProps {
  onBack: () => void;
  onLogout: () => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ onBack, onLogout }) => {
  const SettingItem = ({ icon: Icon, label, color = "text-white" }: any) => (
    <div className="flex items-center justify-between p-4 hover:bg-white/5 cursor-pointer border-b border-gray-800/50">
      <div className="flex items-center gap-4">
        <Icon className={`w-5 h-5 ${color}`} />
        <span className={`text-[15px] font-medium ${color}`}>{label}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-600" />
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-black">
      <header className="sticky top-0 bg-black/80 backdrop-blur-md z-40 p-3 flex items-center gap-8 border-b border-gray-800">
        <button onClick={onBack} className="p-1 hover:bg-white/10 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold">Settings</h2>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="mt-4">
          <SettingItem icon={User} label="Your Account" />
          <SettingItem icon={Shield} label="Security and Account Access" />
          <SettingItem icon={Bell} label="Notifications" />
          <SettingItem icon={HelpCircle} label="Help Center" />
        </div>

        <div className="mt-8 border-t border-gray-800">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 p-4 hover:bg-red-500/10 text-red-500 font-bold transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
