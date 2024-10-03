interface ConfirmPayload {
  measure_uuid: string
  confirmed_value: number
}
export default async function confirmMeasure(
  data: ConfirmPayload,
): Promise<Response> {
  const response = await fetch('http://localhost:8080/api/measures/confirm', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`Failed to confirm: ${response.statusText}`)
  }

  return response
}
