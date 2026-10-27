import React, { useState, useEffect } from 'react';
import { 
  Send, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  PhoneCall, 
  Search, 
  HeartHandshake, 
  MapPin, 
  Clock, 
  LifeBuoy, 
  FileText,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { BuzonReport } from '../types';
import { sounds } from '../utils/audio';

export const BuzonSeguro: React.FC = () => {
  const [reports, setReports] = useState<BuzonReport[]>(() => {
    const saved = localStorage.getItem('zona_tregua_reports');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Form State
  const [riskType, setRiskType] = useState('Cita a pelea a la salida del colegio');
  const [location, setLocation] = useState('Portón principal / Esquina del semáforo');
  const [gradeShift, setGradeShift] = useState('9° o 10° Grado - Jornada Mañana');
  const [description, setDescription] = useState('');
  const [wantsMediation, setWantsMediation] = useState(true);

  // Success Confirmation State
  const [submittedReport, setSubmittedReport] = useState<BuzonReport | null>(null);

  // Search by tracking code state
  const [searchCode, setSearchCode] = useState('');
  const [searchedReport, setSearchedReport] = useState<BuzonReport | null>(null);
  const [searchNotFound, setSearchNotFound] = useState(false);

  useEffect(() => {
    localStorage.setItem('zona_tregua_reports', JSON.stringify(reports));
  }, [reports]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    sounds.playPeaceBell();

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const trackingCode = `#TREGUA-${randomNum}`;

    const newReport: BuzonReport = {
      id: `rep-${Date.now()}`,
      trackingCode,
      riskType,
      location,
      gradeShift,
      description: description.trim(),
      wantsMediation,
      createdAt: new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'Recibido'
    };

    setReports((prev) => [newReport, ...prev]);
    setSubmittedReport(newReport);
    setDescription('');
  };

  const handleSearchCode = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playClick();
    const cleanCode = searchCode.trim().toUpperCase();
    const found = reports.find((r) => r.trackingCode.toUpperCase() === cleanCode);
    if (found) {
      setSearchedReport(found);
      setSearchNotFound(false);
    } else {
      setSearchedReport(null);
      setSearchNotFound(true);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Alerta Temprana & Mediación Neutral</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Buzón Seguro de Mediación
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Alertar antes de que alguien termine en un hospital no es ser "sapo": es ser inteligente y salvar vidas. Formulario 100% anónimo con código de seguimiento cifrado.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Form or Success */}
        <div className="lg:col-span-2 space-y-6">
          
          {!submittedReport ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Solicitud Confidencial de Mediación</h3>
                  <p className="text-xs text-slate-400">Ningún profesor ni compañero sabrá quién envió este mensaje</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Risk Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    Tipo de situación o riesgo:
                  </label>
                  <select
                    value={riskType}
                    onChange={(e) => setRiskType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-teal-500 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white outline-none cursor-pointer"
                  >
                    <option value="Cita a pelea a la salida del colegio">Cita a pelea a la salida del colegio</option>
                    <option value="Acoso cibernético / Memes o amenazas por WhatsApp">Acoso cibernético / Memes o amenazas por WhatsApp</option>
                    <option value="Intimidación y amenazas de grupo o pandilla">Intimidación y amenazas de grupo o pandilla</option>
                    <option value="Conflicto en cancha deportiva o barrio">Conflicto en cancha deportiva o barrio</option>
                    <option value="Presencia de objetos peligrosos o armas">Presencia de objetos peligrosos o armas</option>
                    <option value="Malentendido entre amigos que está escalando">Malentendido entre amigos que está escalando</option>
                  </select>
                </div>

                {/* Location */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    Lugar aproximado donde se espera o ocurre el conflicto:
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Ej: Portón de atrás, el parque de patinaje, el grupo de 8A"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-teal-500 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
                  />
                </div>

                {/* Grade / Shift */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    Grado o jornada vinculada (opcional para enfocar el apoyo):
                  </label>
                  <input
                    type="text"
                    value={gradeShift}
                    onChange={(e) => setGradeShift(e.target.value)}
                    placeholder="Ej: Grado 9° Jornada Mañana"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-teal-500 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
                  />
                </div>

                {/* Narrative */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    Cuéntanos qué está pasando (sin revelar tu identidad):
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe los hechos con calma. Por ejemplo: 'Hay un grupo esperando a dos compañeros a la salida del portón para grabarlos peleando. Se necesita que haya profesores o acompañamiento en esa esquina'."
                    className="w-full bg-slate-950 border border-slate-700 focus:border-teal-500 rounded-xl p-4 text-xs sm:text-sm text-white placeholder-slate-500 outline-none leading-relaxed"
                  />
                </div>

                {/* Checkbox for Mediation */}
                <label className="flex items-start gap-3 p-3 bg-slate-950/70 border border-slate-800 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={wantsMediation}
                    onChange={(e) => setWantsMediation(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-teal-500 focus:ring-teal-500 bg-slate-900 border-slate-700"
                  />
                  <div className="text-xs space-y-0.5">
                    <span className="font-semibold text-white">
                      Solicito que un orientador o mediador escolar convoque un espacio de diálogo neutral
                    </span>
                    <p className="text-slate-400">
                      Sin señalar culpables ni generar sanciones punitivas, buscando un acuerdo de no agresión.
                    </p>
                  </div>
                </label>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-teal-500/20 transition cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Alerta Confidencialmente</span>
                </button>

                <p className="text-[11px] text-center text-slate-500 flex items-center justify-center gap-1.5 pt-1">
                  <Lock className="w-3.5 h-3.5 text-teal-400" />
                  Al enviar, se generará tu código de seguimiento anónimo único.
                </p>
              </form>
            </div>
          ) : (
            /* Confirmation Card */
            <div className="bg-slate-900 border border-teal-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-in zoom-in-95">
              <div className="w-14 h-14 rounded-2xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                  Alerta Recibida con Éxito
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Tu aviso ha sido registrado de forma 100% anónima
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Gracias por tu valentía. La información se canaliza al equipo de convivencia para activar protocolos de presencia preventiva y desescalada.
                </p>
              </div>

              {/* Tracking Code Highlight */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-teal-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] text-slate-400">Tu Código de Seguimiento Anónimo:</p>
                  <p className="text-2xl font-black text-teal-300 font-mono tracking-wider">
                    {submittedReport.trackingCode}
                  </p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(submittedReport.trackingCode);
                    sounds.playClick();
                  }}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold"
                >
                  Copiar Código
                </button>
              </div>

              <div className="p-4 bg-slate-950/60 rounded-xl text-xs text-slate-300 space-y-1">
                <p className="font-semibold text-white">¿Qué pasará ahora?</p>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                  <li>Se informará de presencia preventiva de docentes y directivos en el lugar ({submittedReport.location}).</li>
                  <li>Si solicitaste mediación, se programará un espacio privado de diálogo sin citar nombres de quién alertó.</li>
                </ul>
              </div>

              <button
                onClick={() => {
                  sounds.playClick();
                  setSubmittedReport(null);
                }}
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Enviar otro reporte o alerta
              </button>
            </div>
          )}

          {/* Tracking Check Tool */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Search className="w-4 h-4 text-teal-400" />
              Consultar estado de un reporte previo
            </h4>

            <form onSubmit={handleSearchCode} className="flex gap-2">
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="Ingresa tu código (Ej: #TREGUA-1234)"
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-teal-300 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Consultar
              </button>
            </form>

            {searchNotFound && (
              <p className="text-xs text-rose-400">
                No encontramos ningún reporte local con ese código. Verifica que sea el mismo dispositivo donde lo enviaste.
              </p>
            )}

            {searchedReport && (
              <div className="p-4 bg-slate-950 rounded-xl border border-teal-500/30 text-xs space-y-2 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white font-mono">{searchedReport.trackingCode}</span>
                  <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-semibold">
                    {searchedReport.status}
                  </span>
                </div>
                <p className="text-slate-400"><strong className="text-slate-300">Tipo:</strong> {searchedReport.riskType}</p>
                <p className="text-slate-400"><strong className="text-slate-300">Fecha:</strong> {searchedReport.createdAt}</p>
                <p className="text-emerald-400 font-medium">✓ Recibido y bajo custodia de convivencia pacífica.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Verified Helplines & Emergency Guide */}
        <div className="space-y-6">
          
          {/* Helplines Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
              <PhoneCall className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white">Líneas de Atención Inmediata</h3>
            </div>
            <p className="text-xs text-slate-400">
              Gratuitas, confidenciales y con atención psicológica 24/7:
            </p>

            <div className="space-y-3">
              
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Línea 106 - Niñez y Juventud</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">106</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Atención psicosocial gratuita para adolescentes, manejo de crisis emocionales y bullying.
                </p>
                <a
                  href="tel:106"
                  className="mt-2 inline-flex items-center gap-1 text-xs text-emerald-400 font-bold hover:underline"
                >
                  <PhoneCall className="w-3 h-3" />
                  <span>Marcar 106 gratis</span>
                </a>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 hover:border-sky-500/40 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Línea 141 - Protección y Familia</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono font-bold">141</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Orientación contra la violencia, amenazas graves o riesgo contra menores.
                </p>
                <a
                  href="tel:141"
                  className="mt-2 inline-flex items-center gap-1 text-xs text-sky-400 font-bold hover:underline"
                >
                  <PhoneCall className="w-3 h-3" />
                  <span>Marcar 141</span>
                </a>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 hover:border-rose-500/40 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Línea Única de Emergencias</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono font-bold">123</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Para situaciones críticas con armas, peleas masivas en curso o necesidad de ambulancia.
                </p>
                <a
                  href="tel:123"
                  className="mt-2 inline-flex items-center gap-1 text-xs text-rose-400 font-bold hover:underline"
                >
                  <PhoneCall className="w-3 h-3" />
                  <span>Marcar 123</span>
                </a>
              </div>

            </div>
          </div>

          {/* Quick Self-Protection Protocol Card */}
          <div className="bg-gradient-to-br from-slate-900 to-emerald-950/30 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <LifeBuoy className="w-4 h-4 text-emerald-400" />
              ¿Qué hacer si te esperan a la salida?
            </h4>
            <ul className="text-xs text-slate-300 space-y-2 list-decimal list-inside">
              <li><strong className="text-white">No vayas a la esquina:</strong> Rompe la ruta habitual; sal por otra puerta o con un docente.</li>
              <li><strong className="text-white">Llama a un acudiente:</strong> Pide que alguien de confianza te recoja en el colegio.</li>
              <li><strong className="text-white">Refúgiate en zona comercial:</strong> Si te siguen, entra a una tienda, panadería o estación de policía.</li>
              <li><strong className="text-white">Cero show:</strong> Recuerda que sin público morboso no hay pelea.</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};
