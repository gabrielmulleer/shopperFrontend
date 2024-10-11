import { revalidatePath } from 'next/cache'

interface ConfirmPayload {
  measure_uuid: string
  confirmed_value: number
}
export default async function confirmMeasure(
  data: ConfirmPayload,
): Promise<Response> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  const response = await fetch(`${backendUrl}/api/measures/confirm`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`Failed to confirm: ${response.statusText}`)
  }
  revalidatePath('/')
  return response
}
