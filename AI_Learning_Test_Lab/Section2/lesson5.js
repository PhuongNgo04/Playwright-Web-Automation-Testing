// 1. Logical "AND" - && : phải thỏa mãn tất cả các điều kiện mới trả về TRUE
console.log(true && false) // all values have to be TRUE for expression to be TRUE

// 2. Logical "OR" - || : chỉ cần thỏa mãn 1 điều kiện là trả về TRUE
console.log(true || false) // any value should be TRUE for expression to be TRUE

var ageismorethanten = false // age > 10
var isUSCitizen = true // is US citizen

var eligiblityfordriverslicense = ageismorethanten && isUSCitizen // thỏa cả 2 -> true
console.log(`This customer is eligible for a driver's license: ` + eligiblityfordriverslicense)

// 3. Logical "NOT" - ! : Biến Đúng thành Sai, biến Sai thành Đúng (lật ngược giá trị lại)
console.log(!true) // false
console.log(6 !== 10) // true