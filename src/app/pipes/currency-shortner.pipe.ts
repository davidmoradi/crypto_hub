import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyShortner'
})
export class CurrencyShortnerPipe implements PipeTransform {

  transform(value: number): number {
    const precision = 3
    const minimum = 1000
    if (value < minimum) {
      return precision
    }

    const powerOfTen = Math.floor(Math.log(Math.abs(value)) * Math.LOG10E)
    let result
    switch (powerOfTen) {
      case 3: case 4: case 5: {
        result = (value / Math.pow(10, 3)).toFixed(precision) + 'k'
        break
      }
      case 6: case 7: case 8: {
        result = (value / Math.pow(10, 6)).toFixed(precision) + ' million'
        break
      }
      case 9: case 10: case 11: {
        result = (value / Math.pow(10, 9)).toFixed(precision) + ' billion'
        break
      }
      case 12: case 13: case 14: {
        result = (value / Math.pow(10, 12)).toFixed(precision) + 't'
        break
      }
      default: {
        result = 0
      }
    }
    return result
  }
}
