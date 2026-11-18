// 1. Declarative function
function helloOne(){
    console.log(`hello one!`)}
helloOne()
helloOne()// "//" : call the function

// 2. Anoymus function
var helloTwo = function (){
    console.log(`Hello Two!`)
}
helloTwo

// 3. ES6 function syntax or arrow function
var hello3 = () => {
    console.log(`Hello Three!`)
}
hello3()

// 4. Function with argumenta
function printname(name, lastname){
    console.log(name + ' ' + lastname)
}
printname(`Phuong Ngo`, `Miller`)

// 5. Function with return value
function multiplyByTwo(number){
    var result = number * 2
    return result
}
var myresult = multiplyByTwo(5)
console.log(myresult)

// 6. Input function
import { printage } from "../helpers/printHelper.js"
//"Đi ra ngoài 1 thư mục (..), tìm vào thư mục helpers, 
// mở file printHelper.js ra và mượn hàm printage về file này để xài".
printage(25)

// 7. Import everything
import * as helper from "../helpers/printHelper.js"
helper.printage(30)