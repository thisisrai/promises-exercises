// ## Task
//
// Create a promise. Have it fulfilled with a value of 'FULFILLED!' in
// executor after a delay of 300ms, using setTimeout.
//
// Then, print the contents of the promise after if has been fulfilled by passing
// console.log to then.

'use strict';

var promise = new Promise(function (fulfill, reject) {
  setTimeout(() => {fulfill('FULFILLED!')}, 300)
});

promise.then(fulfill => {console.log(fulfill)});
