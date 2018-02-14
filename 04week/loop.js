/*
Create a new file called loops.js in the /04week folder of your workbook.

Complete each of the following exercises.

for loop
    Use a for loop to console.log each item in the array carsInReverse.
    */
const carsInReverse = ['honda', 'toyota', 'bmw', 'jeep', 'ford', 'tesla']

const printEachCar = (objArr) => {
    for (let i = 0; i < objArr.length; i++) {
        console.log(objArr[i])
    }
}
// printEachCar(carsInReverse)

/*
for...in loop
    Create an object (an array with keys and values) called persons with the following data:
    firstName: "Jane"
    lastName: "Doe"
    birthDate: "Jan 5, 1925"
    gender: "female"

    Use a for...in loop to console.log each key.

    Then use a for...in loop and if state to console.log the value associated with the key birthDate.
*/

const persons = {
    firstName: "Jane",
    lastName: "Doe",
    birthDate: "Jan 5, 1925",
    gender: "female"
}

const printEachObjectKey = (objArr) => {
    for (const key in objArr) {
        console.log (key)
    }
}

printEachObjectKey(persons);

/*
while loop
    Use a for loop to console.log the numbers 1 to 1000.
*/

/*
do...while loop
    Use a do...while loop to console.log the numbers from 1 to 1000.
*/

/*
When is a for loop better than a while loop?
How is the readability of the code affected?
What is the difference between a for loop and a for...in loop?
What is the difference between a while loop and a do...while loop?
*/