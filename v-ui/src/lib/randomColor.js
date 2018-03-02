let colors = [
  'red',
  'pink',
  'purple',
  'deep-purple',
  'indigo',
  'blue',
  'light-blue',
  'cyan',
  'teal',
  'green',
  'light-green',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deep-orange',
  'brown',
  'blue-grey',
  'grey'
]

let shades = [
  'lighten',
  'darken',
  'accent'
]

let randItem = function (a) {
  return a[Math.floor(Math.random() * a.length)]
}

let randShade = function () {
  let s = randItem(shades)
  let n = [1, 2, 3, 4]
  if (s === 'lighten') { n.push(5) }
  return [s, randItem(n)].join('-')
}

let randomColor = function () {
  return [randItem(colors), randShade()].join(' ')
}

export default randomColor
