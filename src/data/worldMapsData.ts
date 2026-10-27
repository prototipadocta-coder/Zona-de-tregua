import { ExplorableMap } from '../types';

export const EXPLORABLE_MAPS: ExplorableMap[] = [
  {
    id: 'porton-salida',
    name: '1. Portón Escolar y la Esquina Caliente',
    subtitle: 'El timbre acaba de sonar. Hay un grupo grabando en la esquina.',
    environment: 'calle_colegio',
    themeColor: 'from-amber-900/30 via-slate-900 to-slate-950',
    playerSpawn: { x: 15, y: 70 },
    safeZoneTarget: { x: 88, y: 25, label: 'Parada de Autobús (Zona Segura)' },
    objective: 'Muévete por la calle, esquiva el show violento en la esquina o desactiva la provocación con asertividad y llega seguro al autobús.',
    zones: [
      {
        id: 'colegio-gate',
        name: 'Portón del Colegio',
        x: 5,
        y: 60,
        width: 22,
        height: 35,
        colorClass: 'bg-emerald-950/40',
        borderClass: 'border-emerald-500/40',
        label: '🏫 Portón Principal',
        isSafeZone: true
      },
      {
        id: 'tienda-pepe',
        name: 'Tienda de Don José',
        x: 40,
        y: 65,
        width: 20,
        height: 28,
        colorClass: 'bg-teal-950/40',
        borderClass: 'border-teal-500/40',
        label: '🏪 Tienda y Refugio',
        isSafeZone: true
      },
      {
        id: 'esquina-riesgo',
        name: 'La Esquina Caliente',
        x: 50,
        y: 20,
        width: 26,
        height: 32,
        colorClass: 'bg-rose-950/50',
        borderClass: 'border-rose-500/60 animate-pulse',
        label: '⚠️ Círculo de Teléfonos Grabando',
        isSafeZone: false
      },
      {
        id: 'parada-bus',
        name: 'Parada del Autobús',
        x: 80,
        y: 15,
        width: 18,
        height: 30,
        colorClass: 'bg-sky-950/40',
        borderClass: 'border-sky-500/50',
        label: '🚌 Parada Segura',
        isSafeZone: true
      }
    ],
    items: [
      {
        id: 'water-1',
        name: 'Botella de Agua Fría',
        type: 'water',
        icon: '💧',
        x: 35,
        y: 75,
        collected: false,
        effectText: '¡Tomaste agua! La adrenalina baja un 15%.'
      },
      {
        id: 'badge-1',
        name: 'Insignia de Mediación',
        type: 'peace_badge',
        icon: '🛡️',
        x: 48,
        y: 72,
        collected: false,
        effectText: '¡Ganaste una insignia de paz! +25 Reputación.'
      },
      {
        id: 'calm-1',
        name: 'Audífonos Anti-Ruido',
        type: 'calm_drop',
        icon: '🎧',
        x: 75,
        y: 40,
        collected: false,
        effectText: '¡Ignoras los gritos del público! Tranquilidad +20.'
      }
    ],
    npcs: [
      {
        id: 'npc-mateo',
        name: 'Mateo (Provocador)',
        role: 'Busca pelea para ganar vistas en redes',
        avatar: '😠',
        x: 58,
        y: 32,
        badge: 'Zona de Conflicto Inminente',
        conflictType: 'hot',
        isResolved: false,
        dialogue: {
          greeting: '¡Ey! ¿A dónde crees que vas tan campante?',
          narrative: 'Mateo se para con los brazos cruzados y te bloquea el paso. Sus amigos encienden las luces del flash para grabar.',
          options: [
            {
              id: 'A',
              text: 'Gritarle con rabia y empujarlo: "¡A mí nadie me tapa el camino, quítate o te reviento!"',
              type: 'violent',
              immediateConsequence: 'Mateo te tira un golpe. Se arma la riña en el andén y los celulares graban todo.',
              shortTermRisk: 'Golpe fuerte en el pómulo, ropa rota y llega la patrulla de infancia.',
              longTermImpact: 'Anotación en observador, citación de padres y proceso en fiscalía de menores.',
              peaceScoreDelta: -35,
              tensionScoreDelta: 45,
              tranquilityDelta: -40,
              mediatorTip: 'Le diste exactamente el show sangriento que vinieron a grabar.',
              characterReaction: 'Sientes el cuerpo hirviendo pero la situación se descontroló.'
            },
            {
              id: 'B',
              text: 'Agachar la cabeza sin decir nada y cruzar corriendo la calle esquivando carros.',
              type: 'avoidant',
              immediateConsequence: 'El grupo se burla a carcajadas: "¡Miren cómo corre el gallina!". Casi te atropella una moto.',
              shortTermRisk: 'Peligro de accidente de tránsito y el acoso continuará mañana.',
              longTermImpact: 'Miedo acumulado y sensación de soledad e impotencia.',
              peaceScoreDelta: -10,
              tensionScoreDelta: 20,
              tranquilityDelta: -25,
              mediatorTip: 'Huir descontroladamente sin comunicar un límite firme pone en riesgo tu vida física.',
              characterReaction: 'Llegas agitado y con el corazón en la garganta.'
            },
            {
              id: 'C',
              text: 'Mirarlo fijamente con calma y manos visibles: "No voy a pelear contigo para que ellos tengan un video de TikTok. Si tienes algo real, lo hablamos mañana con mediación."',
              type: 'assertive',
              immediateConsequence: 'Desarmas el morbo del público. Los que grababan bajan sus teléfonos diciendo: "Bueno, no hubo nada". Mateo queda en silencio.',
              shortTermRisk: 'Una burla menor, pero el círculo se disuelve y puedes seguir tu camino con dignidad.',
              longTermImpact: 'Ganas respeto real como alguien inteligente que no cae en trampas baratas.',
              peaceScoreDelta: 40,
              tensionScoreDelta: -30,
              tranquilityDelta: 35,
              mediatorTip: 'La asertividad pública deja al provocador sin guion. Rompiste la dinámica del circo.',
              characterReaction: 'Caminas con paso firme hacia la parada de autobús con la frente en alto.'
            }
          ]
        }
      },
      {
        id: 'npc-profe-carmen',
        name: 'Orientadora Carmen',
        role: 'Docente y mediadora del colegio',
        avatar: '👩‍🏫',
        x: 18,
        y: 65,
        badge: 'Red de Apoyo Escolar',
        conflictType: 'support',
        isResolved: false,
        dialogue: {
          greeting: 'Hola, ¿todo bien por la salida?',
          narrative: 'La profesora Carmen está observando el portón para asegurar que los estudiantes salgan tranquilos.',
          options: [
            {
              id: 'C',
              text: '"Profe, en la esquina de allá hay un grupo esperando para grabar una pelea. ¿Podría asomarse para que se dispersen?"',
              type: 'assertive',
              immediateConsequence: 'La orientadora camina hacia la esquina con su chaleco institucional y el grupo de mirones se retira de inmediato.',
              shortTermRisk: 'Ninguno. La presencia de un adulto neutral disuelve el peligro en 10 segundos.',
              longTermImpact: 'Evitaste una tragedia escolar sin exponerte ni ponerte en riesgo.',
              peaceScoreDelta: 30,
              tensionScoreDelta: -25,
              tranquilityDelta: 30,
              mediatorTip: 'Pedir presencia institucional oportuna salva a tus compañeros de cometer el error de su vida.',
              characterReaction: 'Respiras con alivio al ver cómo la esquina se despeja.'
            },
            {
              id: 'B',
              text: '"No pasa nada profe, todo normal" (aunque sabes que van a pelear)',
              type: 'avoidant',
              immediateConsequence: 'La orientadora entra al colegio y dejas a tus compañeros a merced de la riña.',
              shortTermRisk: 'La pelea ocurrirá sin que nadie pueda intervenir.',
              longTermImpact: 'Culpabilidad moral si alguien resulta gravemente herido.',
              peaceScoreDelta: -10,
              tensionScoreDelta: 15,
              tranquilityDelta: -15,
              mediatorTip: 'El silencio cómplice es el mejor aliado de la violencia.',
              characterReaction: 'Te vas con remordimiento en el pecho.'
            }
          ]
        }
      },
      {
        id: 'npc-don-jose',
        name: 'Don José (Tienda)',
        role: 'Comerciante vecino de confianza',
        avatar: '👨‍🍳',
        x: 45,
        y: 78,
        badge: 'Refugio Seguro',
        conflictType: 'support',
        isResolved: false,
        dialogue: {
          greeting: '¡Buenas tardes! Entra un momento hijo.',
          narrative: 'Don José ve el alboroto en la calle y te ofrece entrar a su tienda.',
          options: [
            {
              id: 'C',
              text: '"Don José, ¿me permite esperar aquí adentro unos minutos mientras pasa el tumulto?"',
              type: 'assertive',
              immediateConsequence: 'Don José te invita a sentarte y te regala un vaso de agua fría mientras la multitud se disuelve.',
              shortTermRisk: 'Ninguno. Estás en un espacio seguro con adultos.',
              longTermImpact: 'Aprendes a usar los comercios barriales como puntos seguros de resguardo.',
              peaceScoreDelta: 20,
              tensionScoreDelta: -20,
              tranquilityDelta: 25,
              mediatorTip: 'Buscar un refugio seguro es la decisión táctica más inteligente ante una multitud agresiva.',
              characterReaction: 'Tu ritmo cardíaco se normaliza y esperas seguro.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'patio-recreo',
    name: '2. El Patio Central y Pasillos (El Meme Viral)',
    subtitle: 'Recreo de 10:15 AM. Circula un meme denigrante en el grupo de WhatsApp.',
    environment: 'patio_recreo',
    themeColor: 'from-sky-900/30 via-slate-900 to-slate-950',
    playerSpawn: { x: 15, y: 30 },
    safeZoneTarget: { x: 85, y: 75, label: 'Oficina de Psicorientación' },
    objective: 'Explora el patio escolar, frena la cadena de ciberacoso y llega a la sala de orientación escolar.',
    zones: [
      {
        id: 'bancas-patio',
        name: 'Bancas de Descanso',
        x: 10,
        y: 15,
        width: 25,
        height: 35,
        colorClass: 'bg-slate-800/40',
        borderClass: 'border-slate-700/60',
        label: '🌳 Bancas de Convivencia',
        isSafeZone: true
      },
      {
        id: 'mural-paz',
        name: 'Mural de Convivencia',
        x: 40,
        y: 12,
        width: 22,
        height: 25,
        colorClass: 'bg-emerald-950/40',
        borderClass: 'border-emerald-500/40',
        label: '🎨 Mural de Acuerdos',
        isSafeZone: true
      },
      {
        id: 'grupo-chisme',
        name: 'Grupo del Meme Viral',
        x: 52,
        y: 55,
        width: 24,
        height: 30,
        colorClass: 'bg-amber-950/40',
        borderClass: 'border-amber-500/50',
        label: '📱 Corro de Estudiantes con Celulares',
        isSafeZone: false
      },
      {
        id: 'orientacion-box',
        name: 'Psicorientación Escolar',
        x: 75,
        y: 60,
        width: 22,
        height: 35,
        colorClass: 'bg-teal-950/40',
        borderClass: 'border-teal-500/50',
        label: '🚪 Oficina de Orientación',
        isSafeZone: true
      }
    ],
    items: [
      {
        id: 'water-patio',
        name: 'Bebedero de Agua Pura',
        type: 'water',
        icon: '🚰',
        x: 35,
        y: 35,
        collected: false,
        effectText: 'Bebiste agua del patio. Tensión -10%.'
      },
      {
        id: 'badge-patio',
        name: 'Guía de Convivencia Digital',
        type: 'peace_badge',
        icon: '📖',
        x: 65,
        y: 25,
        collected: false,
        effectText: 'Conoces tus derechos digitales. Reputación +20.'
      }
    ],
    npcs: [
      {
        id: 'npc-lucas',
        name: 'Lucas (Administrador del Grupo)',
        role: 'Reenvió el meme a más de 80 personas',
        avatar: '😏',
        x: 58,
        y: 68,
        badge: 'Foco de Ciberacoso',
        conflictType: 'hot',
        isResolved: false,
        dialogue: {
          greeting: 'Uy, mira quién viene. ¿Ya viste el sticker nuevo en el grupo?',
          narrative: 'Lucas se ríe con otros tres mostrando la pantalla con la foto alterada.',
          options: [
            {
              id: 'A',
              text: 'Quitarle el celular de un manotazo y romperlo contra el suelo.',
              type: 'violent',
              immediateConsequence: 'Lucas te empuja y sus amigos se van a los golpes. Además tendrás que pagar un celular de 1 millón de pesos.',
              shortTermRisk: 'Pelea masiva en el patio frente al coordinador y deuda familiar.',
              longTermImpact: 'Matrícula condicional por daño a propiedad ajena y agresión.',
              peaceScoreDelta: -30,
              tensionScoreDelta: 40,
              tranquilityDelta: -35,
              mediatorTip: 'La violencia contra los objetos solo empeora tu situación legal.',
              characterReaction: 'Te sientes atrapado y con cargos económicos encima.'
            },
            {
              id: 'C',
              text: 'Pararte con serenidad y decirle en voz clara: "Tengo las capturas guardadas. Si no borras el sticker y pides disculpas públicas en el grupo, este recreo se abre expediente de ciberacoso en rectoría."',
              type: 'assertive',
              immediateConsequence: 'Lucas traga saliva al ver que sabes las leyes. Borra el sticker del grupo de inmediato y pide disculpas.',
              shortTermRisk: 'Lucas murmura algo pero el ciberacoso queda frenado de raíz.',
              longTermImpact: 'Proteges tu imagen y pones un precedente de respeto digital en el grado.',
              peaceScoreDelta: 35,
              tensionScoreDelta: -25,
              tranquilityDelta: 30,
              mediatorTip: 'Los ciberacosadores dependen de la impunidad. La ley y los protocolos los frenan en seco.',
              characterReaction: 'Sonríes con calma sabiendo que usaste el cerebro y no los puños.'
            }
          ]
        }
      },
      {
        id: 'npc-vale',
        name: 'Valentina (Amiga Mediadora)',
        role: 'Compañera leal que te apoya',
        avatar: '🤝',
        x: 22,
        y: 25,
        badge: 'Compañera Segura',
        conflictType: 'support',
        isResolved: false,
        dialogue: {
          greeting: '¡Parce! Qué bueno que te veo. Vi lo que mandaron al grupo.',
          narrative: 'Valentina te da un abrazo y te ofrece acompañarte a orientación.',
          options: [
            {
              id: 'C',
              text: '"Gracias Vale. Acompáñame a la oficina de orientación para radicar esto de forma institucional."',
              type: 'assertive',
              immediateConsequence: 'Van juntos y la orientadora abre un acta de mediación digital confidencial.',
              shortTermRisk: 'Ninguno. Estás respaldado por un amigo y un orientador.',
              longTermImpact: 'Sientes la fuerza de la verdadera amistad.',
              peaceScoreDelta: 25,
              tensionScoreDelta: -20,
              tranquilityDelta: 25,
              mediatorTip: 'Tener una red de apoyo escolar reduce el estrés del acoso en un 80%.',
              characterReaction: 'Sientes que no estás solo contra el mundo.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'cancha-barrio',
    name: '3. La Cancha del Barrio (El Partido Caliente)',
    subtitle: 'Minuto 89 de partido. Una entrada fuerte y la barra rival saltando la reja.',
    environment: 'cancha_barrio',
    themeColor: 'from-emerald-900/30 via-slate-900 to-slate-950',
    playerSpawn: { x: 20, y: 50 },
    safeZoneTarget: { x: 85, y: 20, label: 'Kiosco Comunitario y Salida' },
    objective: 'Enfría la tensión en la cancha de microfútbol, habla con los capitanes y evita que el juego termine en gresca.',
    zones: [
      {
        id: 'cancha-juego',
        name: 'Cancha de Microfútbol',
        x: 15,
        y: 25,
        width: 50,
        height: 55,
        colorClass: 'bg-emerald-950/30',
        borderClass: 'border-emerald-500/40',
        label: '⚽ Cancha y Balón',
        isSafeZone: false
      },
      {
        id: 'grada-barra',
        name: 'Gradas de la Barra Rival',
        x: 68,
        y: 50,
        width: 25,
        height: 40,
        colorClass: 'bg-rose-950/40',
        borderClass: 'border-rose-500/40 animate-pulse',
        label: '🥁 Barra Animando el Conflicto',
        isSafeZone: false
      },
      {
        id: 'banca-arbitro',
        name: 'Mesa del Árbitro Comunitario',
        x: 75,
        y: 15,
        width: 20,
        height: 30,
        colorClass: 'bg-sky-950/40',
        borderClass: 'border-sky-500/40',
        label: '🏁 Kiosco del Árbitro',
        isSafeZone: true
      }
    ],
    items: [
      {
        id: 'water-cancha',
        name: 'Termo con Electrolitos',
        type: 'water',
        icon: '🧊',
        x: 40,
        y: 20,
        collected: false,
        effectText: 'Te hidratas después de correr. Tensión -15%.'
      },
      {
        id: 'badge-cancha',
        name: 'Cinta de Capitán de Juego Limpio',
        type: 'peace_badge',
        icon: '🎗️',
        x: 55,
        y: 45,
        collected: false,
        effectText: '¡Liderazgo deportivo pacífico! +30 Reputación.'
      }
    ],
    npcs: [
      {
        id: 'npc-camilo',
        name: 'Camilo (Delantero Rival)',
        role: 'Caliente por la jugada dividida',
        avatar: '😤',
        x: 45,
        y: 50,
        badge: 'Furia en la Cancha',
        conflictType: 'hot',
        isResolved: false,
        dialogue: {
          greeting: '¡Te me tiraste con todo! ¿Crees que me vas a lesionar gratis?',
          narrative: 'Camilo se levanta empujando con el pecho mientras los de la tribuna gritan: "¡Pégale Camilo!".',
          options: [
            {
              id: 'A',
              text: 'Responder al pechazo con un empujón y decirle: "¡Aprende a jugar, tronco!"',
              type: 'violent',
              immediateConsequence: 'La barra salta la reja con palos y se desata una riña barrial incontrolable.',
              shortTermRisk: 'Traumatismos graves, suspensión del torneo y enemistad vecinal.',
              longTermImpact: 'Quedas vetado de los escenarios deportivos del barrio.',
              peaceScoreDelta: -40,
              tensionScoreDelta: 45,
              tranquilityDelta: -40,
              mediatorTip: 'El deporte debe unir barrios, no dividirlos por un impulso de 5 segundos.',
              characterReaction: 'Ves a tu equipo corriendo para defenderse del caos.'
            },
            {
              id: 'C',
              text: 'Extender la mano para ayudarlo a levantarse: "Fue una jugada al balón, Camilo. Tranquilo, nadie quiere lesionar a nadie. Terminemos el partido jugando fútbol, no peleando."',
              type: 'assertive',
              immediateConsequence: 'Camilo ve tu mano extendida, la toma y se calma. El árbitro felicita el gesto y la barra aplaude la madurez.',
              shortTermRisk: 'El partido sigue con respeto mutuo.',
              longTermImpact: 'Ganas el trofeo de Fair Play y el respeto sincero de toda la comunidad barrial.',
              peaceScoreDelta: 45,
              tensionScoreDelta: -35,
              tranquilityDelta: 40,
              mediatorTip: 'Extender la mano al rival cuando espera un puño es la mayor demostración de grandeza deportiva.',
              characterReaction: 'Sientes orgullo de ser un verdadero deportista.'
            }
          ]
        }
      },
      {
        id: 'npc-arbitro',
        name: 'Don Carlos (Árbitro)',
        role: 'Líder comunal del barrio',
        avatar: '🟨',
        x: 82,
        y: 28,
        badge: 'Autoridad Deportiva',
        conflictType: 'support',
        isResolved: false,
        dialogue: {
          greeting: 'Muchachos, cabeza fría. El deporte es sagrado en este barrio.',
          narrative: 'El árbitro sostiene el balón y pide calma a ambos equipos.',
          options: [
            {
              id: 'C',
              text: '"Don Carlos, pite la reanudación que venimos es a jugar con honor."',
              type: 'assertive',
              immediateConsequence: 'El partido concluye con abrazos entre los equipos.',
              shortTermRisk: 'Ninguno.',
              longTermImpact: 'La comunidad mantiene el torneo abierto para los jóvenes.',
              peaceScoreDelta: 20,
              tensionScoreDelta: -20,
              tranquilityDelta: 20,
              mediatorTip: 'Respaldar a los mediadores fortalece la convivencia del sector.',
              characterReaction: 'Todos terminan compartiendo un jugo en la tienda.'
            }
          ]
        }
      }
    ]
  }
];
