
// interface Usuario { nombre: string}
// interface Usuario {edad: number}

// const cliente: Usuario = { nombre: 'oswaldo', edad: 24}
// console.log(cliente)

// type ID = string | number
// type Coordenadas = [number, number]
// type Estado = 'activo' | 'inactivo'


// interface Animal {nombre: string}
// interface Perro extends Animal {ladra: boolean}

// const perro: Perro = {nombre: 'canino', ladra: false}

// type Vehiculo = {marca: string}
// type Coche = Vehiculo & {puertas: number}

// const carro: Coche = {marca: 'toyota', puertas: 4}

// function saludar(nombre: string, saludo?: string) {
//     if (saludo) {
//         return `Hola, ${saludo} ${nombre}`
//     } else {
//         return `Hola, ${nombre}`
//     }
// }

// console.log(saludar('oswaldo'))
// console.log(saludar('oswaldo', 'hola como estas?'))
// function retornarConGenerico<T>(valor: T): T {
//     return valor
// }

// const texto = retornarConGenerico<string>('Hola oswaldo')
// const numero = retornarConGenerico<number>(2)
// console.log(texto, numero)

// interface RespuestaAPI<T> {
//     estado: "exito" |  "error"
//     codigo: number
//     datos: T
// }

// interface Usuario { nombre: string, correo: string }
// interface Producto {id: number, precio: number}

// const respuestaUsuario: RespuestaAPI<Usuario> = {
//     estado: "exito",
//     codigo: 200,
//     datos: {nombre: 'oswaldo', correo: 'oswaldo@gmail.com'}
// }

// const respuestaProductos: RespuestaAPI<Producto[]> = {
//     estado: "error",
//     codigo: 400,
//     datos: [{id: 1, precio: 34}]
    
// }

// console.log(respuestaUsuario, respuestaProductos)

// interface ConLongitud { length: number }

// function imprimirLongitud<T extends ConLongitud>(elemento: T): void {
//     console.log(`La longitud es: ${elemento.length}`)
// }

// imprimirLongitud('hola')
// imprimirLongitud([1,2,3])


function combinar<T, U>(objA: T, objB: U): T & U {
    return {...objA, ...objB}
}

const persona = {nombre: 'Andres'}
const empleo = {puesto: 'Developer', salario: 400}

const empleadoCompleto = combinar(persona, empleo)
console.log(empleadoCompleto)