export function kelvinToFahrenheit(kelvin: number) {
  return ((kelvin - 273.15) * (9 / 5) + 32).toFixed(2);
}
