import React from 'react';
import { Smartphone, CheckCircle, Cpu, MessageSquare } from 'lucide-react';
import { AppSection } from '../types';

interface HeaderProps {
  currentSection: AppSection;
  onNavigate: (section: AppSection) => void;
}

const Header: React.FC<HeaderProps> = ({ currentSection, onNavigate }) => {
  const navItems = [
    { id: AppSection.INTRO, label: '什么是 GMS', icon: <Smartphone size={18} /> },
    { id: AppSection.PROCESS, label: '认证流程', icon: <CheckCircle size={18} /> },
    { id: AppSection.TOOLS, label: '测试套件', icon: <Cpu size={18} /> },
    { id: AppSection.AI_ASSISTANT, label: 'AI 专家问答', icon: <MessageSquare size={18} /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate(AppSection.INTRO)}>
            <div className="w-8 h-8 rounded bg-google-blue flex items-center justify-center text-white font-bold">
              G
            </div>
            <span className="text-xl font-bold text-gray-800 tracking-tight">GMS Guide Pro</span>
          </div>
          
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  currentSection === item.id
                    ? 'bg-blue-50 text-google-blue ring-1 ring-blue-100'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Mobile menu button placeholder (simple version) */}
          <div className="md:hidden flex items-center">
            <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Nav Bar (Simple implementation for mobile responsiveness) */}
      <div className="md:hidden flex justify-around border-t border-gray-100 py-2 bg-white">
          {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center p-2 rounded-lg text-xs font-medium ${
                  currentSection === item.id ? 'text-google-blue' : 'text-gray-500'
                }`}
              >
                {item.icon}
                <span className="mt-1">{item.label}</span>
              </button>
          ))}
      </div>
    </header>
  );
};

export default Header;