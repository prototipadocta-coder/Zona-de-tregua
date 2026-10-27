import React, { useState, useEffect } from 'react';
import { TabType } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TreguaBot } from './components/TreguaBot';
import { GameSimulator } from './components/GameSimulator';
import { EmotionalTools } from './components/EmotionalTools';
import { BuzonSeguro } from './components/BuzonSeguro';
import { LineasAyuda } from './components/LineasAyuda';
import { Footer } from './components/Footer';
import { DiscreteMode } from './components/DiscreteMode';
import { EyeOff, ShieldAlert, ArrowUp } from 'lucide-react';
import { sounds } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('inicio');
  const [isDiscreteMode, setIsDiscreteMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Global ESC key shortcut for Discrete Mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDiscreteMode((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll to top tracking
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (tab: TabType) => {
    sounds.playClick();
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If discrete mode is active, render the disguised academic screen
  if (isDiscreteMode) {
    return <DiscreteMode onExit={() => setIsDiscreteMode(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300">
      
      {/* Top Main Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onActivateDiscreteMode={() => setIsDiscreteMode(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'inicio' && (
          <>
            <Hero onNavigate={handleNavigate} />
            
            {/* Direct Section Preview 1: TreguaBot Highlight */}
            <section className="py-12 bg-slate-950 border-b border-slate-800/80">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <TreguaBot onNavigateTab={handleNavigate} />
              </div>
            </section>

            {/* Direct Section Preview 2: Game Simulator Preview */}
            <section className="py-12 bg-slate-900/40 border-b border-slate-800/80">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <GameSimulator onNavigateTab={handleNavigate} />
              </div>
            </section>

            {/* Direct Section Preview 3: Emotional Tools Preview */}
            <section className="py-12 bg-slate-950 border-b border-slate-800/80">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <EmotionalTools />
              </div>
            </section>

            {/* Direct Section Preview 4: Buzon Seguro Preview */}
            <section className="py-12 bg-slate-900/40">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <BuzonSeguro />
              </div>
            </section>
          </>
        )}

        {activeTab === 'bot' && (
          <div className="py-6 sm:py-10">
            <TreguaBot onNavigateTab={handleNavigate} />
          </div>
        )}

        {activeTab === 'juego' && (
          <div className="py-6 sm:py-10">
            <GameSimulator onNavigateTab={handleNavigate} />
          </div>
        )}

        {activeTab === 'herramientas' && (
          <div className="py-6 sm:py-10">
            <EmotionalTools />
          </div>
        )}

        {activeTab === 'buzon' && (
          <div className="py-6 sm:py-10">
            <BuzonSeguro />
          </div>
        )}

        {activeTab === 'lineas' && (
          <div className="py-6 sm:py-10">
            <LineasAyuda />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigateTab={handleNavigate}
        onActivateDiscreteMode={() => setIsDiscreteMode(true)}
      />

      {/* Floating Bottom Quick Disguise Button & Scroll to Top */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            title="Volver arriba"
            className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 shadow-xl transition cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={() => {
            sounds.playClick();
            setIsDiscreteMode(true);
          }}
          title="Modo Discreto / Salida Rápida (Presiona ESC)"
          className="flex items-center gap-2 px-3.5 py-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-2xl shadow-rose-950 border border-rose-400/40 hover:scale-105 transition-all cursor-pointer group"
        >
          <EyeOff className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">Salida Rápida [ESC]</span>
        </button>
      </div>

    </div>
  );
}
