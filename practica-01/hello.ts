//Greets the world
// console.log('Hello world')

function greet(person: string, date: Date) {
    console.log(`Hello ${person}, today is ${date.toDateString()}!`)
}

greet("Brendan", new Date())

//Inferencia en función
const nombres = ["Oswaldo", "Karolina", "Nidia"]

nombres.forEach(function (nombre) {
    console.log(nombre.toUpperCase())
})

nombres.forEach(nombre => {
    console.log(nombre.toUpperCase())
})

//Union Types
function printId(id: | number | string) {
    console.log("Your ID is: " + id);
}

function welcomePeople(x: string[] | string) {
    if (Array.isArray(x)) {
        console.log("Hello " + x.join(" and "))
    } else {
        console.log("Welcome lone traveler " + x)
    }
}

printId(25)
printId("veinteycinco")
printId({myID: 22352})