import React, { useState } from 'react';
import { 
  PhoneCall, 
  ShieldAlert, 
  HeartHandshake, 
  LifeBuoy, 
  MapPin, 
  Copy, 
  Check, 
  AlertCircle, 
  ArrowRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { sounds } from '../utils/audio';

export const LineasAyuda: React.FC = () => {
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num);
    sounds.playClick();
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  const helplineList = [
    {
      id: '106',
      name: 'Línea 106 - "El Poder de Ser Escuchado"',
      category: 'Salud Mental & Niñez/Juventud',
      number: '106',
      description: 'Atención psicológica profesional y gratuita para niños, niñas y adolescentes. Especialistas en desescalar crisis de pánico, rabia, matoneo y conflictos familiares o escolares.',
      hours: '24 horas / 7 días a la semana',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    },
    {
      id: '141',
      name: 'Línea 141 - Protección de Infancia y Adolescencia (ICBF)',
      category: 'Protección Legal y Vulneración de Derechos',
      number: '141',
      description: 'Línea nacional para denunciar amenazas graves, inducción al delito, peleas orquestadas por pandillas externas o acoso continuado.',
      hours: '24 horas / Línea gratuita nacional',
      badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30'
    },
    {
      id: '123',
      name: 'Línea 123 - Emergencias Nacionales & Cuadrante',
      category: 'Emergencia Crítica Inmediata',
      number: '123',
      description: 'Usa esta línea de inmediato si hay personas armadas fuera de la institución, agresiones físicas masivas en curso o una persona herida que necesita ambulancia.',
      hours: 'Atención de respuesta inmediata',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30'
    },
    {
      id: '102',
      name: 'Línea 102 - Apoyo a la Convivencia y Familia',
      category: 'Orientación Psicosocial Familiar',
      number: '102',
      description: 'Orientación para jóvenes cuando los problemas escolares tienen raíz en presiones familiares o barriales.',
      hours: 'Lunes a Domingo',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Red de Apoyo & Protección Inmediata</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Líneas de Ayuda y Primeros Auxilios
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Si sientes que tu seguridad física o la de alguien más está en peligro inminente, no dudes en comunicarte. Son llamadas gratuitas desde cualquier celular, incluso sin saldo.
        </p>
      </div>

      {/* Directory of Hotlines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {helplineList.map((line) => (
          <div
            key={line.id}
            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-4 shadow-xl"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${line.badgeColor}`}>
                  {line.category}
                </span>
                <span className="text-xs text-slate-400 font-medium">{line.hours}</span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{line.name}</h3>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  {line.description}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-white font-mono tracking-wider">
                  {line.number}
                </span>
                <button
                  onClick={() => handleCopy(line.number)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
                  title="Copiar número"
                >
                  {copiedNumber === line.number ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <a
                href={`tel:${line.number}`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition shadow-md shadow-emerald-500/20"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Llamar ahora</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Psychological First Aid (Primeros Auxilios Psicológicos: PAE) */}
      <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Primeros Auxilios Psicológicos (Técnica 5-4-3-2-1)</h3>
            <p className="text-xs text-slate-400">Desactiva la visión de túnel provocada por la adrenalina</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Cuando te amenazan o te da mucha rabia, tu cerebro activa el modo "ataque o huida" y dejas de pensar con claridad. Para volver a tener el control de tu mente en 60 segundos, busca a tu alrededor:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
            <span className="text-2xl font-black text-emerald-400 font-mono">5</span>
            <p className="text-xs font-bold text-white">Cosas que ves</p>
            <p className="text-[11px] text-slate-400">Mira 5 objetos físicos alrededor tuyo (un árbol, un letrero, etc.).</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
            <span className="text-2xl font-black text-teal-400 font-mono">4</span>
            <p className="text-xs font-bold text-white">Cosas que tocas</p>
            <p className="text-[11px] text-slate-400">Toca tu maleta, tus zapatos, la pared o tu reloj.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
            <span className="text-2xl font-black text-sky-400 font-mono">3</span>
            <p className="text-xs font-bold text-white">Cosas que oyes</p>
            <p className="text-[11px] text-slate-400">Presta atención al tráfico, a los pájaros o a voces lejanas.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
            <span className="text-2xl font-black text-amber-400 font-mono">2</span>
            <p className="text-xs font-bold text-white">Cosas que hueles</p>
            <p className="text-[11px] text-slate-400">Percibe el aroma del aire, lluvia, panadería cercana.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
            <span className="text-2xl font-black text-rose-400 font-mono">1</span>
            <p className="text-xs font-bold text-white">Respiración honda</p>
            <p className="text-[11px] text-slate-400">Una exhalación profunda con los labios entreabiertos.</p>
          </div>
        </div>
      </section>

      {/* Protocolo de Convivencia Escolar y Derechos */}
      <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-emerald-400" />
          Tus Derechos Fundamentales en el Entorno Escolar
        </h4>
        <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
          <li><strong>Derecho a la integridad física:</strong> Ningún estudiante ni grupo tiene derecho a citarte ni agredirte, dentro ni fuera de los predios de la institución.</li>
          <li><strong>Garantía de confidencialidad:</strong> Solicitar apoyo o mediación no puede ser castigado ni expuesto en público por los docentes.</li>
          <li><strong>Protección contra el ciberacoso:</strong> Difundir fotos denigrantes, stickers ofensivos o amenazar por redes sociales constituye una falta disciplinaria y un delito sancionable por la ley de delitos informáticos.</li>
        </ul>
      </section>

    </div>
  );
};
