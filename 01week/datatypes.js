'use strict'
console.log('here');

// Write a JavaScript program that adds 2 numbers together

function sumOfTwoNumbers(num1, num2) {
  return num1 + num2
}

sumOfTwoNumbers( 3, 2 );

//Write a JavaScript program that runs only when 2 things are true.

//function that receives two items, if those two things are true.
//methods: function, 2 arguments, if/then statement

function evaluatesToTrue(arg1, arg2) {
  if ( arg1 && arg2 ){
    return 'both are true'
  } else {
    return 'nope'
  }
}

evaluatesToTrue( 4, 6 );
evaluatesToTrue( null, 6 )
