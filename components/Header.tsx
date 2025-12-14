import React, { useState, useEffect, useRef } from 'react';
import { Section } from '../types';

interface HeaderProps {
  currentSection: Section;
  onNavigate: (section: Section) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentSection, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const navItems = [
    { label: 'Início', value: Section.HOME },
    { label: 'Produtos', value: Section.PRODUCTS },
    { label: 'Serviços', value: Section.SERVICES },
    { label: 'Sobre Nós', value: Section.ABOUT },
    { label: 'Contato', value: Section.CONTACT },
  ];

  const handleNavClick = (section: Section) => {
    onNavigate(section);
    setIsMenuOpen(false);
  };

  // Fecha o menu ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 bg-slate-900 text-white z-50 shadow-lg"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center relative z-20 bg-slate-900">
        {/* Logo */}
        <div 
          className="flex items-center space-x-2 cursor-pointer" 
          onClick={() => handleNavClick(Section.HOME)}
        >
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-wider">CentriTech</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handleNavClick(item.value)}
              className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                currentSection === item.value ? 'text-blue-400' : 'text-slate-300'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick(Section.AI_CONSULTANT)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full text-sm font-bold transition-all shadow-lg shadow-blue-900/50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Consultor IA
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-slate-300 hover:text-white focus:outline-none p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      <div 
        className={`md:hidden bg-slate-800 border-t border-slate-700 transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col p-4 space-y-4">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handleNavClick(item.value)}
              className={`text-left text-sm font-medium transition-all hover:pl-2 ${
                currentSection === item.value ? 'text-blue-400' : 'text-slate-300'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick(Section.AI_CONSULTANT)}
            className="bg-blue-600 text-white px-4 py-3 rounded text-center text-sm font-bold shadow-md active:scale-95 transition-all"
          >
            Consultor IA
          </button>
        </div>
      </div>
    </header>
  );
};