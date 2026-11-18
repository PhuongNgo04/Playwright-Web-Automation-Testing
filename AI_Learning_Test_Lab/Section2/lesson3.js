// 1. Ojects
var customer = {
    firstname: "Phuong",
    lastname: "Ngo",
    cars: ["volvo", "bmw", "mercedes"]
}
//console.log(custome)
// bracket notation
customer.firstname = "Miller"
customer[`lastname`] = "DHA"
//console.log(customer[`firstname`])
console.log(`${customer.firstname} ${customer.lastname}`)

// 2. Arrays
var car = ["volvo", "bmw", "mercedes"] // 0 - 1 - 2
car[1] = "audi"
console.log(car[1])
console.log(customer.cars[1])