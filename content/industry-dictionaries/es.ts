import type { IndustryDictionary } from "@/content/industry-types";

export const es: IndustryDictionary = {
  healthcare: {
    title: "Salud y Medicina",
    subtitle: "Clínicas, dentistas, med spas, terapeutas",
    description:
      "mandhy responde preguntas de pacientes, agenda citas y envía recordatorios, para que ninguna llamada se quede sin contestar.",
    slug: "salud",
    intro:
      "Los pacientes llaman cuando ya están preocupados: una llamada perdida o una respuesta lenta puede mandarlos a la siguiente clínica de la lista. mandhy responde de inmediato, agenda citas y da seguimiento, para que tu recepción no sea el cuello de botella.",
    sampleConversation: [
      { from: "user", text: "Hola, ¿tienen espacio esta semana para una limpieza dental?" },
      { from: "ai", text: "¡Sí! Tengo el martes a las 2pm o el jueves a las 10am. ¿Cuál te queda mejor?" },
      { from: "user", text: "El jueves a las 10 está perfecto." },
      { from: "ai", text: "Quedaste agendado para el jueves a las 10am. Te enviaré un recordatorio un día antes." },
    ],
    painPoints: [
      "Las llamadas fuera de horario o durante consultas se van directo al buzón de voz.",
      "Los pacientes que no reciben respuesta el mismo día suelen llamar a la siguiente clínica.",
      "Las inasistencias afectan una agenda que está llena con semanas de anticipación.",
      "El personal de recepción pasa horas a la semana solo confirmando y reagendando citas.",
    ],
    adaptation: {
      headline: "Diseñado alrededor de cómo funciona realmente una clínica",
      body: "mandhy responde preguntas de pacientes usando la información real de tu consultorio, revisa tu agenda en tiempo real y envía recordatorios y confirmaciones automáticamente, para que tu equipo se enfoque en los pacientes que tiene enfrente, no en el teléfono.",
    },
    faq: [
      {
        question: "¿mandhy puede resolver dudas de seguros o temas clínicos?",
        answer:
          "mandhy responde preguntas generales sobre tu consultorio (horarios, servicios, tipos de cita) y escala a tu equipo cualquier tema clínico o de seguros.",
      },
      {
        question: "¿Va a reemplazar a mi recepción?",
        answer:
          "No. mandhy se encarga de la agenda y las preguntas repetitivas, para que tu recepción se enfoque en los pacientes en el consultorio, no en el teléfono.",
      },
      {
        question: "¿Puede reducir las inasistencias?",
        answer:
          "mandhy envía recordatorios y confirmaciones automáticas antes de cada cita, que es la principal herramienta que usan los consultorios para reducir inasistencias.",
      },
      {
        question: "¿Funciona con mi sistema de agenda actual?",
        answer: "mandhy se construye alrededor de tu operación actual siempre que sea posible. Contáctanos para evaluar tu caso.",
      },
    ],
    finalCta: {
      headline: "Deja de perder pacientes por una llamada perdida.",
      cta: { label: "Solicitar auditoría para tu consultorio", href: "/contact" },
    },
  },
  homeServices: {
    title: "Servicios del Hogar y Oficios",
    subtitle: "Plomeros, electricistas, climatización, contratistas",
    description:
      "Cada llamada y mensaje recibe respuesta rápida y una visita agendada, incluso cuando tu equipo está en obra.",
    slug: "servicios-del-hogar",
    intro:
      "Una llamada perdida para un plomero o electricista es un trabajo que se va con la competencia. mandhy responde de inmediato, atiende solicitudes urgentes y agenda la visita, incluso cuando tu equipo está en obra.",
    sampleConversation: [
      { from: "user", text: "Se me está saliendo agua del calentador, ¿pueden venir hoy?" },
      { from: "ai", text: "Lamento escuchar eso. Tengo un espacio hoy a las 3pm, ¿lo agendamos?" },
      { from: "user", text: "Sí, por favor." },
      { from: "ai", text: "Quedaste agendado para hoy a las 3pm. Te enviaré la confirmación de dirección y un recordatorio." },
    ],
    painPoints: [
      "Las llamadas durante un trabajo se quedan sin respuesta y el cliente busca el siguiente resultado en Google.",
      "Las solicitudes urgentes necesitan una respuesta rápida, no una llamada de vuelta mañana.",
      "Las cotizaciones hechas a mano toman horas que tu equipo no tiene entre trabajos.",
      "Las llamadas de fin de semana y fuera de horario son las más urgentes, y las más fáciles de perder.",
    ],
    adaptation: {
      headline: "Diseñado para un equipo que siempre está en movimiento",
      body: "mandhy responde cada llamada y mensaje, revisa disponibilidad en tiempo real y agenda la visita, para que ningún lead se enfríe mientras tu equipo está en obra. Las solicitudes urgentes se marcan y pueden escalar directo a tu equipo.",
    },
    faq: [
      {
        question: "¿mandhy puede atender llamadas de emergencia?",
        answer:
          "mandhy puede marcar solicitudes urgentes para escalarlas de inmediato a tu equipo, mientras atiende por su cuenta las citas y cotizaciones de rutina.",
      },
      {
        question: "¿Puede enviar cotizaciones al instante?",
        answer:
          "Sí, para trabajos estandarizados mandhy puede compartir rangos de precio y siguientes pasos de inmediato; lo que requiere revisión en sitio se agenda directamente.",
      },
      {
        question: "¿Funciona fuera de horario?",
        answer: "Sí, mandhy trabaja 24/7, incluyendo noches y fines de semana, cuando las emergencias de oficios son más probables.",
      },
      {
        question: "¿Necesito reemplazar mis herramientas actuales?",
        answer: "No necesariamente: mandhy se construye alrededor de tu operación actual siempre que sea posible.",
      },
    ],
    finalCta: {
      headline: "No pierdas otro trabajo por una llamada perdida.",
      cta: { label: "Solicitar auditoría para tu negocio", href: "/contact" },
    },
  },
  professionalServices: {
    title: "Servicios Profesionales",
    subtitle: "Despachos legales, contadores, consultores, agencias",
    description:
      "mandhy califica leads y agenda consultas, para que tu equipo enfoque su tiempo en las conversaciones que importan.",
    slug: "servicios-profesionales",
    intro:
      "Los clientes potenciales deciden con quién trabajar según quién responde primero. mandhy filtra solicitudes, agenda consultas y resuelve preguntas de admisión, para que tu equipo enfoque su tiempo solo en las conversaciones que importan.",
    sampleConversation: [
      { from: "user", text: "Necesito ayuda con la revisión de un contrato, ¿toman clientes nuevos?" },
      { from: "ai", text: "¡Sí! Puedo agendar una consulta gratuita de 20 minutos para ver si somos la opción correcta. ¿Te queda bien este miércoles a las 11am?" },
      { from: "user", text: "El miércoles funciona." },
      { from: "ai", text: "Quedaste confirmado para el miércoles a las 11am. Te enviaré un formulario breve antes de la cita." },
    ],
    painPoints: [
      "Las solicitudes sin calificar ocupan tiempo que debería ir a prospectos reales.",
      "Una respuesta lenta a un cliente nuevo suele significar que ya llamó a alguien más.",
      "Las preguntas de admisión se repiten llamada tras llamada.",
      "Las consultas se pierden cuando el agendado depende de correos de ida y vuelta.",
    ],
    adaptation: {
      headline: "Diseñado para proteger el tiempo de tu equipo",
      body: "mandhy responde preguntas comunes, recopila la información básica que necesitas desde el inicio y agenda consultas directamente en tu calendario, para que tu equipo intervenga solo en conversaciones ya calificadas.",
    },
    faq: [
      {
        question: "¿mandhy puede calificar leads antes de que lleguen a mi equipo?",
        answer: "Sí, mandhy hace las preguntas que normalmente harías al inicio y puede dirigir a tu equipo solo las solicitudes calificadas.",
      },
      {
        question: "¿Puede agendar consultas automáticamente?",
        answer: "Sí, mandhy revisa disponibilidad en tiempo real y agenda directo en tu calendario.",
      },
      {
        question: "¿La información confidencial está segura?",
        answer:
          "mandhy se entrena con la información que tú proporcionas y escala a tu equipo cualquier tema sensible en lugar de manejarlo por su cuenta.",
      },
      {
        question: "¿Puede reemplazar mi proceso de admisión?",
        answer: "Se encarga del primer paso repetitivo (preguntas generales y agendado), mientras que todo lo específico del caso va a tu equipo.",
      },
    ],
    finalCta: {
      headline: "Dedica tu tiempo a los clientes, no a la agenda.",
      cta: { label: "Solicitar auditoría para tu despacho", href: "/contact" },
    },
  },
  realEstate: {
    title: "Bienes Raíces",
    subtitle: "Agentes, inmobiliarias, administradores de propiedades",
    description:
      "Las solicitudes de compradores e inquilinos reciben respuesta instantánea y una cita agendada, de día o de noche.",
    slug: "bienes-raices",
    intro:
      "Compradores e inquilinos avanzan rápido si nadie responde. mandhy contesta solicitudes al instante, revisa disponibilidad y agenda visitas, para que nunca pierdas un lead solo porque ya estabas con un cliente.",
    sampleConversation: [
      { from: "user", text: "¿Sigue disponible la casa de 3 recámaras en la calle Maple?" },
      { from: "ai", text: "¡Sí, sigue disponible! ¿Te gustaría agendar una visita? Tengo el sábado a las 11am o a las 2pm." },
      { from: "user", text: "A las 11am está bien." },
      { from: "ai", text: "Quedaste agendado para el sábado a las 11am. Te enviaré la dirección y un recordatorio un día antes." },
    ],
    painPoints: [
      "Un comprador que no recibe respuesta en minutos llama al siguiente anuncio.",
      "Las visitas agendadas por teléfono pierden momentum rápido.",
      "Los agentes no pueden responder solicitudes mientras ya están mostrando una propiedad.",
      "Las preguntas de compradores e inquilinos se repiten en cada anuncio.",
    ],
    adaptation: {
      headline: "Diseñado para nunca perder un lead",
      body: "mandhy responde solicitudes en el momento en que llegan, revisa tu calendario en tiempo real y agenda visitas directamente, para que un lead nunca se enfríe solo porque ya estabas con un cliente.",
    },
    faq: [
      {
        question: "¿mandhy puede manejar varios anuncios a la vez?",
        answer: "Sí, mandhy puede responder solicitudes y agendar visitas en todos tus anuncios activos.",
      },
      {
        question: "¿Puede calificar compradores o inquilinos?",
        answer: "mandhy puede hacer preguntas básicas de calificación antes de agendar una visita, para que tu tiempo se enfoque en solicitudes serias.",
      },
      {
        question: "¿Funciona con mi CRM?",
        answer: "mandhy se construye alrededor de tu operación actual siempre que sea posible. Contáctanos para evaluar tu caso.",
      },
      {
        question: "¿Puede ayudar con el seguimiento después de una visita?",
        answer: "Sí, mandhy puede dar seguimiento automáticamente para que compradores e inquilinos interesados no se pierdan.",
      },
    ],
    finalCta: {
      headline: "No pierdas otra solicitud de visita.",
      cta: { label: "Solicitar auditoría para tus propiedades", href: "/contact" },
    },
  },
  rentals: {
    title: "Renta y Alquiler",
    subtitle: "Renta de equipo, eventos, vehículos",
    description:
      "mandhy verifica disponibilidad, cotiza y confirma reservas automáticamente, incluso fuera de horario.",
    slug: "renta-y-alquiler",
    intro:
      "Las preguntas de disponibilidad llegan a cualquier hora, y una respuesta lenta significa una reserva perdida. mandhy verifica disponibilidad, cotiza y confirma reservas automáticamente, incluso fuera de horario.",
    sampleConversation: [
      { from: "user", text: "¿Tienen disponible una carpa para 4 personas este fin de semana?" },
      { from: "ai", text: "Sí, está disponible de sábado a domingo. ¿Te la reservo?" },
      { from: "user", text: "Sí, por favor." },
      { from: "ai", text: "Listo, quedó reservada para el fin de semana. Te enviaré la confirmación y los detalles de entrega ahora mismo." },
    ],
    painPoints: [
      "Las preguntas de disponibilidad de un viernes a las 9pm se quedan sin respuesta hasta el lunes.",
      "Revisar inventario manualmente para cada solicitud consume tiempo del equipo.",
      "Una cotización lenta significa que el cliente reserva en otro lado.",
      "Las confirmaciones y detalles de entrega hechos a mano son fáciles de olvidar.",
    ],
    adaptation: {
      headline: "Diseñado para reservar mientras estás cerrado",
      body: "mandhy revisa disponibilidad en tiempo real, comparte precios y confirma la reserva automáticamente, incluso a las 11pm de un sábado, cuando realmente llegan la mayoría de las solicitudes de renta.",
    },
    faq: [
      {
        question: "¿mandhy puede revisar el inventario real disponible?",
        answer: "Sí, mandhy está conectado a tu calendario y disponibilidad, así que solo confirma reservas que realmente están libres.",
      },
      {
        question: "¿Puede cobrar depósitos o pagos?",
        answer: "mandhy puede guiar al cliente por tu proceso de reserva y pago; contáctanos para evaluar tu caso específico.",
      },
      {
        question: "¿Funciona para solicitudes del mismo día?",
        answer: "Sí, mandhy responde al instante, lo cual es especialmente útil para solicitudes de renta de último momento.",
      },
      {
        question: "¿Puede enviar detalles de entrega o recolección?",
        answer: "Sí, mandhy puede enviar confirmaciones y recordatorios automáticamente una vez hecha la reserva.",
      },
    ],
    finalCta: {
      headline: "Convierte las consultas fuera de horario en reservas confirmadas.",
      cta: { label: "Solicitar auditoría para tu negocio de renta", href: "/contact" },
    },
  },
  beautyWellness: {
    title: "Belleza y Bienestar",
    subtitle: "Salones, spas, gimnasios, estudios de bienestar",
    description:
      "Los clientes agendan, reprograman y reciben recordatorios solos, para que tu recepción no esté atada al teléfono.",
    slug: "belleza-y-bienestar",
    intro:
      "Una agenda llena depende de cubrir cada espacio, y los clientes esperan poder reservar sin llamar. mandhy agenda, reprograma y envía recordatorios por su cuenta, para que tu recepción no esté atada al teléfono todo el día.",
    sampleConversation: [
      { from: "user", text: "¿Puedo reservar un corte de cabello para mañana en la tarde?" },
      { from: "ai", text: "¡Claro! Tengo espacio mañana a la 1pm o a las 4:30pm. ¿Cuál prefieres?" },
      { from: "user", text: "A las 4:30, por favor." },
      { from: "ai", text: "Quedaste agendado para mañana a las 4:30pm. Te enviaré un recordatorio unas horas antes." },
    ],
    painPoints: [
      "Los clientes esperan poder reservar en cualquier momento, no solo en horario de atención.",
      "Las cancelaciones de último momento dejan espacios sin cubrir.",
      "El personal de recepción pasa más tiempo al teléfono que con los clientes en el sillón.",
      "Las inasistencias son costosas cuando cada espacio de cita es limitado.",
    ],
    adaptation: {
      headline: "Diseñado para mantener tu agenda llena",
      body: "mandhy agenda, reprograma y envía recordatorios automáticamente, y puede avisar cuando se libera un espacio, para que tu recepción se enfoque en los clientes que ya están en el lugar.",
    },
    faq: [
      {
        question: "¿mandhy puede llenar cancelaciones de último momento?",
        answer: "Sí, mandhy puede avisar a los clientes cuando se libera un espacio, ayudando a llenar los huecos que dejan las cancelaciones tardías.",
      },
      {
        question: "¿Puede manejar la reprogramación automáticamente?",
        answer: "Sí, mandhy puede invitar a los clientes a reagendar después de su cita para que tu agenda se mantenga llena.",
      },
      {
        question: "¿Funciona también para negocios sin cita previa?",
        answer: "mandhy se construye alrededor de tu operación actual siempre que sea posible. Contáctanos para evaluar tu caso.",
      },
      {
        question: "¿Puede ayudar a vender productos o servicios adicionales?",
        answer: "mandhy puede compartir información sobre servicios y productos entre citas; contáctanos para evaluar qué se ajusta a tu negocio.",
      },
    ],
    finalCta: {
      headline: "Mantén cada silla y cada espacio ocupado.",
      cta: { label: "Solicitar auditoría para tu negocio", href: "/contact" },
    },
  },
};
