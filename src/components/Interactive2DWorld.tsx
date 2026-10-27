import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Gamepad2, 
  MapPin, 
  ShieldCheck, 
  Flame, 
  Heart, 
  Sparkles, 
  User, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight, 
  MessageSquare, 
  Zap, 
  Volume2, 
  Trophy, 
  Check, 
  Info,
  Footprints,
  Compass,
  AlertTriangle
} from 'lucide-react';
import { Character, ExplorableMap, WorldNPC, WorldItem, ChoiceOption, TabType } from '../types';
import { CHARACTERS } from '../data/gameData';
import { CharacterSprite } from './CharacterSprite';
import { EXPLORABLE_MAPS } from '../data/worldMapsData';
import { sounds } from '../utils/audio';

interface Interactive2DWorldProps {
  onNavigateTab: (tab: TabType) => void;
}

export const Interactive2DWorld: React.FC<Interactive2DWorldProps> = ({ onNavigateTab }) => {
  // Character Selection
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(CHARACTERS[0]); // Alex by default
  
  // Scenario Selection
  const [currentMapIndex, setCurrentMapIndex] = useState(0);
  const activeMap = EXPLORABLE_MAPS[currentMapIndex];

  // Player position (percentage: 0 - 100)
  const [playerPos, setPlayerPos] = useState<{ x: number; y: number }>(activeMap.playerSpawn);
  const [facingDirection, setFacingDirection] = useState<'left' | 'right' | 'up' | 'down'>('right');
  const [isWalking, setIsWalking] = useState(false);
  const [targetPos, setTargetPos] = useState<{ x: number; y: number } | null>(null);

  // Dynamic Metrics
  const [tensionLevel, setTensionLevel] = useState(30);
  const [peaceReputation, setPeaceReputation] = useState(50);
  const [tranquility, setTranquility] = useState(60);

  // Interactive NPC dialog modal
  const [activeNPC, setActiveNPC] = useState<WorldNPC | null>(null);
  const [activeChoiceFeedback, setActiveChoiceFeedback] = useState<ChoiceOption | null>(null);

  // Map state (items collected, resolved NPCs)
  const [resolvedNPCIds, setResolvedNPCIds] = useState<string[]>([]);
  const [collectedItemIds, setCollectedItemIds] = useState<string[]>([]);
  const [recentNotification, setRecentNotification] = useState<string | null>(null);

  // Victory celebration state
  const [scenarioCompleted, setScenarioCompleted] = useState(false);

  // Map container reference for click-to-walk coordinate calculation
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Reset or switch map
  const switchMap = (index: number) => {
    sounds.playClick();
    setCurrentMapIndex(index);
    const newMap = EXPLORABLE_MAPS[index];
    setPlayerPos(newMap.playerSpawn);
    setTargetPos(null);
    setActiveNPC(null);
    setActiveChoiceFeedback(null);
    setResolvedNPCIds([]);
    setCollectedItemIds([]);
    setScenarioCompleted(false);
    setTensionLevel(30);
    setPeaceReputation(50);
    setTranquility(60);
    showNotification(`📍 Has entrado a: ${newMap.name}`);
  };

  const showNotification = (msg: string) => {
    setRecentNotification(msg);
    setTimeout(() => {
      setRecentNotification((current) => (current === msg ? null : current));
    }, 3500);
  };

  // Keyboard controls listener (WASD and Arrows)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture keys if typing or dialog is open
      if (activeNPC) {
        if (e.key === 'Escape') {
          setActiveNPC(null);
          setActiveChoiceFeedback(null);
        }
        return;
      }

      const speed = 4; // percentage step per key press
      let dx = 0;
      let dy = 0;

      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        dy = -speed;
        setFacingDirection('up');
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        dy = speed;
        setFacingDirection('down');
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        dx = -speed;
        setFacingDirection('left');
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        dx = speed;
        setFacingDirection('right');
      } else if (e.key === 'e' || e.key === 'E' || e.key === ' ') {
        // Interact with nearest NPC if close
        if (nearestNPC && distanceToNearest <= 14) {
          e.preventDefault();
          handleInteractWithNPC(nearestNPC);
        }
        return;
      } else {
        return;
      }

      e.preventDefault();
      setIsWalking(true);
      setTargetPos(null); // manual control overrides click-to-walk

      setPlayerPos((prev) => {
        const nextX = Math.max(4, Math.min(94, prev.x + dx));
        const nextY = Math.max(6, Math.min(92, prev.y + dy));
        return { x: nextX, y: nextY };
      });

      // Stop walking animation after short delay
      const timer = setTimeout(() => setIsWalking(false), 200);
      return () => clearTimeout(timer);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeNPC, playerPos]);

  // Click-to-walk smooth loop
  useEffect(() => {
    if (!targetPos) return;

    const interval = setInterval(() => {
      setPlayerPos((current) => {
        const dx = targetPos.x - current.x;
        const dy = targetPos.y - current.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 1.5) {
          setIsWalking(false);
          setTargetPos(null);
          return current;
        }

        setIsWalking(true);
        // Set facing direction
        if (Math.abs(dx) > Math.abs(dy)) {
          setFacingDirection(dx > 0 ? 'right' : 'left');
        } else {
          setFacingDirection(dy > 0 ? 'down' : 'up');
        }

        const moveSpeed = 1.6;
        const nextX = current.x + (dx / dist) * moveSpeed;
        const nextY = current.y + (dy / dist) * moveSpeed;

        return {
          x: Math.max(4, Math.min(94, nextX)),
          y: Math.max(6, Math.min(92, nextY))
        };
      });
    }, 30);

    return () => clearInterval(interval);
  }, [targetPos]);

  // Check item collisions and destination triggers
  useEffect(() => {
    // Check items
    activeMap.items.forEach((item) => {
      if (!collectedItemIds.includes(item.id)) {
        const dist = Math.hypot(playerPos.x - item.x, playerPos.y - item.y);
        if (dist < 6) {
          // Collect item!
          sounds.playPeaceBell();
          setCollectedItemIds((prev) => [...prev, item.id]);
          showNotification(item.effectText);

          if (item.type === 'water') {
            setTensionLevel((prev) => Math.max(0, prev - 15));
            setTranquility((prev) => Math.min(100, prev + 15));
          } else if (item.type === 'peace_badge') {
            setPeaceReputation((prev) => Math.min(100, prev + 25));
          } else if (item.type === 'calm_drop') {
            setTranquility((prev) => Math.min(100, prev + 20));
            setTensionLevel((prev) => Math.max(0, prev - 10));
          }
        }
      }
    });

    // Check Safe Zone arrival
    const distToTarget = Math.hypot(playerPos.x - activeMap.safeZoneTarget.x, playerPos.y - activeMap.safeZoneTarget.y);
    if (distToTarget < 8 && !scenarioCompleted) {
      // Completed map!
      setScenarioCompleted(true);
      sounds.playPeaceBell();
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 }
      });
      showNotification(`🎉 ¡Llegaste a la ${activeMap.safeZoneTarget.label}!`);
    }
  }, [playerPos, activeMap, collectedItemIds, scenarioCompleted]);

  // Proximity detection for NPCs
  let nearestNPC: WorldNPC | null = null;
  let distanceToNearest = 999;

  activeMap.npcs.forEach((npc) => {
    const dist = Math.hypot(playerPos.x - npc.x, playerPos.y - npc.y);
    if (dist < distanceToNearest) {
      distanceToNearest = dist;
      nearestNPC = npc;
    }
  });

  const isNearAnyNPC = nearestNPC !== null && distanceToNearest <= 14;

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapContainerRef.current || activeNPC) return;
    const rect = mapContainerRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    sounds.playClick();
    setTargetPos({
      x: Math.max(4, Math.min(94, clickX)),
      y: Math.max(6, Math.min(92, clickY))
    });
  };

  const handleInteractWithNPC = (npc: WorldNPC) => {
    sounds.playClick();
    setActiveNPC(npc);
    setActiveChoiceFeedback(null);
  };

  const handleMakeDialogueChoice = (choice: ChoiceOption) => {
    sounds.playClick();
    setActiveChoiceFeedback(choice);

    const newTension = Math.max(0, Math.min(100, tensionLevel + choice.tensionScoreDelta));
    const newPeace = Math.max(0, Math.min(100, peaceReputation + choice.peaceScoreDelta));
    const newTranquility = Math.max(0, Math.min(100, tranquility + choice.tranquilityDelta));

    setTensionLevel(newTension);
    setPeaceReputation(newPeace);
    setTranquility(newTranquility);

    if (choice.type === 'assertive') {
      sounds.playPeaceBell();
      if (activeNPC && !resolvedNPCIds.includes(activeNPC.id)) {
        setResolvedNPCIds((prev) => [...prev, activeNPC.id]);
      }
    }
  };

  const closeDialog = () => {
    sounds.playClick();
    setActiveNPC(null);
    setActiveChoiceFeedback(null);
  };

  // Virtual directional pad buttons for mobile/touch
  const moveDirection = (dir: 'up' | 'down' | 'left' | 'right') => {
    sounds.playClick();
    setFacingDirection(dir);
    setIsWalking(true);
    setTargetPos(null);

    const step = 6;
    setPlayerPos((prev) => {
      let nx = prev.x;
      let ny = prev.y;
      if (dir === 'up') ny -= step;
      if (dir === 'down') ny += step;
      if (dir === 'left') nx -= step;
      if (dir === 'right') nx += step;
      return {
        x: Math.max(4, Math.min(94, nx)),
        y: Math.max(6, Math.min(92, ny))
      };
    });

    setTimeout(() => setIsWalking(false), 200);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-2">
            <Footprints className="w-3.5 h-3.5" />
            <span>Minijuego Interactivo 2D con Movimiento Libre</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            Mundo Abierto: Dilemas en Movimiento
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Controla a tu personaje caminando con el teclado (WASD / Flechas), tocando en el mapa o con los botones táctiles.
          </p>
        </div>

        {/* Character switcher */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl">
          {CHARACTERS.map((char) => {
            const isSelected = selectedCharacter.id === char.id;
            return (
              <button
                key={char.id}
                onClick={() => {
                  sounds.playClick();
                  setSelectedCharacter(char);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <CharacterSprite look={char.id} size={26} />
                <span>{char.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mr-1">
          <Compass className="w-3.5 h-3.5 text-emerald-400" />
          Escenarios:
        </span>
        {EXPLORABLE_MAPS.map((map, idx) => (
          <button
            key={map.id}
            onClick={() => switchMap(idx)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer border ${
              currentMapIndex === idx
                ? 'bg-sky-500/20 text-sky-300 border-sky-500/50 shadow-sm'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            {map.name}
          </button>
        ))}
      </div>

      {/* Real-time HUD Status Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl shadow-xl text-xs">
        
        {/* Objective */}
        <div className="sm:col-span-1 space-y-1">
          <span className="font-bold text-slate-300 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Misión Actual:
          </span>
          <p className="text-[11px] text-slate-400 line-clamp-2">
            {activeMap.objective}
          </p>
        </div>

        {/* Tension Meter */}
        <div className="space-y-1">
          <div className="flex justify-between font-semibold">
            <span className="flex items-center gap-1 text-slate-300">
              <Flame className={`w-3.5 h-3.5 ${tensionLevel > 65 ? 'text-rose-500 animate-pulse' : 'text-amber-400'}`} />
              Nivel de Tensión
            </span>
            <span className={tensionLevel > 65 ? 'text-rose-400 font-bold' : 'text-slate-300'}>
              {tensionLevel}%
            </span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-300 ${
                tensionLevel > 65 ? 'bg-rose-500' : tensionLevel > 40 ? 'bg-amber-400' : 'bg-emerald-400'
              }`}
              style={{ width: `${tensionLevel}%` }}
            />
          </div>
        </div>

        {/* Peace Reputation */}
        <div className="space-y-1">
          <div className="flex justify-between font-semibold">
            <span className="flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Reputación Pacífica
            </span>
            <span className="text-emerald-400 font-bold">
              {peaceReputation}%
            </span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-400 rounded-full transition-all duration-300"
              style={{ width: `${peaceReputation}%` }}
            />
          </div>
        </div>

        {/* Tranquility */}
        <div className="space-y-1">
          <div className="flex justify-between font-semibold">
            <span className="flex items-center gap-1 text-slate-300">
              <Heart className="w-3.5 h-3.5 text-sky-400" />
              Tranquilidad
            </span>
            <span className="text-sky-400 font-bold">
              {tranquility}%
            </span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-sky-400 rounded-full transition-all duration-300"
              style={{ width: `${tranquility}%` }}
            />
          </div>
        </div>

      </div>

      {/* Floating notification alert */}
      {recentNotification && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-xs text-emerald-200 flex items-center gap-2 animate-in slide-in-from-top-2 shadow-lg">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{recentNotification}</span>
        </div>
      )}

      {/* 2D INTERACTIVE SCENARIO CANVAS MAP */}
      <div className="relative">
        <div
          ref={mapContainerRef}
          onClick={handleMapClick}
          className="relative w-full h-[450px] sm:h-[500px] rounded-3xl overflow-hidden border-2 border-slate-800 bg-slate-950 shadow-2xl select-none cursor-crosshair group"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.9) 100%)`
          }}
        >
          {/* Subtle Grid floor overlay */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />

          {/* Map Zones / Buildings */}
          {activeMap.zones.map((zone) => (
            <div
              key={zone.id}
              className={`absolute rounded-2xl border ${zone.colorClass} ${zone.borderClass} p-2 flex flex-col justify-between transition-all pointer-events-none shadow-lg`}
              style={{
                left: `${zone.x}%`,
                top: `${zone.y}%`,
                width: `${zone.width}%`,
                height: `${zone.height}%`
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs font-bold text-white px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-sm border border-white/10 shadow-sm truncate max-w-[90%]">
                  {zone.label}
                </span>
                {zone.isSafeZone && (
                  <span className="text-[10px] bg-emerald-500/30 text-emerald-300 px-1 rounded font-bold">
                    Seguro
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* Safe Zone Target Ping / Final Flag */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center"
            style={{
              left: `${activeMap.safeZoneTarget.x}%`,
              top: `${activeMap.safeZoneTarget.y}%`
            }}
          >
            <div className="relative">
              <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-emerald-400 opacity-70" />
              <div className="w-10 h-10 rounded-full bg-emerald-500/30 border-2 border-emerald-400 flex items-center justify-center text-lg shadow-lg shadow-emerald-500/40">
                🏁
              </div>
            </div>
            <span className="mt-1 px-2 py-0.5 rounded bg-slate-950/90 border border-emerald-500/50 text-[10px] font-bold text-emerald-300 whitespace-nowrap shadow-md">
              {activeMap.safeZoneTarget.label}
            </span>
          </div>

          {/* Collectible Items */}
          {activeMap.items.map((item) => {
            const isCollected = collectedItemIds.includes(item.id);
            if (isCollected) return null;
            return (
              <div
                key={item.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300 animate-bounce"
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`
                }}
              >
                <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-300 flex items-center justify-center text-base shadow-lg shadow-amber-400/30">
                  {item.icon}
                </div>
                <span className="text-[9px] bg-slate-950/90 text-amber-300 px-1 rounded block text-center mt-0.5 font-bold">
                  {item.name}
                </span>
              </div>
            );
          })}

          {/* NPCs (Characters on the map) */}
          {activeMap.npcs.map((npc) => {
            const isResolved = resolvedNPCIds.includes(npc.id);
            const isHot = npc.conflictType === 'hot';
            return (
              <div
                key={npc.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleInteractWithNPC(npc);
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group flex flex-col items-center transition-transform hover:scale-110 z-10"
                style={{
                  left: `${npc.x}%`,
                  top: `${npc.y}%`
                }}
              >
                {/* Speech Prompt Bubble */}
                <div className={`mb-1 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-md border backdrop-blur-md transition-all ${
                  isResolved
                    ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/40'
                    : isHot
                    ? 'bg-rose-950/90 text-rose-300 border-rose-500/50 animate-pulse'
                    : 'bg-sky-950/90 text-sky-300 border-sky-500/40'
                }`}>
                  <MessageSquare className="w-3 h-3" />
                  <span>{isResolved ? '✓ En paz' : npc.name.split(' ')[0]}</span>
                </div>

                {/* NPC Avatar representation */}
                <div className={`relative w-12 h-14 rounded-2xl flex items-center justify-center text-xl shadow-xl transition-all border-2 ${
                  isResolved
                    ? 'bg-emerald-900/60 border-emerald-400 shadow-emerald-500/20'
                    : isHot
                    ? 'bg-rose-900/60 border-rose-500 shadow-rose-500/30'
                    : 'bg-sky-900/60 border-sky-400 shadow-sky-500/20'
                }`}>
                  <CharacterSprite look={npc.avatar} size={42} mood={isResolved ? 'happy' : undefined} />
                </div>

                <span className="text-[9px] text-slate-300 bg-slate-950/80 px-1 rounded mt-0.5 font-semibold">
                  {npc.role.split(' ')[0]}
                </span>
              </div>
            );
          })}

          {/* Click target ping indicator */}
          {targetPos && (
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ left: `${targetPos.x}%`, top: `${targetPos.y}%` }}
            >
              <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-emerald-400 opacity-60" />
              <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-lg" />
            </div>
          )}

          {/* THE MOVING PLAYER CHARACTER */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-75 z-20 flex flex-col items-center"
            style={{
              left: `${playerPos.x}%`,
              top: `${playerPos.y}%`
            }}
          >
            {/* Player Name Tag & Character Tag */}
            <div className="mb-1 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-extrabold shadow-lg flex items-center gap-1">
              <span>{selectedCharacter.name.split(' ')[0]}</span>
              <span>(Tú)</span>
            </div>

            {/* Animated Avatar Body */}
            <div className={`relative w-14 h-[68px] rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-sky-400 p-[2px] shadow-2xl shadow-emerald-500/40 transition-transform ${
              isWalking ? 'scale-105 -translate-y-1' : ''
            }`}>
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center relative overflow-hidden">
                <span className={`transition-transform duration-150 ${
                  facingDirection === 'left' ? '-scale-x-100' : ''
                }`}>
                  <CharacterSprite look={selectedCharacter.id} size={58} walking={isWalking} />
                </span>

                {/* Subtle direction dot */}
                <span className={`absolute w-1.5 h-1.5 rounded-full bg-emerald-400 ${
                  facingDirection === 'up' ? 'top-1 left-1/2 -translate-x-1/2' :
                  facingDirection === 'down' ? 'bottom-1 left-1/2 -translate-x-1/2' :
                  facingDirection === 'left' ? 'left-1 top-1/2 -translate-y-1/2' :
                  'right-1 top-1/2 -translate-y-1/2'
                }`} />
              </div>
            </div>

            {/* Walking Shadow feet */}
            <div className={`w-8 h-2 bg-slate-950/60 rounded-full blur-[1px] mt-0.5 transition-all ${
              isWalking ? 'scale-75' : 'scale-100'
            }`} />
          </div>

          {/* Proximity Floating Action Button */}
          {isNearAnyNPC && nearestNPC && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 animate-in zoom-in-95">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleInteractWithNPC(nearestNPC!);
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs sm:text-sm shadow-2xl shadow-emerald-500/50 hover:scale-105 transition cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Hablar con {nearestNPC.name} [E]</span>
              </button>
            </div>
          )}

          {/* Subtle helper tooltip */}
          <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-[11px] text-slate-300 pointer-events-none flex items-center gap-2">
            <Footprints className="w-3.5 h-3.5 text-emerald-400" />
            <span>Haz clic en el suelo para caminar o usa [WASD] / Flechas</span>
          </div>
        </div>

        {/* Mobile / Touch Controller D-Pad */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-900/60 border border-slate-800 rounded-2xl">
          <div className="text-xs text-slate-400 space-y-1">
            <p className="font-semibold text-slate-200">🎮 Controles de Movimiento:</p>
            <p>• Teclado: <strong>W, A, S, D</strong> o <strong>Flechas</strong> para caminar. Tecla <strong>[E]</strong> para interactuar.</p>
            <p>• Táctil / Ratón: Toca cualquier punto del escenario para caminar automáticamente hacia allá.</p>
          </div>

          {/* Virtual D-Pad */}
          <div className="grid grid-cols-3 gap-1.5 w-36 shrink-0">
            <div />
            <button
              onClick={() => moveDirection('up')}
              className="p-3 bg-slate-800 hover:bg-slate-700 active:bg-emerald-500 active:text-slate-950 text-white rounded-xl flex items-center justify-center transition"
              aria-label="Arriba"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
            <div />
            <button
              onClick={() => moveDirection('left')}
              className="p-3 bg-slate-800 hover:bg-slate-700 active:bg-emerald-500 active:text-slate-950 text-white rounded-xl flex items-center justify-center transition"
              aria-label="Izquierda"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => moveDirection('down')}
              className="p-3 bg-slate-800 hover:bg-slate-700 active:bg-emerald-500 active:text-slate-950 text-white rounded-xl flex items-center justify-center transition"
              aria-label="Abajo"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
            <button
              onClick={() => moveDirection('right')}
              className="p-3 bg-slate-800 hover:bg-slate-700 active:bg-emerald-500 active:text-slate-950 text-white rounded-xl flex items-center justify-center transition"
              aria-label="Derecha"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* INTERACTIVE NPC DIALOGUE MODAL */}
      {activeNPC && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-5 animate-in zoom-in-95">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl">
                  <CharacterSprite look={activeNPC.avatar} size={44} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{activeNPC.name}</h3>
                  <p className="text-xs text-emerald-400 font-medium">{activeNPC.role}</p>
                </div>
              </div>
              <button
                onClick={closeDialog}
                className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 text-xs font-bold"
              >
                Cerrar [ESC]
              </button>
            </div>

            {/* Dialogue Narrative */}
            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
              <p className="text-xs font-semibold text-amber-400 italic">
                "{activeNPC.dialogue.greeting}"
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeNPC.dialogue.narrative}
              </p>
            </div>

            {/* Choices list (if feedback not yet selected) */}
            {!activeChoiceFeedback && (
              <div className="space-y-2.5">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Elige cómo responder o actuar:
                </p>

                <div className="space-y-2">
                  {activeNPC.dialogue.options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleMakeDialogueChoice(opt)}
                      className="w-full p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/50 text-left transition flex items-start gap-3 cursor-pointer group"
                    >
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                        opt.type === 'violent'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                          : opt.type === 'avoidant'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      }`}>
                        {opt.id}
                      </span>
                      <p className="text-xs sm:text-sm text-white group-hover:text-emerald-300 font-medium leading-snug">
                        {opt.text}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Immediate Choice Feedback */}
            {activeChoiceFeedback && (
              <div className="space-y-3 pt-2">
                <div className={`p-4 rounded-xl border ${
                  activeChoiceFeedback.type === 'assertive'
                    ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-200'
                    : 'bg-rose-950/50 border-rose-500/50 text-rose-200'
                }`}>
                  <p className="text-xs sm:text-sm font-semibold mb-2">
                    {activeChoiceFeedback.immediateConsequence}
                  </p>
                  <p className="text-xs text-slate-300">
                    💡 <strong>Tip del Mediador:</strong> {activeChoiceFeedback.mediatorTip}
                  </p>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={closeDialog}
                    className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-md cursor-pointer"
                  >
                    Continuar Explorando el Escenario
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* SCENARIO COMPLETED CELEBRATION MODAL */}
      {scenarioCompleted && (
        <div className="p-6 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/60 border border-emerald-500/40 rounded-3xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 animate-in zoom-in-95">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-3xl shrink-0">
              🏆
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                ¡Objetivo Cumplido con Éxito!
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-white">
                Completaste: {activeMap.name}
              </h4>
              <p className="text-xs text-slate-300 max-w-xl">
                Lograste moverte a salvo sin caer en la trampa de la violencia física. Tu reputación pacífica se mantiene alta.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {currentMapIndex + 1 < EXPLORABLE_MAPS.length ? (
              <button
                onClick={() => switchMap(currentMapIndex + 1)}
                className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition cursor-pointer"
              >
                Siguiente Escenario ➔
              </button>
            ) : (
              <button
                onClick={() => switchMap(0)}
                className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition cursor-pointer"
              >
                Reiniciar desde el Escenario 1
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
