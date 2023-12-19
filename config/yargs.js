import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
    // Comentario adicional, puedes incluir todos los elementos optionales en un solo option, como un objeto de js
    .option('b', {
        alias: 'base',
        type: 'number',
        demandOption: true, //<=La verdad es que si nosotros queremos crear esta tabla de multiplicar, siempre nos va a tener que mandar un valor.
        describe: 'Es la base de la tabla de multiplicar',

        //<=Este método se puede utilizar para informar a los yargs sobre las opciones que podrían existir. También puede pasar un objeto opt que pueda permitir una mayor personalización, como .alias(), .demandOption(), etc. para esa opción.

    })
    .option('l', {
        alias: 'listar',
        type: 'boolean',
        // demandOption: true,
        default: false, //<= ¿Si ponemos solo demanOption en true, se tiene que poner el argumento para que funcione, pero cuando ponemos la option de listar, también pone demanOption en true, pero aquí no es necesario que se ponga el argumento cuando corremos el programa, ¿Por qué se da esto? La idea es que podamos obligar a los comandos a que luzcan de cierta manera. En el caso de listar, a diferencia de base, no sucede igual porque colocamos un valor por defecto para listar (default: false)
        describe: 'Muestra la tabla en consola'
    })
    .option('h', {
        alias: 'hasta',
        type: 'number',
        default: 10,
        describe: 'La tabla multiplica hasta el número asignado'
    })
    .check((argv, options) => {
        if (isNaN(argv.b)) {
            throw 'La base tiene que ser un número'
        }
        return true; //<= Tenemos que regresar un true, si no hay ningún error, después de todas las verificaciones. La función check se utiliza para realizar verificaciones personalizadas en los argumentos, después de que se han analizado. Si no hay errores, debes devolver true para indicar que el análisis y las verificaciones fueron exitosas.

        // El return por sí solo no es suficiente, porque Yargs espera un valor booleano específico (true o false) para determinar si todo está en orden o si hay un problema. Si devolvieras solo return, estarías devolviendo undefined, lo cual no cumple con la expectativa de Yargs.

        // En la documentación oficial de Yargs, se menciona que la función check debe arrojar una excepción (con un mensaje) o devolver un valor que se evalúe como verdadero en caso de que haya un problema. La idea es que si la función de verificación devuelve un valor truthy, Yargs interpreta que todo está bien; si arroja una excepción o devuelve un valor falsy, asume que hubo un problema y muestra el mensaje de error.

        // Entonces, para resumir, return true se utiliza para indicar que el análisis y las verificaciones fueron exitosos y que no se han encontrado errores.

        //<= Se llama con dos argumentos, el hash argv analizado y una serie de opciones y sus alias. Si func arroja o devuelve un valor no verdadero, muestra el error arrojado, la información de uso y sale. Compruebe que se cumplan determinadas condiciones en los argumentos proporcionados y podemos establecer cierta lógica al mismo.
    })
    .argv;

export { argv }//<= Todo en JS es un objeto, si NO es un tipo de dato primitivo, ES UN OBJETO