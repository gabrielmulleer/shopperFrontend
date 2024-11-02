export type UploadMeasure = {
  image_url: string
  measure_value: number
  measure_uuid: string
}
export type Measure = {
  measure_uuid: string
  measure_type: 'WATER' | 'GAS'
  measure_datetime: Date
  has_confirmed: boolean
  image_url: string
  measure_value: number
}
