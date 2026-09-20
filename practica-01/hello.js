"use strict";
//Greets the world
// console.log('Hello world')
function greet(person, date) {
    console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
greet("Brendan", new Date());
//Inferencia en función
const nombres = ["Oswaldo", "Karolina", "Nidia"];
nombres.forEach(function (nombre) {
    console.log(nombre.toUpperCase());
});
nombres.forEach(nombre => {
    console.log(nombre.toUpperCase());
});
//Union Types
function printId(id) {
    console.log("Your ID is: " + id);
}
printId(25);
printId("veinteycinco");
printId({ myID: 22352 });
