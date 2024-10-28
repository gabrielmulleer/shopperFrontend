import { Measure } from '@/types/types'

interface ChartDataPoint {
  month: string
  water: number
  gas: number
}

export function processChartData(measures: Measure[]): ChartDataPoint[] {
  if (!Array.isArray(measures)) {
    console.error('Expected measures to be an array, but received:', measures)
    return []
  }

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const aggregatedData: { [key: string]: { water: number; gas: number } } = {}

  measures.forEach((measure) => {
    const date = new Date(measure.measure_datetime)
    const monthYear = `${monthNames[date.getMonth()]} ${date.getFullYear()}`
    if (!aggregatedData[monthYear]) {
      aggregatedData[monthYear] = { water: 0, gas: 0 }
    }

    if (measure.measure_type === 'WATER') {
      aggregatedData[monthYear].water = measure.measure_value
    } else if (measure.measure_type === 'GAS') {
      aggregatedData[monthYear].gas = measure.measure_value
    }
  })

  return Object.entries(aggregatedData)
    .map(([month, counts]) => ({ month, ...counts }))
    .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
}
