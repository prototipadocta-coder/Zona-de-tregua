import { Character, Scenario, AssertivePhrase } from '../types';

export const CHARACTERS: Character[] = [
  {
    id: 'alex',
    name: 'Alex "Rayo"',
    role: 'El Impulsivo (Aprende a frenar el primer golpe)',
    age: 15,
    avatar: '⚡',
    traits: ['Energético', 'Defensor de los suyos', 'Reacción explosiva', 'Buen deportista'],
    description: 'Tiene la mecha corta. Cuando siente una injusticia o una provocación, la sangre le hierve en 2 segundos. Su gran reto es descubrir que la verdadera fuerza no está en dar el primer golpe, sino en tener el control de su propia mente.',
    quote: '"Si alguien me busca me encuentra... pero estoy cansado de meterme en problemas que no valen la pena."',
    primaryChallenge: 'Frenar los primeros 6 segundos de secuestro emocional antes de que vuele el puño.'
  },
  {
    id: 'sam',
    name: 'Sam "Vortex"',
    role: 'Bajo Presión Social (Aprende a decir NO a la pandilla)',
    age: 14,
    avatar: '🎭',
    traits: ['Creativo', 'Empático', 'Miedo a ser rechazado', 'Observador'],
    description: 'Sus compañeros de grupo le dicen constantemente: "Si no te paras duro te van a tener de trapero". Sam no quiere pelear ni lastimar a nadie, pero le aterra ser blanco de burlas o que lo tilden de "gallina".',
    quote: '"A veces siento que mis supuestos parceros solo quieren ver sangre y grabarme para sus historias."',
    primaryChallenge: 'Desmontar el chantaje de "quedar bien" con gente que no te cuidará si vas a un hospital.'
  },
  {
    id: 'dani',
    name: 'Dani "Escudo"',
    role: 'El Testigo Mediador (Aprende a desactivar la multitud)',
    age: 16,
    avatar: '🛡️',
    traits: ['Líder natural', 'Calmado', 'Estratégico', 'Leal'],
    description: 'Ve cómo dos compañeros de su salón se están citando a la salida. Sabe que si nadie hace nada, esto terminará en urgencias o en comisaría. Debe usar su voz e influencia para disolver el show sin ponerse en peligro.',
    quote: '"Un verdadero líder apaga fuegos, no les echa gasolina."',
    primaryChallenge: 'Romper la energía del círculo de mirones con celulares y llevar a los involucrados a un terreno neutral.'
  }
];

export const SCENARIOS: Scenario[] = [
  {
    id: 'salida-colegio',
    title: 'La Salida del Colegio y la Esquina',
    subtitle: 'El timbre de salida, 30 celulares grabando y una provocación cara a cara.',
    location: 'Esquina del portón lateral, 1:45 PM',
    iconName: 'School',
    bgGradient: 'from-amber-500/20 via-slate-900 to-slate-950',
    dangerLevel: 'Crítico',
    stages: [
      {
        stageId: 1,
        stageTitle: 'Fase 1: La provocación inicial',
        narrative: 'Acabas de cruzar el portón escolar con tu morral al hombro. Mateo, respaldado por tres estudiantes mayores, se para justo frente a ti, te choca intencionalmente el hombro y te tira tu botella de agua al suelo.',
        dialogueSpeaker: 'Mateo (con risa burlona)',
        dialogueText: '¡Ey, fíjate por dónde caminas! O es que ya se te olvidó lo que dijiste en el descanso? Aquí estamos todos, a ver si hablas tan duro ahora.',
        crowdReaction: 'Varios sacan sus teléfonos abriendo la cámara. Se oyen murmullos: "¡Uuuuy, se armó!", "¡Dénse ya!".',
        options: [
          {
            id: 'A',
            text: 'Empujarlo de vuelta con rabia e insultarlo: "¡A mí nadie me empuja, idiota!"',
            type: 'violent',
            immediateConsequence: 'Mateo tira su maleta al suelo y te lanza un puñetazo al pómulo. La gente empieza a gritar y animar la pelea.',
            shortTermRisk: 'Riesgo alto de traumatismo facial, ropa rota y reporte inmediato de la patrulla del cuadrante.',
            longTermImpact: 'Anotación en observador de convivencia, citación urgente de acudientes y suspensión de 5 días con riesgo de pérdida de año.',
            peaceScoreDelta: -30,
            tensionScoreDelta: 45,
            tranquilityDelta: -40,
            mediatorTip: 'El agresor busca tu reacción para justificar su ataque frente al público. Si reaccionas en caliente, tú le estás regalando el guion de su show.',
            characterReaction: 'Sientes el cuerpo hirviendo y el corazón a 160 pulsaciones, pero la situación ya se salió de control.'
          },
          {
            id: 'B',
            text: 'Bajar la mirada, recoger la botella en silencio y caminar rápido aguantando las lágrimas.',
            type: 'avoidant',
            immediateConsequence: 'El grupo se ríe a carcajadas. Mateo te grita "¡Sabía que eras una gallina!" mientras te empujan por la espalda.',
            shortTermRisk: 'La sensación de humillación se convierte en rencor interno. El acoso puede repetirse mañana porque notaron que no pusiste límite.',
            longTermImpact: 'Impacto severo en la autoestima, aislamiento social y deseo peligroso de venganza acumulada.',
            peaceScoreDelta: -10,
            tensionScoreDelta: 15,
            tranquilityDelta: -25,
            mediatorTip: 'Evitar la violencia física es vital, pero agachar la cabeza sin comunicar un límite firme invita al agresor a continuar.',
            characterReaction: 'Te vas con un nudo asfixiante en la garganta y una sensación amarga de impotencia.'
          },
          {
            id: 'C',
            text: 'Mantenerte erguido, mirarlo a los ojos con calma y voz firme: "No tengo nada que hablar contigo con celulares encima ni en la calle. Si tienes un problema real, lo hablamos como personas."',
            type: 'assertive',
            immediateConsequence: 'Mateo se descoloca porque no obtuvo la pelea fácil ni la sumisión que esperaba. Los que grababan bajan los teléfonos al ver que no hay show.',
            shortTermRisk: 'Puede haber algún comentario residual, pero rompiste la dinámica del espectáculo y saliste caminando con la frente en alto.',
            longTermImpact: 'Ganas reputación de alguien maduro que no se deja manipular. Desactivas el 80% de futuras provocaciones.',
            peaceScoreDelta: 35,
            tensionScoreDelta: -25,
            tranquilityDelta: 30,
            mediatorTip: 'La asertividad desarma el morbo. Cuando te niegas a ser el payaso de su circo con firmeza, el agresor queda en ridículo.',
            characterReaction: 'Sientes cómo tu respiración se estabiliza. Mantuviste tu dignidad sin tirar un solo golpe.'
          }
        ]
      },
      {
        stageId: 2,
        stageTitle: 'Fase 2: La presión del público y la segunda embestida',
        narrative: 'Uno de los amigos de Mateo se mete en medio para que no te vayas: "¡Ey, no lo dejen irse tan fácil! ¡Alex tiene miedo!". Mateo se acerca a 20 centímetros de tu rostro invadiendo tu espacio personal.',
        dialogueSpeaker: 'Amigo provocador',
        dialogueText: '¿Te vas a dejar pisotear delante de todo el salón? Demuestra si eres hombre o pura boca.',
        crowdReaction: 'El círculo se cierra más. Ya son más de 15 personas rodeándote en la acera.',
        options: [
          {
            id: 'A',
            text: 'Pegarle un cabezazo o derribarlo contra el pavimento para que entienda.',
            type: 'violent',
            immediateConsequence: 'Ambos caen al suelo entre vidrios rotos. Un golpe en la cabeza contra el bordillo le causa a Mateo una herida abierta sangrante.',
            shortTermRisk: 'Llega la Policía Nacional de Infancia y Adolescencia. Traslado a centro médico en ambulancia y detención por lesiones personales graves.',
            longTermImpact: 'Apertura de proceso judicial penal juvenil. Tu familia deberá pagar gastos médicos e indemnizaciones millonarias; quedas con antecedentes.',
            peaceScoreDelta: -45,
            tensionScoreDelta: 50,
            tranquilityDelta: -50,
            mediatorTip: 'Un golpe en el bordillo de una acera ha dejado a jóvenes en coma o en prisión. Ningún "respeto callejero" vale 8 años de proceso judicial.',
            characterReaction: 'El pánico te invade al ver la sangre en el piso. Todo lo que planeabas para tu vida se desmoronó en 10 segundos.'
          },
          {
            id: 'B',
            text: 'Empezar a discutir verbalmente insultando a sus mamás y a su barrio para defender tu honor.',
            type: 'avoidant',
            immediateConsequence: 'La discusión se calienta tanto que los amigos de ambos bandos se meten y se convierte en una batalla campal de 6 contra 6.',
            shortTermRisk: 'Varios terminan golpeados, heridos con piedras o despojados de sus mochilas.',
            longTermImpact: 'Creas una guerra de pandillas que se prolongará por meses a la salida y entrada del colegio.',
            peaceScoreDelta: -30,
            tensionScoreDelta: 35,
            tranquilityDelta: -30,
            mediatorTip: 'El insulto verbal es la mecha de la violencia colectiva. Quien pierde el control de sus palabras pierde el control de su seguridad.',
            characterReaction: 'Te das cuenta de que involucraste a amigos inocentes en un conflicto destructivo.'
          },
          {
            id: 'C',
            text: 'Dar dos pasos atrás con las manos abiertas visibles: "Miren a sus amigos: solo quieren ver sangre gratis para TikTok mientras nosotros nos jodemos. No me presto para payasadas. Me voy a mi casa."',
            type: 'assertive',
            immediateConsequence: 'Expones la manipulación del público. Varios espectadores dicen: "En verdad tiene razón, vámonos ya". El círculo se dispersa.',
            shortTermRisk: 'Mateo intenta soltar una última palabra, pero sin público su provocación se apaga por completo.',
            longTermImpact: 'Marcas un precedente de liderazgo pacífico en la institución y llegas ileso a tu casa con tu familia tranquila.',
            peaceScoreDelta: 40,
            tensionScoreDelta: -35,
            tranquilityDelta: 35,
            mediatorTip: 'Señalar directamente al público que está usando a ambos como entretenimiento rompe el hechizo de la presión social.',
            characterReaction: 'Inhalas profundamente y caminas con paso seguro hacia la avenida principal donde hay adultos y transporte.'
          }
        ]
      }
    ]
  },
  {
    id: 'redes-whatsapp',
    title: 'El Grupo de WhatsApp y las Redes',
    subtitle: 'Stickers denigrantes, capturas fuera de contexto y una cita a los golpes por chat.',
    location: 'Teléfono móvil - Chat grupal "La Pesada del Salón" (92 miembros)',
    iconName: 'MessageSquareWarning',
    bgGradient: 'from-sky-500/20 via-slate-900 to-slate-950',
    dangerLevel: 'Medio',
    stages: [
      {
        stageId: 1,
        stageTitle: 'Fase 1: La burla viral',
        narrative: 'Son las 8:30 PM. Te llega una notificación tras otra. Abres WhatsApp y ves un meme con una foto tuya sacada de contexto, acompañada de burlas sobre tu familia o tu físico, reenviada más de 40 veces.',
        dialogueSpeaker: 'Administrador del grupo',
        dialogueText: 'JAJAJAJA miren esto. Si no dice nada es porque es verdad. Mañana le toca aguantar la parada.',
        crowdReaction: 'Lluvia de stickers riéndose, audios gritando y reacciones con fuegos.',
        options: [
          {
            id: 'A',
            text: 'Enviar un audio insultando a todos con groserías y amenazar con buscar a los administradores mañana para darles una paliza.',
            type: 'violent',
            immediateConsequence: 'Descargan tu audio de amenazas, lo cortan y lo comparten con directivos y en otros colegios diciendo que tú eres el agresor.',
            shortTermRisk: 'El pantallazo de tu amenaza se convierte en prueba legal en tu contra por hostigamiento y amenazas.',
            longTermImpact: 'Sanción disciplinaria severa en el comité de convivencia escolar y pérdida del derecho a grado.',
            peaceScoreDelta: -25,
            tensionScoreDelta: 40,
            tranquilityDelta: -35,
            mediatorTip: 'En internet, las palabras quedan grabadas para siempre. Nunca respondas a una ofensa con una amenaza escrita o en audio.',
            characterReaction: 'Te das cuenta de que caíste redondito en su trampa digital.'
          },
          {
            id: 'B',
            text: 'Salirte del grupo, apagar el celular y quedarte sufriendo solo en tu habitación sin decírselo a nadie.',
            type: 'avoidant',
            immediateConsequence: 'La desinformación sigue corriendo sin que nadie la aclare y la angustia te quita el sueño toda la noche.',
            shortTermRisk: 'Aparecen ataques de pánico ante la idea de tener que ir a clase al día siguiente.',
            longTermImpact: 'El ciberacoso no se detiene si no se activa la ruta institucional de convivencia digital.',
            peaceScoreDelta: -5,
            tensionScoreDelta: 20,
            tranquilityDelta: -30,
            mediatorTip: 'Desconectarse para calmarse es bueno, pero esconderse en soledad permite que la mentira crezca. La clave es documentar sin engancharse.',
            characterReaction: 'Pasas la noche en vela con dolor de estómago y miedo.'
          },
          {
            id: 'C',
            text: 'Tomar capturas de pantalla de todo con fecha y hora, silenciar el grupo, y escribir solo una vez: "Tengo las pruebas de este hostigamiento guardadas para la ruta de convivencia. Quien tenga algo que resolver, cara a cara en rectoría."',
            type: 'assertive',
            immediateConsequence: 'Varios eliminan sus mensajes por temor a las consecuencias legales del ciberacoso. El administrador borra el meme.',
            shortTermRisk: 'Alguno dirá "uy se asustó", pero el miedo a sanciones reales frena el tren de burlas de inmediato.',
            longTermImpact: 'Proteges tu huella digital y utilizas las normas institucionales a tu favor sin desgastarte emocionalmente.',
            peaceScoreDelta: 30,
            tensionScoreDelta: -30,
            tranquilityDelta: 35,
            mediatorTip: 'El ciberacoso se nutre del anonimato y la impunidad percibida. Cuando demuestras que hay registro formal y leyes de por medio, los atacantes retroceden.',
            characterReaction: 'Duermes tranquilo sabiendo que actuaste con inteligencia estratégica y tienes las pruebas en mano.'
          }
        ]
      }
    ]
  },
  {
    id: 'cancha-barrio',
    title: 'La Cancha del Barrio (El Partido de Barrio)',
    subtitle: 'Falta discutida en el minuto final, ánimos encendidos y barras rivales empujando.',
    location: 'Polideportivo del barrio, 5:30 PM',
    iconName: 'Trophy',
    bgGradient: 'from-emerald-500/20 via-slate-900 to-slate-950',
    dangerLevel: 'Medio',
    stages: [
      {
        stageId: 1,
        stageTitle: 'Fase 1: La jugada caliente',
        narrative: 'Final del torneo de microfútbol barrial. Hay una jugada dividida, un rival te mete el codo en las costillas y el árbitro no pita nada. El rival te mira con desprecio y te escupe cerca de los pies.',
        dialogueSpeaker: 'Camilo (delantero rival)',
        dialogueText: 'Levántate, nena. Esto es fútbol para hombres, no para llorones. Si te duele, anda con tu mamá.',
        crowdReaction: 'La barra de la otra cuadra empieza a golpear las mallas metálicas de la cancha gritando provocaciones.',
        options: [
          {
            id: 'A',
            text: 'Levantarse y meterle un puño en la boca directo para cobrar venganza de la falta.',
            type: 'violent',
            immediateConsequence: 'La barra rival invade la cancha con palos y cadenas. Se desata una batalla campal en la que tus amigos quedan atrapados.',
            shortTermRisk: 'Fracturas, heridas con armas contundentes y la clausura total del torneo deportivo comunitario.',
            longTermImpact: 'Vetado de las canchas del sector; se crea una enemistad peligrosa entre dos barrios enteros.',
            peaceScoreDelta: -35,
            tensionScoreDelta: 45,
            tranquilityDelta: -45,
            mediatorTip: 'En el deporte barrial, el verdadero crack responde con juego limpio y goles, nunca con los puños. Quien se calienta, pierde.',
            characterReaction: 'Ves a un amigo tuyo en el suelo herido por una riña que detonaste por un impulso.'
          },
          {
            id: 'B',
            text: 'Quedarte tirado fingiendo una lesión gravísima para ver si echan al rival, mientras murmuras insultos en voz baja.',
            type: 'avoidant',
            immediateConsequence: 'El partido se detiene en un ambiente tóxico de reclamos y nadie disfruta el juego.',
            shortTermRisk: 'Se mantiene la animadversión y el resentimiento para el final del partido.',
            longTermImpact: 'No se resuelve el conflicto y la violencia latente sigue esperando otra oportunidad.',
            peaceScoreDelta: 0,
            tensionScoreDelta: 10,
            tranquilityDelta: -10,
            mediatorTip: 'La victimización pasiva no desescala; prolonga el resentimiento en la cancha.',
            characterReaction: 'Te sientes frustrado y con mal sabor de boca.'
          },
          {
            id: 'C',
            text: 'Ponerte de pie con serenidad, pedir el balón con las manos, mirar al capitán rival y decir: "Jugamos al balón o nos ponemos a pelear como niños? Quedan 5 minutos, definámoslo jugando limpio."',
            type: 'assertive',
            immediateConsequence: 'El capitán rival le llama la atención a Camilo: "Ya cálmate Camilo, juguemos". El árbitro reanuda y la tensión baja notablemente.',
            shortTermRisk: 'El rival tendrá que morderse la lengua y aceptar el reto deportivo sin pretextos.',
            longTermImpact: 'Te ganas el respeto de ambas barras y de la comunidad por defender el deporte y la paz barrial.',
            peaceScoreDelta: 40,
            tensionScoreDelta: -35,
            tranquilityDelta: 40,
            mediatorTip: 'Apelar a la cordura de los líderes del grupo contrario crea un puente de honor que desactiva al provocador individual.',
            characterReaction: 'Sientes orgullo de haber salvado el partido y la integridad de tus amigos.'
          }
        ]
      }
    ]
  }
];

export const ASSERTIVE_RESPONSES: AssertivePhrase[] = [
  {
    id: '1',
    category: 'reto-pelea',
    provocation: '¡A la salida nos vemos, si es que no te cagas!',
    response: '"A la salida me voy para mi casa a almorzar y estar con mi gente. Yo no necesito pelear en una esquina para saber cuánto valgo."',
    explanation: 'Desmonta el concepto falso de hombría y prioriza tu tranquilidad y tu familia sin insultar ni rebajarte.'
  },
  {
    id: '2',
    category: 'burlas',
    provocation: '¡Mírenlo, tiene miedo! ¡Es pura gallina!',
    response: '"Tener miedo a lastimarme la cara o a quedar en una estación de policía no es ser cobarde; se llama tener planes para mi vida."',
    explanation: 'Redefine la cobardía: ser inteligente no es cobardía, es visión de futuro.'
  },
  {
    id: '3',
    category: 'presion-amigos',
    provocation: '¡Pégale parcero! Si no le das, usted no es de los nuestros.',
    response: '"Si me mandan al hospital o a un reformatorio, ¿ustedes van a ir a pagar la condena por mí? No me pidan que haga estupideces por ustedes."',
    explanation: 'Obliga a los "amigos" a asumir la realidad: ellos no pagarán las consecuencias de tus heridas ni de tu récord judicial.'
  },
  {
    id: '4',
    category: 'redes',
    provocation: 'Te mencionan en un post ofensivo esperando que respondas con furia.',
    response: '"(Silenciar y no contestar en público). Guardar captura y enviar mensaje privado: Si tienes una queja real sobre mí, dímela en persona y con respeto. El chisme virtual no va conmigo."',
    explanation: 'Quita el combustible al circo en redes sociales. Sin audiencia pública, el provocador pierde el 90% de su interés.'
  },
  {
    id: '5',
    category: 'reto-pelea',
    provocation: '¡Te me paras duro o te reviento aquí mismo!',
    response: '"No voy a pelear contigo. Si me agredes físicamente estarás cometiendo un delito frente a testigos y cámaras. Tú decides si quieres arruinarte el año."',
    explanation: 'Pone un límite legal y objetivo inmediato: le recuerda que la agresión no queda impune y hay testigos.'
  }
];
