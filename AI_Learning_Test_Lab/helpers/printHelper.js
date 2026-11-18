// helpers/printHelper.js

export function printage(age) {
    console.log(age);
}

class CustomerDetails {
    printfirstname(firstname) {
        console.log(firstname);
    }

    /**
     * This method will print the last name
     * @param {string} lastname 
     */

    printlastname(lastname) {
        console.log(lastname);
    }
}

// Khởi tạo và export đối tượng dùng chung
export const customerdetails = new CustomerDetails();