interface UploadPayload {
  image: string
  customer_code: string
  measure_datetime: Date
  measure_type: 'WATER' | 'GAS'
}

export async function uploadMeasurement(
  data: UploadPayload,
): Promise<Response> {
  const response = await fetch('http://localhost:8080/api/measures/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`Failed to upload: ${response.statusText}`)
  }

  return response
}
