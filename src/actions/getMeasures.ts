'use server'
import { revalidatePath } from 'next/cache'

type GetCustomerMeasuresParams = {
  customerCode: string
  measureType?: 'WATER' | 'GAS'
}

// Definindo o tipo para a resposta da API (ajuste conforme necessário)
export type Measure = {
  measure_uuid: string
  measure_type: 'WATER' | 'GAS'
  measure_datetime: Date
  has_confirmed: boolean
  image_url: string
  measure_value: number
}
export default async function getMeasures({
  customerCode,
  measureType,
}: GetCustomerMeasuresParams): Promise<Measure[]> {
  const response = await fetch(
    `http://localhost:8080/api/measures/${customerCode}/list${
      measureType ? `?measure_type=${measureType}` : ''
    }`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store', // Desabilita o cache
      },
    },
  )

  if (!response.ok) {
    throw new Error(`Failed to get measures: ${response.statusText}`)
  }
  revalidatePath('/')
  return response.json()
}
