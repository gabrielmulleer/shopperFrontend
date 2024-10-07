interface Measure {
  measure_datetime: Date
  measure_type: 'WATER' | 'GAS'
  has_confirmed: boolean
  image_url: string
  measure_uuid: string
  measure_value: number
}

interface ChartDataPoint {
  month: string
  water: number
  gas: number
}

export function processChartData(measures: Measure[]): ChartDataPoint[] {
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
  // Inicializa o objeto para armazenar os dados agregados
  const aggregatedData: { [key: string]: { water: number; gas: number } } = {}

  // Processa cada medida
  measures.forEach((measure) => {
    const date = new Date(measure.measure_datetime)
    const monthYear = `${monthNames[date.getMonth()]} ${date.getFullYear()}`
    if (!aggregatedData[monthYear]) {
      aggregatedData[monthYear] = { water: 0, gas: 0 }
    }

    // Incrementa o contador para o tipo de medida
    if (measure.measure_type === 'WATER') {
      aggregatedData[monthYear].water = measure.measure_value
    } else if (measure.measure_type === 'GAS') {
      aggregatedData[monthYear].gas = measure.measure_value
    }
  })

  // Converte o objeto agregado em um array de ChartDataPoint

  return Object.entries(aggregatedData)
    .map(([month, counts]) => ({ month, ...counts }))
    .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
}
