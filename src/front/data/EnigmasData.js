import carta from '../assets/img/carta.jpg';

export const EnigmasData = {
    "enigmasNivel1": [
        {
        id: 1,
        title: "Has encontrado el planning diario del señor Geeks...",
        description: "El planning diario del Señor Geeks te dará pistas sobre su rutina y horarios.",
        img: carta,
        hints: [
      
            "El Señor Geeks es muy estricto con los horarios, y no tolera retrasos. Tampoco le gusta saltarse los descansos. Cada minuto cuenta.",
            "Para encontrar la hora de la comida, primero calcula cuándo termina la Llamada con Proveedores. Recuerda sumar los 30 minutos de descanso antes de esa reunión.",
        ],
           
       
        },
        {
        id: 2,
        title: "¡Ya sabes de dónde viene el código!",
        img: 'panelabierto',
        solution: "1545",
        description : 'Probemos sabiamente...por cada error tendremos 5 segundos de penalización....',
        hints: [
            "quizás necesites una hora en concreto para resolverlo.",
            "Piensa en cómo se representaría numéricamente en un reloj de 24 horas.",
            
        ],
        
        }
     
    ],
     "enigmasNivel2": [/* enigmas del nivel 2 */],

    };