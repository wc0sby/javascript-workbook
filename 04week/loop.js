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

const printOutTheKeyValues = (objArr, objName) => {
    for (const key in objArr) {
        key === objName ? console.log(objArr[key]) : '';
    }
}
printOutTheKeyValues(persons, 'birthDate')

/*
while loop
    Use a for loop to console.log the numbers 1 to 1000.
*/

const printNumbersOneToOneThousand = () => {
    let x = 1
    while ( x < 1001 ) {
        console.log(x);
        x++;        
    }
}

// printNumbersOneToOneThousand();

/*
do...while loop
    Use a do...while loop to console.log the numbers from 1 to 1000.
*/
const printTheNumbersUsingDoWhile = () => {
    let x = 1
    do {
        console.log(x);
        x++
    } while (x < 1001);
}

// printTheNumbersUsingDoWhile();

/*
1. When is a for loop better than a while loop?
    For loops are preferred when the number of iterations of the action is known.
    The while loop is preferred when there isn't a known count of iterations, but can 
    utilize other conditionals to loop i.e. 
*/

/*
2. How is the readability of the code affected?
    The syntax is different between the two.  For loop stores a variable to scope, has
    a iteration condition (i < x) and an increaser (i++).  The While syntax looks
    for While (condition) {code block}.  
*/

/*
3. What is the difference between a for loop and a for...in loop?
    For loop cycles through a code block for a specific condition returns false
    For...in loop cycles through the properties of an object
*/

/*
4. What is the difference between a while loop and a do...while loop?
    The while loop will execute the code block while the condition is true
    The do...while loop will execute the code block until the condition is false.
*/