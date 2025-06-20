import carta from '../assets/img/carta.jpg';

export const EnigmasData = {
    "enigmasNivel1": [
        {
        id: 1,
        title: "Has encontrado el planning diario del señor Geeks...",
        img: carta,
        hints: [
      
            "El Señor Geeks es muy estricto con los horarios, y no tolera retrasos. Tampoco le gusta saltarse los descansos. Cada minuto cuenta.",
            "Para encontrar la hora de la comida, primero calcula cuándo termina la Llamada con Proveedores. Recuerda sumar los 30 minutos de descanso antes de esa reunión.",
        ],
           
       
        },
        {
        id: 2,
        title: "desde aquí podrás manipular el reloj del despacho del señor Geeks",
        img: 'panelebierto',
        solution: "1545",
        hints: [
            "quizás necesites una hora en concreto para resolverlo.",
            "Piensa en cómo se representaría numéricamente en un reloj de 24 horas.",
            
        ],
        
        }
     
    ],
     "enigmasNivel2": [/* enigmas del nivel 2 */],

    };