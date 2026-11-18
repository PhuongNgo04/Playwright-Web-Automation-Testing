// 1. Conditional statement

//if(condition) {
    //execute some code here
//} else {
    //execute some code here
//}

// If hour between 6 and 12 pẻint "Good Morning"
// If hour between 12 and 18 print "Good Afternoon"
// Otherwise: Good Evening

/*var hour = 5

if (hour >= 6 && hour < 12) {
    console.log(`Good Morning`)
} else if ( hour >= 12 && hour < 18){
    console.log(`Good Afternoon`)
} else {
    console.log(`Good Evening`)
}*/

var ageismorethan18 = true // age > 18
var isUSCitizen = true // is US citizen
 
if (ageismorethan18 && isUSCitizen ){
    console.log(`This customer is eligible for a driver's license`)
} else {
    console.log(`This customer is not eligible for a driver's license`)
}