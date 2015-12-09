'use strict'

let glo = 0

setTimeout(() => {

  glo = 4
  callback(glo)
}, 3000)


const myFunction = (callback) => {


  setTimeout(() => {

    glo = 4
    callback(glo)
  }, 3000)
}

const myCallback = (res) => {
  console.log('callback fired', res)
}

console.log('before')
myFunction(myCallback)
console.log('after', glo)
