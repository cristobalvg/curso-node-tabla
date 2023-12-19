import fs from 'fs';
import colors from 'colors';//<= En este caso vamos a manejarlo como una función

const crearArchivo = async ( base = 5, listar = false, hasta = 10 ) => { //Le ponemos un valor por defecto para asegurarnos que siempre tenga un valor, pero gracias a yargs, no vamos a poder ejecutar los argumentos que le pasamos, si no tenemos el arguemento especificado.

    try {

        // let salida = ''
        // let consola = '';

        let salida = '', consola = '';
        // let salida, consola = ''; //<= En JS podemos inicializar varias variables de la misma manera con la misma instrucción. Pero el problema que en este caso al hacerlo así, 1 primero número en el archivo txt nos marca undefined y en los demás todo bien. Explicación al problema del undefined = Generalmente las declaraciones en la misma linea no tienen un valor asignado, quizás ese puede ser el problema. Si necesitas asignar un valor al inicio, lo puedes hacer en una linea por separado. Saludos. Este error se debe a que la variable salida no esta inicializada, por lo cual tiene un valor undefined, posteriormente este valor se concatena con los valores de la tabla de multiplicar en el ciclo for, en esta linea de código salida  += `${base} X ${i} = ${base * i}\n` por lo cual muestra ese valor en el txt.

        // Para inicializar la variable en una sola linea simplemente se le asigna el valor de la siguiente forma: let salida = '', consola = ''; de esta forma se indica que ambas variables son de tipo let en una sola linea y se inicializan para que no nos de el undefined

        for (let i = 1; i <= hasta; i++) {
            salida  += `${base} x ${i} = ${base * i}\n`; //<= \n = para que de un salto de línea.
            consola += `${base} ${ 'x'.green } ${i} ${ '='.green } ${base * i}\n`;
        }

        if( listar ){
            console.log('==============='.green);
            console.log('  Tabla del:'.red, colors.blue( base ) );//<= log(¿mensaje?: cualquiera, ...opcionalParams: cualquiera[]): nulo
    
            // Imprime en la salida estándar con una nueva línea. Se pueden pasar varios argumentos, utilizándose el primero como mensaje principal y todos los adicionales como valores de sustitución similares a printf(3) (todos los argumentos se pasan a util.format()).
            console.log('==============='.green);
            console.log(consola);
        }

        // Una forma mucho más sencilla de acceder al File system, que con el writeFile, es con el writeFileSync. Pero la única diferencia es que con el writeFileSync, si sucede un error, tendríamos que atrapar el error, mediante un try y un catch:

        fs.writeFileSync(`./salida/tabla-${base}.txt`, salida);

        return (`tabla-${base}.txt`);//<= Este return está devolviendo el nombre del archivo que se creó (tabla-${base}.txt). Cuando utilizas una función async, cualquier valor que devuelvas con return dentro de la función se envolverá automáticamente en una promesa resuelta.

        // Por lo tanto, cuando haces la llamada a crearArchivo(base) en tu archivo app.js:

        // El .then(nombreArchivo => console.log(nombreArchivo, 'creado')) está manejando la promesa resuelta. En este caso, nombreArchivo contendrá el valor devuelto por el return en crearArchivo, que es el nombre del archivo creado (tabla-${base}.txt).

        // Si anteriormente no tenías el return y veías undefined, es posible que la función no devolviera un valor explícito, lo que implicaría que la promesa generada por la función también se resolvería con undefined. Ahora, con el return, estás devolviendo un valor específico y resolviendo la promesa con ese valor.

        // Entendido, parece que antes tenías un console.log en lugar del return dentro del bloque try en la función crearArchivo. Cuando haces un console.log dentro de una función, eso no afecta el valor de retorno de la función. El valor de retorno de la función se determina por lo que se especifica con return.

        // Si no hay un return o si el return no tiene un valor, JavaScript asume que la función devuelve undefined. Entonces, si antes tenías un console.log y ahora has cambiado eso por un return, el comportamiento cambia. Antes, el resultado de la función sería undefined, y ahora es el nombre del archivo (tabla-${base}.txt).

        // En resumen, el return en la función crearArchivo ahora proporciona un valor específico (el nombre del archivo creado), y eso es lo que se maneja en la cadena de promesas cuando llamas a crearArchivo(base).then(...).

        // El return equivale a un resolve. 
        // ChatGPT
        // Sí, en una función async, el return se comporta de manera similar a un resolve en una promesa. Cuando una función async devuelve un valor, ese valor se envuelve automáticamente en una promesa resuelta.
        // Entonces, mientras que en las promesas se usa resolve para completar la promesa con un valor, en las funciones async simplemente usas return para devolver un valor que será resuelto por la promesa que la función async devuelve.
    } catch (err) {
        throw err;//<= La palabra reservada throw lanza una excepción definida por el usuario, en este caso, un Objeto error que se recibe en el catch. Además podemos utilizar return new Error o throw new Error, con throw especificamos que deseamos lanzar una excepción específicamente. Son opciones equivalentes.
    }

}

//Si queremos exportar un archivo, tenemos que hacerlo con module(es un objeto global que existe en node) .exports = a lo que nosotros queremos exportar.
export { crearArchivo }