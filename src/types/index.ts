export type TabType = 'inicio' | 'bot' | 'juego' | 'herramientas' | 'buzon' | 'lineas';

export type EmotionIntensity = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface Character {
  id: 'alex' | 'sam' | 'dani';
  name: string;
  role: string;
  age: number;
  avatar: string;
  traits: string[];
  description: string;
  quote: string;
  primaryChallenge: string;
}

export interface ChoiceOption {
  id: 'A' | 'B' | 'C';
  text: string;
  type: 'violent' | 'avoidant' | 'assertive';
  immediateConsequence: string;
  shortTermRisk: string;
  longTermImpact: string;
  peaceScoreDelta: number;
  tensionScoreDelta: number;
  tranquilityDelta: number;
  mediatorTip: string;
  characterReaction: string;
}

export interface ScenarioStage {
  stageId: number;
  stageTitle: string;
  narrative: string;
  dialogueSpeaker: string;
  dialogueText: string;
  crowdReaction: string;
  options: ChoiceOption[];
}

export interface Scenario {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  iconName: string;
  bgGradient: string;
  dangerLevel: 'Bajo' | 'Medio' | 'Crítico';
  stages: ScenarioStage[];
}

export interface GameState {
  selectedCharacter: Character | null;
  selectedScenario: Scenario | null;
  currentStageIndex: number;
  tensionLevel: number; // 0 to 100
  peaceReputation: number; // 0 to 100
  tranquility: number; // 0 to 100
  history: {
    stageIndex: number;
    choice: ChoiceOption;
  }[];
  isCompleted: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  quickActions?: {
    label: string;
    actionPayload: string;
  }[];
  helpfulTool?: 'breathing' | 'responses' | 'emergency' | 'report';
}

export interface BuzonReport {
  id: string;
  trackingCode: string;
  riskType: string;
  location: string;
  gradeShift: string;
  description: string;
  wantsMediation: boolean;
  createdAt: string;
  status: 'Recibido' | 'En revisión confidencial' | 'Canalizado a Convivencia';
}

export interface AssertivePhrase {
  id: string;
  category: 'burlas' | 'reto-pelea' | 'presion-amigos' | 'redes';
  provocation: string;
  response: string;
  explanation: string;
}

export interface WorldNPC {
  id: string;
  name: string;
  role: string;
  avatar: string;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  badge: string;
  conflictType: 'hot' | 'support' | 'neutral';
  isResolved?: boolean;
  dialogue: {
    greeting: string;
    narrative: string;
    options: ChoiceOption[];
  };
}

export interface WorldItem {
  id: string;
  name: string;
  type: 'calm_drop' | 'peace_badge' | 'water';
  icon: string;
  x: number;
  y: number;
  collected: boolean;
  effectText: string;
}

export interface WorldZone {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  colorClass: string;
  borderClass: string;
  label: string;
  isSafeZone?: boolean;
}

export interface ExplorableMap {
  id: string;
  name: string;
  subtitle: string;
  environment: 'calle_colegio' | 'patio_recreo' | 'cancha_barrio';
  themeColor: string;
  playerSpawn: { x: number; y: number };
  safeZoneTarget: { x: number; y: number; label: string };
  objective: string;
  zones: WorldZone[];
  npcs: WorldNPC[];
  items: WorldItem[];
}

