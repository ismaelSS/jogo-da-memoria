
export type tGameModesOption = 'facil' | 'normal' | 'dificil' | 'insano'


export const gameModes = {
  facil:{
    cardNumber: 10,
    movement: false
  },
  normal:{
    cardNumber:15,
    movement: true
  },
  dificil:{
    cardNumber:25,
    movement: false
  },
  insano:{
    cardNumber:25,
    movement: true
  }
}

export const gameModeOptions = Object.keys(gameModes) as tGameModesOption []