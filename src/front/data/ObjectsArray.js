import llave from "../assets/img/llave.png"
import balleta  from "../assets/img/level2_provisional/balleta.png"
import lupa from "../assets/img/level2_provisional/lupa.png"
    // id : 'llave',
    // name : 'llave maestra:',
    // img : 'foto png con fondo trnasparente ( será la forma del boton)',
    // className :'identificador para aplicar clases css, como la posicion',
    // useIn : 'palabra clave del lugar (boton) donde debe clickar para usar la llave'

export const ObjectsLevel1 = [{

    id : 101,
    name : 'llave maestra',
    img : llave,
    className :'objectPosition',
    useIn : 'puerta',
    message : '¡Has conseguido la llave maestra! ¿Qué abrirá en tu aventura?'
}]

export const ObjectsLevel2 = [
 {

    id : 102,
    name : 'gamuza',
    img : balleta,
    className :'',
    useIn : 'telescopio',
    message : 'Buscale una utilidad a la gamuza, ¡quizás te sorprenda!'

},
 {

    id : 103,
    name : 'lupa',
    img : lupa,
    className :'',
    useIn : 'libro',
    message : 'quizás puedas ver algo mejor con la lupa, ¡inténtalo!'
}, 

]