
const yusufsDream = (arthursDream, saitosDream) => {
  console.log("the dreamers: arthur and saito have entered yusuf's dream!")
  const yusufKick = () => {
    console.log('wake up Yusuf!')
  }

  setTimeout(() => {
    arthursDream(saitosDream, yusufKick)
  }, 1000)
}

const arthursDream = (saito, yusufKick) => {
  console.log("saito has entered saito's dream")
  const arthurKick = (kick) => {
    console.log('wakeup arthur!')
    yusufKick()
  }

  setTimeout(() => {
    saitosDream(arthurKick)
  }, 2000)
}

const saitosDream = (arthurKick) => {
  const saitoKick = () => {
    console.log('wakeup saito!')
    arthurKick()
    console.log('Inception!')
  }

  setTimeout(() => {
    saitoKick()
  }, 3000)
}


const yusufsDream = () => {


  setTimeout(() => {






  }, )



}




yusufsDream(arthursDream, saitosDream)
