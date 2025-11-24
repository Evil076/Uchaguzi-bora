import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { VotingFlow } from './components/voting/VotingFlow';
import { ResultsDashboard } from './components/dashboard/ResultsDashboard';
import { CapstoneDocs } from './components/capstone/CapstoneDocs';
import { AiChat } from './components/education/AiChat';
import { ViewState } from './types';
import { CheckCircle, Globe, Smartphone, Users } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [language, setLanguage] = useState<'EN' | 'SW'>('EN');

  const renderView = () => {
    switch (currentView) {
      case ViewState.VERIFICATION:
        return <VotingFlow onComplete={() => setCurrentView(ViewState.HOME)} language={language} />;
      case ViewState.RESULTS:
        return <ResultsDashboard />;
      case ViewState.CAPSTONE_DOCS:
        return <CapstoneDocs />;
      case ViewState.EDUCATION:
        return <AiChat />;
      default:
        return (
          <div className="flex flex-col">
            {/* Hero Section */}
            <div className="relative bg-slate-900 text-white py-24 overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
                  {language === 'EN' ? 'Secure Voting for ' : 'Upigaji Kura Salama kwa '}
                  <span className="text-green-500">Kenya 2027</span>
                </h1>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
                  {language === 'EN' 
                    ? 'Empowering every citizen, from Nairobi to the Diaspora, with blockchain-secured, inclusive, and accessible voting technology.'
                    : 'Kuwezesha kila mwananchi, kutoka Nairobi hadi Diaspora, na teknolojia ya kupiga kura iliyo salama na inayofikika.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => setCurrentView(ViewState.VERIFICATION)}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <CheckCircle />
                    {language === 'EN' ? 'Vote Now' : 'Piga Kura Sasa'}
                  </button>
                  <button 
                    onClick={() => setCurrentView(ViewState.RESULTS)}
                    className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105"
                  >
                    {language === 'EN' ? 'View Live Results' : 'Angalia Matokeo'}
                  </button>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="py-16 bg-slate-50">
              <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                    <Globe size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Diaspora Inclusion</h3>
                  <p className="text-slate-600">Secure remote voting for the 3M+ Kenyans living abroad, verified via biometric passport integration.</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                    <Smartphone size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Mobile-First & Offline</h3>
                  <p className="text-slate-600">Optimized for basic smartphones and low-bandwidth rural areas with store-and-forward syncing.</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600">
                    <Users size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Radical Transparency</h3>
                  <p className="text-slate-600">Every vote creates a unique transaction hash on the Ethereum blockchain for public auditability.</p>
                </div>
              </div>
            </div>

            {/* Footer Banner for Students */}
            <div className="bg-slate-900 text-slate-500 py-8 text-center text-sm">
              <p>HCI Capstone Project Prototype • BIT 316 / COMP 401</p>
              <button onClick={() => setCurrentView(ViewState.CAPSTONE_DOCS)} className="text-green-500 hover:underline mt-2">
                View Project Deliverables & Reports
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar 
        currentView={currentView} 
        setView={setCurrentView} 
        language={language} 
        setLanguage={setLanguage} 
      />
      <main>
        {renderView()}
      </main>
    </div>
  );
};

export default App;