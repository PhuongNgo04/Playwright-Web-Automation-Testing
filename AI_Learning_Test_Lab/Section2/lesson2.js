//  concatination and interpolation
var price = 99
var item = "chair"
var messagetoprint = "The price for your " + item + " is "+price + "$" // concatination
var messagetoprint2 = `The price for your ${item} is ${price}$` // interpolation 
console.log(messagetoprint)
console.log(messagetoprint2)