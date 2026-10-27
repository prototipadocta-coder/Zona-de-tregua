import { ChatMessage } from '../types';

export const QUICK_PROMPTS = [
  {
    id: 'rabia',
    icon: 'Flame',
    label: 'Tengo un problema con alguien y tengo rabia',
    prompt: 'Tengo mucha rabia con un compañero del colegio y siento que si lo veo me voy a ir a los golpes. Ayúdame a calmarme.'
  },
  {
    id: 'amenaza',
    icon: 'AlertTriangle',
    label: 'Me están amenazando o citando para una pelea a la salida',
    prompt: 'Me dijeron que a la salida me están esperando en la esquina para pegarme. Tengo miedo y no sé qué hacer.'
  },
  {
    id: 'amigo',
    icon: 'Users',
    label: 'Un amigo se va a pelear y quiero ayudar',
    prompt: 'Dos compañeros o un amigo mío se van a agarrar a la salida y otros los están incitando. ¿Cómo puedo intervenir sin que me peguen a mí?'
  },
  {
    id: 'libre',
    icon: 'MessageSquare',
    label: 'Escribir libremente lo que siento',
    prompt: 'Necesito desahogarme de una situación injusta que me pasó hoy en el colegio sin que me juzguen.'
  }
];

export const INITIAL_BOT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-welcome',
    sender: 'bot',
    text: 'Hola. Soy **TreguaBot**, tu espacio seguro, neutral y 100% confidencial. No soy un profesor castigador ni voy a juzgarte por sentir rabia o frustración. La rabia es normal, pero lo que hacemos con ella define nuestro futuro.\n\n¿Qué está pasando hoy por tu mente?',
    timestamp: 'Ahora',
    quickActions: [
      { label: '🔥 Siento mucha rabia acumulada', actionPayload: 'Tengo un problema con alguien y tengo mucha rabia' },
      { label: '⚠️ Me citaron a pelear a la salida', actionPayload: 'Me están amenazando o citando a una pelea a la salida' },
      { label: '🤝 Quiero salvar a un amigo de una riña', actionPayload: 'Un amigo se va a pelear y quiero ayudarlo a no arruinarse' },
      { label: '💨 Necesito calmar mi cuerpo ya', actionPayload: 'Enséñame a calmar la adrenalina de mi cuerpo' }
    ]
  }
];

export function getBotResponseForQuery(query: string): { text: string; helpfulTool?: 'breathing' | 'responses' | 'emergency' | 'report' } {
  const lower = query.toLowerCase();

  // Caso 1: Amenaza o cita a pelear a la salida
  if (lower.includes('cita') || lower.includes('amenaz') || lower.includes('esperando') || lower.includes('salida') || lower.includes('pelear a la salida')) {
    return {
      text: `### 🚨 Tu seguridad es la prioridad número uno.
Primero que todo: **no estás solo y no tienes por qué asistir a esa trampa**. Quien te cita a una esquina con gente armada o grabando solo busca usarte de trofeo.

**Plan de Acción Inmediato para la Salida:**
1. **Rompe la rutina:** No salgas por la puerta habitual ni a la hora pico en la que están esperando.
2. **Sal acompañado de un adulto o en grupo seguro:** Sal con un familiar, o acércate a la puerta cuando salga la masa de docentes o personal directivo.
3. **Pide custodia preventiva:** Decirle a un orientador o coordinador: *"Hay personas esperándome afuera en tono violento, necesito salir acompañado"* **NO es ser sapo**, es proteger tu vida y tu integridad.
4. **Si te interceptan:** Mantén distancia (al menos 2 metros), las manos visibles y repite con voz alta y firme: *"No tengo nada que hablar aquí en la calle. No me interesa pelear"*. Busca de inmediato un local comercial o una zona concurrida.

💡 Recuerda: Ningún 'respeto de esquina' te va a pagar las cuentas del hospital ni te va a devolver la tranquilidad.`,
      helpfulTool: 'emergency'
    };
  }

  // Caso 2: Rabia intensa, ganas de golpear
  if (lower.includes('rabia') || lower.includes('furia') || lower.includes('odio') || lower.includes('ganas de golpear') || lower.includes('pegarle') || lower.includes('matar') || lower.includes('partirle')) {
    return {
      text: `### 🛑 Detente 30 segundos. Escucha esto:
Sentir rabia es una respuesta biológica normal cuando sentimos que nos faltan al respeto o nos engañan. **Tus emociones son válidas**, pero lo que estás a punto de hacer con tus manos puede cambiar los próximos 5 años de tu vida.

**Lo que la adrenalina te está ocultando en este momento:**
- En una riña callejera, un mal golpe contra un andén o una esquina puede causar un traumatismo craneoencefálico irreparable.
- La ley de responsabilidad penal para menores sanciona las lesiones personales y las riñas con internamiento en centros juveniles.
- ¿De verdad la persona con la que tienes rabia merece que arriesgues tu libertad, tu bachillerato y a tu mamá llorando en una sala de audiencias?

**Haz la prueba de los 60 segundos:**
Toma 3 respiraciones profundas conmigo en la herramienta de respiración 4-7-8 antes de responderle cualquier palabra o mensaje.`,
      helpfulTool: 'breathing'
    };
  }

  // Caso 3: Amigo en peligro de pelea
  if (lower.includes('amigo') || lower.includes('compañero') || lower.includes('tercero') || lower.includes('salvar') || lower.includes('intervenir')) {
    return {
      text: `### 🛡️ Eres el tipo de amigo que de verdad salva vidas.
Cuando dos personas están calientes, el 90% del combustible es el público morboso que los rodea gritando con celulares.

**Cómo puedes desactivar la situación como buen parcero:**
1. **Saca a tu amigo del círculo con un pretexto urgente:** *"Vámonos ya que ahí viene la patrulla / coordinación"* o *"Vente conmigo que te está buscando tu mamá al teléfono"*. Darle una salida honorable le permite irse sin sentir que 'quedó mal'.
2. **No te sumes al círculo:** Si te quedas mirando y grabando, estás alimentando la riña.
3. **Pide apoyo discreto:** Si ves armas cortopunzantes o grupos externos, avisa inmediatamente a vigilancia escolar o llama a la línea 123.
4. **Háblale a solas:** Cuando se enfríe, dile: *"Parce, te quiero entero y libre, no te voy a dejar arruinarte por una provocación barata"*.`,
      helpfulTool: 'report'
    };
  }

  // Caso 4: Respuestas asertivas / cómo responder a provocaciones
  if (lower.includes('decir') || lower.includes('responder') || lower.includes('provoca') || lower.includes('burl') || lower.includes('miedo') || lower.includes('cobarde')) {
    return {
      text: `### 🗣️ Desarmar con palabras firmes sin rebajarse
Cuando te provocan delante de todos, el agresor espera dos cosas: o que tiembles de miedo o que te lances furioso. Si haces cualquiera de las dos, él gana.

**Frases de poder que neutralizan la provocación:**
- *"No voy a pelear contigo. Si tienes algo real que decirme, dímelo como gente civilizada."*
- *"Tener futuro y metas no es cobardía. Yo a la salida me voy para mi casa."*
- *"Mírense a ustedes mismos: solo quieren ver un circo en TikTok mientras nosotros nos jodemos. No me presto para eso."*

Revisa nuestro catálogo de respuestas asertivas probadas por mediadores juveniles.`,
      helpfulTool: 'responses'
    };
  }

  // Default empathetic coaching response
  return {
    text: `Te escucho con total atención. En el ambiente escolar y en el barrio hay muchas presiones: el chisme, la necesidad de no dejarse humillar, la mirada de los demás... todo eso pesa mucho.

Lo más valioso que tienes en este momento es tu capacidad de **hacer una pausa**. Un minuto de orgullo herido se pasa mañana; una cicatriz, una suspensión escolar o una demanda judicial no se borran.

¿Quieres que hagamos un ejercicio de respiración para bajar las pulsaciones, o prefieres que revisemos qué decirle a esa persona con firmeza y sin violencia?`,
    helpfulTool: 'breathing'
  };
}
