// TODO Change the name to css color
export const iconColor = [
  {
    name: 'red',
    value: 'RED',
  },
  {
    name: 'orange',
    value: 'ORANGE',
  },
  {
    name: 'yellow',
    value: 'YELLOW',
  },
  {
    name: 'green',
    value: 'GREEN',
  },
  {
    name: 'blue',
    value: 'BLUE',
  },
  {
    name: 'indigo',
    value: 'INDIGO',
  },
  {
    name: 'violet',
    value: 'VIOLET',
  },
  // {
  //   name: 'black',
  //   value: 'BLACK',
  // },
  {
    name: 'black',
    value: 'SLATE',
  },
  // {
  //   name: 'white',
  //   value: 'WHITE',
  // },
  {
    name: 'white',
    value: 'PINK',
  },
] as const

export const colorMap = {
  RED: 'bg-red-500',
  ORANGE: 'bg-orange-500',
  YELLOW: 'bg-yellow-500',
  GREEN: 'bg-green-500',
  BLUE: 'bg-blue-300',
  INDIGO: 'bg-indigo-500',
  VIOLET: 'bg-violet-600',
  SLATE: 'bg-slate-400', // we don't have BLACK
  PINK: 'bg-pink-400', // WE don't have WHITE
}
