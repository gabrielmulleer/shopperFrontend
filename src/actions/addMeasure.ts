import { UploadMeasure } from '@/types/types'

interface UploadPayload {
  image: string
  customer_code: string
  measure_datetime: Date
  measure_type: 'WATER' | 'GAS'
}

export async function uploadMeasurement(
  data: UploadPayload,
): Promise<UploadMeasure> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  const response = await fetch(`${backendUrl}/api/measures/upload`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`Failed to upload: ${response.statusText}`)
  }

  return response.json()
}
