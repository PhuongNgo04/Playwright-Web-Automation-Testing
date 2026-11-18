// 1/ Loops
/*
console.log(`hello world!`)
console.log(`hello world!`)
console.log(`hello world!`)
console.log(`hello world!`)
console.log(`hello world!`)

for (statemetn1; statement2; statement3) {
    //execute some code here
}
*/
// for loop (for i loop)
for (let i=0; i<5; i++) {
    console.log(`hello world!`)
}

var cars = ["volvo", "bmw", "mercedes"]
// for of loop
for (let car of cars) {
    console.log(car)
    if (car === "bmw") {
        break
    }
}

// ES6 syntax for each loop
cars.forEach((car) => {
    console.log(car)
})