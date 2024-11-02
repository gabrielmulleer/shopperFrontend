'use server'

import { Measure } from '@/types/types'

type GetCustomerMeasuresParams = {
  customerCode: string
  measureType?: 'WATER' | 'GAS'
}
type MeasureResponse = {
  customer_code: string
  measures: Measure[]
}

// Definindo o tipo para a resposta da API (ajuste conforme necessário)

export default async function getMeasures({
  customerCode,
  measureType,
}: GetCustomerMeasuresParams): Promise<MeasureResponse> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  const response = await fetch(
    `${backendUrl}/api/measures/${customerCode}/list${
      measureType ? `?measure_type=${measureType}` : ''
    }`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 0 }, // Desabilita o cache do Next.js
    },
  )

  if (!response.ok) {
    throw new Error(`Failed to get measures: ${response.statusText}`)
  }
  return response.json()
}
