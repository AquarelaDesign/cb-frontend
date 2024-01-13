import moment from 'moment'
import { mesesAbreviados } from './Consts'

export const obterMesAno = (data) => {
  const mesAno = mesesAbreviados[data.getMonth()] + '-' + data.getFullYear()
  return mesAno.toUpperCase()
}

export const obterDataFormatada = (data, formato = 'DD/MM/YYYY') => moment(data).format(formato)

export const randomColor = () => Math.floor(Math.random() * 16777215).toString(16)

export const geraCoresGrafico = (cor, quantidade = 1) => {
  var returnArray = []
  for (let i = 0; i <= quantidade; i++) {
    returnArray.push('#' + rgba2hex(cor))
  }
  return returnArray
}

export const rgba2hex = (orig) => {
  var a,
    rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
    alpha = ((rgb && rgb[4]) || '').trim(),
    hex = rgb
      ? (rgb[1] | (1 << 8)).toString(16).slice(1) +
        (rgb[2] | (1 << 8)).toString(16).slice(1) +
        (rgb[3] | (1 << 8)).toString(16).slice(1)
      : orig

  if (alpha !== '') {
    a = alpha
  } else {
    a = 1
  }
  // multiply before convert to HEX
  a = ((a * 255) | (1 << 8)).toString(16).slice(1)
  hex = hex + a

  return hex
}

export const geraCoresAleatorias = (quantidade = 1) => {
  var returnArray = []
  for (let i = 0; i <= quantidade; i++) {
    returnArray.push('#' + randomColor())
  }
  return returnArray
}
