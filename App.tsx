import React, { useState } from 'react';
import Header from './components/Header';
import IntroSection from './components/IntroSection';
import ProcessGuide from './components/ProcessGuide';
import ToolsSection from './components/ToolsSection';
import GeminiChat from './components/GeminiChat';
import { AppSection } from './types';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<AppSection>(AppSection.INTRO);

  const renderSection = () => {
    switch (currentSection) {
      case AppSection.INTRO:
        return <IntroSection />;
      case AppSection.PROCESS:
        return <ProcessGuide />;
      case AppSection.TOOLS:
        return <ToolsSection />;
      case AppSection.AI_ASSISTANT:
        return <GeminiChat />;
      default:
        return <IntroSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <Header currentSection={currentSection} onNavigate={setCurrentSection} />
      
      <main className="flex-grow w-full">
        {renderSection()}
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-google-blue"></span>
            <span className="w-2 h-2 rounded-full bg-google-red"></span>
            <span className="w-2 h-2 rounded-full bg-google-yellow"></span>
            <span className="w-2 h-2 rounded-full bg-google-green"></span>
          </div>
          <p className="text-sm text-gray-500">
            GMS Certification Master &copy; {new Date().getFullYear()}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Disclaimer: Not affiliated with Google. Information intended for educational purposes.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;