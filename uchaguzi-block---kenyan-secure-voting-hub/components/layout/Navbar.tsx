import React from 'react';
import { Menu, ShieldCheck, Globe, FileText } from 'lucide-react';
import { ViewState } from '../../types';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  language: 'EN' | 'SW';
  setLanguage: (lang: 'EN' | 'SW') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView, language, setLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { label: language === 'EN' ? 'Home' : 'Nyumbani', view: ViewState.HOME },
    { label: language === 'EN' ? 'Vote' : 'Piga Kura', view: ViewState.VERIFICATION },
    { label: language === 'EN' ? 'Results' : 'Matokeo', view: ViewState.RESULTS },
    { label: language === 'EN' ? 'Help' : 'Msaada', view: ViewState.EDUCATION },
    { label: 'Capstone Project', view: ViewState.CAPSTONE_DOCS, icon: FileText },
  ];

  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView(ViewState.HOME)}>
            <ShieldCheck className="h-8 w-8 text-green-500" />
            <span className="font-bold text-xl tracking-tight">Uchaguzi<span className="text-green-500">Block</span></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setView(item.view)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2
                    ${currentView === item.view 
                      ? 'bg-green-600 text-white' 
                      : 'text-gray-300 hover:bg-slate-700 hover:text-white'}`}
                >
                  {item.icon && <item.icon size={16} />}
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLanguage(language === 'EN' ? 'SW' : 'EN')}
              className="flex items-center gap-1 text-sm text-gray-300 hover:text-white border border-gray-600 rounded px-2 py-1"
            >
              <Globe size={14} />
              {language}
            </button>
            
            {/* Mobile Menu Button */}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-700 focus:outline-none"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setView(item.view);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium
                  ${currentView === item.view 
                    ? 'bg-green-600 text-white' 
                    : 'text-gray-300 hover:bg-slate-700 hover:text-white'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};