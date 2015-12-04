const myFunction = (callback) => {
  setTimeout(() => {
    callback()
  }, 3000)
}

const myCallback = () => {
  console.log('callback fired')
}

console.log('before')
myFunction(myCallback)
console.log('after')
