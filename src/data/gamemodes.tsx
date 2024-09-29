
export type tGameModesOption = 'facil' | 'normal' | 'dificil' | 'insano'


export const gameModes = {
  facil:{
    cardNumber: 10,
    movement: false
  },
  normal:{
    cardNumber:20,
    movement: false
  },
  dificil:{
    cardNumber:20,
    movement: true
  },
  insano:{
    cardNumber:25,
    movement: true
  }
}

export const gameModeOptions = Object.keys(gameModes) as tGameModesOption []