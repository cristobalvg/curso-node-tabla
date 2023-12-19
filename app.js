// 5 x 1 = 5
// 5 x 2 = 10
// ...
// 5 x 10 = 50

// Solución mía:
// let n = 5;

// for (let i = 1; i <= 10; i++) {
    
//     const multiplicar = n * i;
//     console.log(multiplicar);
// }

// Node.js no permite acceder al File system, a diferencia del navegador que no nos permite acceder a el. Además entiendase el file system como carpetas, directorios, nuevos archivos y todo lo que se encuentre en el servidor.

// Solución del profe Fernando:

import { crearArchivo } from './helpers/multiplicar.js';//<= Esto va a regresarme el objeto creado con module.exports, creado en el archivo multiplicar.mjs y como resivo un objeto puedo hacer destructuring de esta manera.
// Primera forma = import pkg from 'colors'; y const { colors } = pkg;
// Segunda forma: 
import 'colors'; // <= Si solo dejar la línea import colors from 'colors'; o import 'colors'; funciona sin errores, entonces no es necesario utilizar la forma con pkg y desestructuración. La razón por la que proporcioné esa variante es porque a veces algunos módulos CommonJS pueden no ser completamente compatibles con la sintaxis de importación de ECMAScript Modules (ESM).

// En tu caso, si import colors from 'colors'; funciona sin problemas y no arroja errores, puedes seguir utilizando esa forma. La sugerencia de usar pkg y desestructuración es una alternativa que puede ser necesaria en situaciones donde un módulo no sigue completamente las convenciones ESM.
import { argv } from './config/yargs.js';


// console.log( process.argv );//argv que se encuentra en los procesos propios de Node.


console.clear();
// console.log( argv );

// console.log('base: yargs', argv.b );//<= la base siempre la vamos a tener aquí(argv.base o argv.b)

crearArchivo( argv.b, argv.listar, argv.h )
    .then( nombreArchivo => console.log(nombreArchivo.rainbow, 'creado'))
    .catch( err => console.log(err));


// ChatGPT: Sí, exacto. En este caso, hideBin es una función que proporciona Yargs para ocultar los dos primeros elementos de process.argv.

// En JavaScript, destructurar objetos y arreglos es una característica muy útil. En este caso, hideBin es parte del objeto exportado por 'yargs/helpers', y estás importando específicamente esa función usando la sintaxis de destructuración de ES6.

// Entonces, cuando haces: import { hideBin } from 'yargs/helpers';
// Estás importando la función hideBin del módulo 'yargs/helpers'. Luego, puedes usar esta función para eliminar los dos primeros elementos de process.argv y obtener solo los argumentos que son relevantes para Yargs. Es parte de la preparación que necesitas hacer para que Yargs analice los argumentos correctamente.

// ChatGPT: Claro, voy a explicar cada parte por separado:

// ¿Qué es argv?
// argv es una convención que significa "argument vector". En el contexto de yargs, argv se refiere a los argumentos que se pasan a través de la línea de comandos. Es una forma de acceder a los parámetros que se pasan al script al ejecutarlo.

// ¿Qué es hideBin y de dónde proviene?
// hideBin es una función proporcionada por el paquete yargs/helpers. Su función es ocultar los dos primeros elementos de process.argv, que son el ejecutable de Node y la ruta al script que se está ejecutando. Al ocultar estos elementos, hideBin facilita el trabajo con los argumentos restantes y es particularmente útil al utilizar ECMAScript Modules.

// ¿Por qué se usa process.argv)).argv en ECMAScript Modules?
// Cuando se utiliza ECMAScript Modules, yargs devuelve un objeto con información sobre los argumentos, pero para acceder a este objeto, se necesita encadenar .argv. Esto es específico de cómo funciona yargs con ECMAScript Modules. En CommonJS, la versión sin encadenar .argv puede ser suficiente.

// ¿Por qué no es necesario .argv con require?
// En CommonJS, al usar require, yargs devuelve directamente el objeto con información sobre los argumentos, por lo que no es necesario encadenar .argv para acceder a la información.

// ¿Qué hace .argv?
// Al encadenar .argv al final de la configuración de yargs, estás diciendo a yargs que procese y analice los argumentos de la línea de comandos. Sin .argv, solo obtendrías la configuración de yargs, pero no el objeto que representa los argumentos reales.

// En resumen, .argv se utiliza para obtener los argumentos reales después de que yargs los ha procesado y analizado. La necesidad de encadenar .argv es específica de cómo yargs trabaja con ECMAScript Modules.

// ChatGPT: Cuando quitas el .argv al final, obtienes un objeto YargsInstance en lugar de los argumentos directos. Para acceder a los argumentos sin .argv, puedes usar la propiedad argv del objeto YargsInstance.

// ChatGPT: La razón por la cual colocas .argv al final y por qué necesitas usar hideBin(process.argv) dentro de los paréntesis en yargs(hideBin(process.argv)).argv está relacionada con cómo Yargs maneja los argumentos de la línea de comandos en Node.js.

// .argv al final: El .argv al final es una convención de Yargs para obtener los argumentos procesados. Al agregar .argv, estás indicando a Yargs que procese los argumentos y devuelva el resultado en un formato más conveniente.

// hideBin(process.argv): hideBin es una función de Yargs que elimina los primeros dos elementos de process.argv, que son rutas al ejecutable de Node.js y al script que estás ejecutando. Esto es necesario porque Yargs espera que los argumentos comiencen desde el tercer elemento de process.argv.
// Si no usas hideBin, los dos primeros elementos interferirían con el análisis de Yargs y podrías obtener resultados inesperados.

// Entonces, al hacer yargs(hideBin(process.argv)).argv:

// hideBin(process.argv) elimina los primeros dos elementos de process.argv.
// yargs(...) toma los argumentos restantes y realiza el análisis.
// .argv al final devuelve los resultados procesados.
// En resumen, .argv al final es necesario para obtener los resultados procesados, y hideBin(process.argv) es necesario para asegurarse de que los argumentos se analicen correctamente sin incluir los primeros dos elementos no deseados.

// Correcto, hideBin de yargs/helpers específicamente oculta los primeros dos elementos de process.argv. Estos dos elementos son:

// La ruta al ejecutable de Node.js.
// La ruta al script que se está ejecutando.
// hideBin toma process.argv y devuelve un nuevo array que excluye estos dos primeros elementos, de modo que solo quedan los argumentos proporcionados por el usuario al ejecutar el script.

// Entonces, cuando haces yargs(hideBin(process.argv)), estás configurando yargs para analizar únicamente los argumentos proporcionados por el usuario y no los dos primeros elementos que son información sobre la ejecución del script.

// Sí, has entendido correctamente. hideBin es una función que está específicamente diseñada para ocultar los primeros dos elementos de un array, y en el contexto de yargs, se utiliza para ocultar los elementos asociados al entorno de ejecución de Node.js (process.argv).

// La función hideBin en yargs/helpers no acepta argumentos adicionales. Simplemente se utiliza con process.argv para eliminar los dos primeros elementos de ese array y devolver un nuevo array sin esos elementos, que luego se pasa a yargs para el análisis de argumentos.

// En Node.js, process.argv es un array que contiene los argumentos de la línea de comandos que se pasaron al ejecutar el script. La propiedad argv es una parte del objeto process y representa una matriz de argumentos de línea de comandos.

// Cuando usas yargs(hideBin(process.argv)), estás pasando el array resultante después de ocultar los dos primeros elementos de process.argv mediante hideBin. Luego, el método .argv al final es una convención de yargs para indicar que deseas que yargs procese esos argumentos y devuelva el resultado final en un formato más conveniente para su manejo.

// En resumen, yargs(hideBin(process.argv)).argv significa que estás utilizando yargs para analizar y procesar los argumentos de la línea de comandos que provienen de process.argv después de haber ocultado los dos primeros elementos con hideBin.

// Mis disculpas por la confusión en mi respuesta anterior. Permíteme aclarar:

// process.argv es un array que contiene los argumentos de la línea de comandos que se pasaron al ejecutar el script. Es correcto considerar process.argv como un array.

// Cuando mencioné "La propiedad argv es una parte del objeto process", fue una declaración inexacta. Me equivoqué al describir eso. argv no es una propiedad del objeto process; más bien, es una convención utilizada por yargs para indicar que deseas que yargs procese los argumentos.

// Por lo tanto, process.argv es un array, y yargs(hideBin(process.argv)).argv se refiere al método argv de yargs, no a una propiedad de process. Lamento la confusión y agradezco tu paciencia.

// Entendido! Vamos a analizar cada parte por separado:

// yargs solo:
// yargs es un paquete que facilita el análisis de argumentos de línea de comandos en Node.js. Permite definir comandos, opciones y argumentos de forma sencilla y proporciona una interfaz más fácil de usar para trabajar con los argumentos de la línea de comandos.

// hideBin solo:
// hideBin es una función proporcionada por yargs/helpers. Su función es ocultar los dos primeros elementos del array process.argv. Estos dos elementos son la ruta al ejecutable de Node.js y la ruta al script que se está ejecutando.

// process solo:
// process es un objeto global en Node.js que proporciona información y control sobre el proceso en ejecución. Tiene varias propiedades y métodos útiles relacionados con el entorno de ejecución.

// al final .argv solo:
// En el contexto de yargs, el método .argv se utiliza para obtener el objeto que contiene la información analizada de los argumentos. Este método es necesario para obtener el resultado final después de que yargs ha procesado los argumentos.
// Entonces, al combinar todas las partes, yargs(hideBin(process.argv)).argv significa:

// process.argv: Obtén los argumentos de la línea de comandos como un array.
// hideBin(process.argv): Oculta los dos primeros elementos del array.
// yargs(hideBin(process.argv)).argv: Procesa los argumentos restantes usando yargs y devuelve un objeto estructurado con la información analizada.

// process es un objeto: process es un objeto global en Node.js que tiene propiedades y métodos relacionados con el entorno de ejecución.
// process.argv es un array: process.argv es una propiedad de process que contiene los argumentos de la línea de comandos como un array. Es un array de strings donde cada elemento es un argumento.
// Entonces, cuando hablo de ocultar los dos primeros elementos del array usando hideBin(process.argv), me estoy refiriendo a ocultar las dos primeras strings que están en el array process.argv. Sin embargo, en un contexto más amplio, process sigue siendo un objeto que contiene información sobre el entorno de ejecución de Node.js.

// Lamento la confusión y espero que esto aclare la distinción entre objetos y arrays en el contexto de process y process.argv.

// hideBin(process.argv): Esto devuelve un array. La función hideBin oculta los dos primeros elementos de process.argv, que es un array.

// yargs(hideBin(process.argv)).argv: Después de procesar los argumentos con yargs, obtienes un objeto. yargs toma un array (que es el resultado de hideBin(process.argv)) y lo procesa para proporcionar un objeto más estructurado (argv).

// Así que, para ser preciso, hideBin(process.argv) es un array, y yargs(hideBin(process.argv)).argv es un objeto que proviene de procesar ese array. Lo siento por la confusión anterior.

// process: Es un objeto global en Node.js que tiene propiedades y métodos relacionados con el entorno de ejecución.

// process.argv: Es una propiedad de process que contiene los argumentos de la línea de comandos como un array. Es un array de strings donde cada elemento es un argumento.

// hideBin(process.argv): Es una función que toma el array de process.argv y elimina los dos primeros elementos. Esto devuelve un nuevo array.

// yargs(hideBin(process.argv)).argv: Después de procesar los argumentos con yargs, obtienes un objeto. yargs toma el array resultante de hideBin(process.argv) y lo procesa para proporcionar un objeto más estructurado (argv).

// Entonces, para clarificar: hideBin(process.argv) es un array, y yargs(hideBin(process.argv)).argv es un objeto que proviene de procesar ese array.

// Sí, exactamente. Aquí está la aclaración:

// process: Es un objeto global en Node.js.

// process.argv: Es una propiedad de process que contiene los argumentos de la línea de comandos como un array.

// Entonces, process es el objeto global, y .argv es la propiedad de ese objeto que contiene los argumentos de la línea de comandos como un array. Es importante notar que .argv no es una propiedad directa de process, sino más bien de la forma en que yargs y hideBin interactúan con process.argv.

// ----------------------------------------------------------------

// el --help, por ejemplo en node app(nmbre del archivo a ejecutar) --help, usualmente es un estandar el --help que significa que queremos ver la información de todos los comandos que mí aplicación, que en este caso de consola de mí app.js puede ejecutar

// console.log(process.argv); //<= La propiedad Process.argv devuelve una matriz que contiene los argumentos de la línea de comandos pasados cuando se inició el proceso Node.js. El primer argumento será execPath, que es donde se escuentra instalada nuestra aplicación de node de manera global. Consulte Process.argv0 si es necesario acceder al valor original de argv[0]. El segundo argumento es donde se encuentra ejecutada(la ruta) la aplicación node que acabamos de hacer. Los argumento restantes, serán los argumentos adicionales de la línea de comandos que podemos utilizar y que podemos extraer:
//El Profe Fernando nunca recomienda hacerlo de esta forma, solo se hizo de esta forma con fines educativos, para que sepamos de donde vienen los arguementos, cuando enviamos los argumentos por la consola.
// const [ , , arg3 = 'base=5' ] = process.argv;
// const [ , base = 5 ] = arg3.split('=')
// console.log( base );

// const base = 5;

// crearArchivo( base )
//     .then( nombreArchivo => console.log(nombreArchivo, 'creado'))
//     .catch( err => console.log(err));


    // El packaje.json es el punto inicial de cualquier proyecto de node, nos ayuda a nosotros y le ayuda a node, a saber que comandos son los que se ejecutan para ejecutar su aplicación(node), por ejemplo en la parte de los script, debajo de los test, podemos crearnos un script = "base3": "node app --base=3". Entonces al ejecutar npm run base3 en la consola, es como si hiciéramos en la consola node app --base=3, siendo una especie de abreviación o atajo.

    // las "dependencies" del packaje.json, son por decirlo así, los paquetes necesarios para que cualquier persona que quiera ejecutar nuestras app tiene que tener instalado. Además en el packaje.json nosotros deberíamos de tratar de mantenerlo con las menores modificaciones posibles.
    
    // En el packaje-lock.json, nos dice como fueron construidas las dependencias o como se deben construir las dependencias que estan el packaje.json y nosotros nunca deberíamos modificar el packaje-lock.json directamente.

    // Un servidor de producción, es el nombre que recibe la computadora conde correrá el programa ya con usuarios reales o un ambiente real... el de desarrollo, usualmente es tu equipo o un lugar donde sólo programadores pueden probar su código.

    // El --save es un paquete o dependencia necesaria cuando generes tu aplicación final y/o --save se usa para guardar el paquete requerido para que se ejecute la aplicación final.

    // El --save-dev, es un paquete o dependencia que es necesaria únicamente cuando estamos creando la aplicación y/o --save-dev se usa para guardar el paquete para fines de desarrollo. Ejemplo: pruebas unitarias, minificación etc... Básicamente las dependencias(--save) son necesarias para producción y las dependencias de desarrollo(--save-dev) sólo son únicamente para crear la aplicación o probarla... esas dependencias no serán parte del paquete de producción

    // npm i -g: Instala de forma global en tu computadora el paquete, para que lo puedas usar sin necesidad de especificarlo en un package.json o usarlo como comandos en tu powershell o terminal del sistema operativo. No necesariamente dentro de aplicaciones de node.

    // npm i --save-dev:  Esto es algo que se coloca en las dependencias de desarrollo, y que cuando se haga un despliegue a producción, ninguna dependencia de desarrollo será instalada en dicho equipo

    // npm i: Esto quiere decir que es un paquete necesario en tu aplicación y sólamente en tu aplicación, nada de forma global, simplemente es necesario para que tu aplicación funcione como se espera.

    // Si tengo una dependencia instalada de manera global, y luego la instalo para desarrollo:

    // 1.- Se instalará igualmente para desarrollo? A: Si lo tienes de forma global NO se pasa a tu proyecto de forma automática... debes de hacer la instalación y asegurarte que este en el package.json para que este local.

    // 2.- Si tengo instalado una misma dependencia de manera global y para desarrollo, cómo especificar al momento de desinstalar la que quiero? A: si tu ejecutas el -g en el uninstall, dices que quieres borrar la global... sin el -g borra la del proyecto local.

    // desde la versión 5 de npm, --save ya no es necesario porque el comportamiento predeterminado es guardar la dependencia en el package.json.

    // Aunque es posible instalar las dependencias directamente sin crear manualmente el archivo package.json, se recomienda encarecidamente crear el archivo package.json de forma manual utilizando npm init antes de instalar las dependencias. Esto te permite definir y gestionar de manera controlada las configuraciones del proyecto, como su nombre, versión, descripción y otras configuraciones importantes.

    // Para añadir si queremos instalar un paquete solo para desarrollo, pero que no sea una dependencia en nuestro packaje.json. Por ejemplo, nodemon que es solo para desarrollo, podemos hacer lo siguiente con los signos de bandera(--): npm install nodemon --save-dev y esto NO lo instala como una dependencia, ya que es solo para desarrollo. Por lo cual esto crea un espacio en nuestro packaje.json llamado devDependencies, es decir dependencias de desarrollo, que solo van a ser necesarias cuando estemos editando nuestra aplicación. Sin embargo esto añadira muchos paquetes en el caso de nodemon, porque son necesarios para que se ejecuta nodemon, pero esto no significa que todos estos paquetes van a ser parte final de la App. Aunque por ahora, los modulos de node es otro lugar donde nosotros jamás vamos manipular las cosas directamente, porque son volatiles y cualquier modificación que hagamos en este archivo(borrar la dependencia y volverla a instalar), se perderá al momento de volver a hacer otra instalación en esos archivos. Pero si queremos instalar una versión en específico, tenemos que desintalar el paquete y luego instalar la versión que queremos de la siguiente manera: npm i o install color(nombre del paquete) seguido de un @1.0.0(versión del paquete) = npm i colors@1.0.0. También existe el comando npm update, que va a revisar las dependencias exitentes que tenemos y las va actualizar, pero tenemos que estar atentos a posibles conflictos entre otras cosas que nos puede mostrar npm update. Aunque el prOFE Fernando prefiere actualizar manualmente.




// El writeFile es un forma un poco más compleja, pero también sirve
// fs.writeFile( `tabla-${ base }.txt`, salida, (err) => {
//     if (err) throw err; //<= ¿Qué tipo de error tendríamos? A: Que no se pudo graba el archivo, que sería un error común.

//     console.log( `tabla-${ base }.txt creado ` ); //<= Si se hace correctamente vamos a crear un mensaje de texto.
// }) //<= El 1 argumento es un Path, si no le ponemos el Path, va a tomar como base la carpeta donde se está ejecutando este archivo de node, que en este caso es el app.js. Entonces aquí queremos crear un archivo que se llame tabla-5.txt, porque es un archivo de texto. El 2 argumento son las opciones, que son muchas pero nosotros pondremos la salida

// Otra forma de hacer lo mismo que el código anterior, es hacerlo con promesas:
// const  fs = require('fs/promises');
 
// console.clear();
// console.log('=========================');
// console.log('======  TABLA DEL 5  ====');
// console.log('=========================');
 
 
// const base = 7;
// let salida = '';
// for (let index = 0; index <= 10; index++) {
//     salida += `${ base } x ${ index } = ${ base * index } \n`;
// }
 
// console.log(salida);
 
// const escribeTablaMultiplicar =  async () => {
//     try {
//         await fs.writeFile(`tabla-${ base }.txt`, salida );
//         console.log( `tabla-${ base }.txt creado ` );
//     } catch ( error ) {
//         throw error;
//     }
// }
 
// escribeTablaMultiplicar();

// fs <= (alias) módulo "fs" importar fs
// El módulo node:fs permite interactuar con el sistema de archivos de una manera modelada según las funciones POSIX estándar.

// Para utilizar las API basadas en promesas:

// importar * como fs desde 'nodo:fs/promises';
// Para utilizar las API de devolución de llamada y sincronización:

// importar * como fs desde 'nodo:fs';
// Todas las operaciones del sistema de archivos tienen formularios sincrónicos, de devolución de llamadas y basados en promesas, y se puede acceder a ellos mediante la sintaxis CommonJS y los módulos ES6 (ESM).

// fs.write <= Cuando el archivo es un nombre de archivo, escribe datos de forma asincrónica en el archivo y reemplaza el archivo si ya existe. Los datos pueden ser una cadena o un búfer.

// Cuando file es un descriptor de archivo, el comportamiento es similar a llamar directamente a fs.write() (lo cual se recomienda). Consulte las notas a continuación sobre el uso de un descriptor de archivo.

// La opción de codificación se ignora si los datos son un búfer.

// La opción de modo solo afecta al archivo recién creado.
