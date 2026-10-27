import React, { useEffect } from 'react';
import { BookOpen, Search, Lock, FileText, CheckCircle, ArrowLeft } from 'lucide-react';

interface DiscreteModeProps {
  onExit: () => void;
}

export const DiscreteMode: React.FC<DiscreteModeProps> = ({ onExit }) => {
  // Allow ESC key to exit discrete mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onExit]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white text-slate-800 font-sans selection:bg-blue-100">
      {/* Top Academic Bar */}
      <header className="border-b border-slate-200 bg-slate-50 px-4 py-2.5 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-3">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span className="font-semibold text-slate-700">Enciclopedia Escolar Digital · Portal de Ciencias Naturales</span>
          <span className="hidden sm:inline bg-slate-200 text-slate-700 px-2 py-0.5 rounded text-[11px]">Unidad 4: Biología Celular</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden md:inline text-slate-400 text-[11px]">Presiona [ESC] o el candado para regresar</span>
          <button
            onClick={onExit}
            title="Volver al espacio seguro"
            className="flex items-center gap-1.5 px-3 py-1 bg-slate-200 hover:bg-slate-300 active:bg-slate-400 text-slate-700 rounded transition text-xs font-medium cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Volver a Tregua</span>
          </button>
        </div>
      </header>

      {/* Disguised search header */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Fotosíntesis y Respiración Celular Vegetal</h1>
            <p className="text-xs text-slate-500 mt-1">Material de consulta para estudiantes · Grado Noveno y Décimo · Ciencias Biológicas</p>
          </div>
          <button
            onClick={onExit}
            className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Cerrar apunte</span>
          </button>
        </div>

        <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2 text-sm text-slate-600 mb-6">
          <Search className="w-4 h-4 text-slate-400 mr-2" />
          <input
            type="text"
            readOnly
            value="Fase luminosa, cloroplastos, ciclo de Calvin y síntesis de ATP"
            className="bg-transparent w-full outline-none text-slate-700 text-xs sm:text-sm"
          />
        </div>

        {/* Article Body */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4 text-sm leading-relaxed text-slate-700">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <h2 className="font-semibold text-emerald-900 mb-1 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-600" />
                Resumen del Tema para Evaluación
              </h2>
              <p className="text-xs text-emerald-800">
                La fotosíntesis es el proceso bioquímico mediante el cual los organismos fotoautótrofos convierten la energía solar en energía química almacenada en moléculas orgánicas como la glucosa.
              </p>
            </div>

            <h3 className="text-base font-semibold text-slate-900 pt-2">1. Fase dependiente de la luz (Fase Lumínica)</h3>
            <p>
              Ocurre en las membranas de los tilacoides dentro de los cloroplastos. Los fotones de luz son capturados por pigmentos fotosintéticos, principalmente la clorofila a y b, excitando electrones que viajan por una cadena transportadora, generando NADPH y trifosfato de adenosina (ATP).
            </p>

            <h3 className="text-base font-semibold text-slate-900 pt-2">2. Fase independiente de la luz (Ciclo de Calvin-Benson)</h3>
            <p>
              Tiene lugar en el estroma del cloroplasto. El dióxido de carbono fijado por la enzima RuBisCO es reducido mediante los equivalentes energéticos generados en la fase luminosa, produciendo gliceraldehído 3-fosfato (G3P).
            </p>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-1 font-mono text-slate-600">
              <p className="font-semibold text-slate-800">Ecuación Química Global Balanceada:</p>
              <p className="text-blue-700">6 CO₂ + 6 H₂O + Energía Lumínica ➔ C₆H₁₂O₆ + 6 O₂</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Preguntas de Taller</h4>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
                  <span>¿Cuál es el rol de los estomas en el intercambio gaseoso?</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
                  <span>Diferencia entre fotosíntesis C3, C4 y CAM.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
                  <span>Factores limitantes: temperatura y concentración de CO₂.</span>
                </li>
              </ul>
            </div>

            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-blue-900">
              <p className="font-semibold mb-1">Nota del estudiante:</p>
              <p className="text-slate-600">
                Entrega de informe individual para el próximo viernes a las 7:00 AM en el laboratorio de química.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
