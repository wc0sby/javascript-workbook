'use strict'
/*
Write a JavaScript program to display the current day and time.
Fuction called retunsCurrentDate with empty params and return current date using new Date method and concate
      getMonth()+
      getDate()+
      getFullYear()+
      getHours()+
      getMinutes()+
*/
function displayCurrentDateAndTime () {
  const now = new Date();
  const month = now.getMonth()+1;
  const day = now.getDate();
  const year = now.getFullYear();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  return month + "/" + day + "/" + year + " " + hour + ":" + minute + ":" + second
}
displayCurrentDateAndTime();

/*
Write a JavaScript program to convert a number to a string.
Whiteboard:
Function called changeToString that takes in number param.
Return toString calling param
num.toString
*/
function changeToString(num) {
  return num.toString();
}

changeToString(4);


/*
Write a JavaScript program to convert a string to the number.
Whiteboard:
Function called changeToNumber that takes in a str param.
Returns parseInt caling the str param
*/
function changeToNumber(num){
  return Number(num);
}
changeToNumber(4.5)

/*
Write a JavaScript program that takes in different datatypes and prints out whether they are a:
    // Boolean
    // Null
    // Undefined
    // Number
    // NaN
    // String
Whiteboard:
Function called whatsMyType that takes in an argument param.
Return type using method typeOf  [ typeof arg ]
*/
function whatsMyType (arg) {
  return typeof arg
}
whatsMyType(5)

/*
Write a JavaScript program that adds 2 numbers together.
Whiteboard:
Function called addTwoNumbers that takes in two num params.
Returns sum of the two params.
*/

function addTwoNumbers(num1, num2) {
  return (typeof num1 === 'number' && typeof num2 === 'number')
    ? num1 + num2
    : "Invalid input; please only use number datatypes"
}
addTwoNumbers(2,2)

/*
Write a JavaScript program that runs only when 2 things are true.
Whiteboard:
Function called areTheseTwoTrue that takes in two arg params.
Returns test to see if both (AND) are truthy and prints Yup for both
being true and Nope when both false.
*/
function areTheseTwoTrue(arg1, arg2) {
  return (arg1 && arg2)
    ? 'Yup'
    : 'Nope'
}
areTheseTwoTrue(8,0);

/*
Write a JavaScript program that runs when 1 of 2 things are true.
Whiteboard:
Function called isOneOfTheseTrue that takes in two arg params.
Returns test to see if at least one param (OR) is truthy and prints
Yup for both being true and Nope when both false.
*/
function isOneOfTheseTrue(arg1, arg2){
  return (arg1 || arg2)
    ? 'Yup'
    : 'Nope'
}
isOneOfTheseTrue(1,0);

/*
// Write a JavaScript program that runs when both things are not true.
Whiteboard:
Function called areTheseTwoNotTrue that takes in two arg params.
Returns test to see if both are not truthy (!) and prints
Yup for both being not truthy and Nope when both are truthy.
*/
function areTheseTwoNotTrue(arg1, arg2) {
  return (!arg1 && !arg2) ?
    'Yup they are both false' :
    'Nope, at least one is truthy'
}
areTheseTwoNotTrue(0, 0)

// **Video walkthrough**

// 'use strict'
// console.log('here');
//
// // Write a JavaScript program that adds 2 numbers together
//
// function sumOfTwoNumbers(num1, num2) {
//   return num1 + num2
// }
//
// sumOfTwoNumbers( 3, 2 );
//
// //Write a JavaScript program that runs only when 2 things are true.
//
// //function that receives two items, if those two things are true.
// //methods: function, 2 arguments, if/then statement
//
// function evaluatesToTrue(arg1, arg2) {
//   if ( arg1 && arg2 ){
//     return 'both are true'
//   } else {
//     return 'nope'
//   }
// }
//
// evaluatesToTrue( 4, 6 );
// evaluatesToTrue( null, 6 )
