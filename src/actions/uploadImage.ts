export async function convertImageToBase64(imageFile: File): Promise<string> {
  try {
    // Leitura da imagem em base64
    const buffer = await imageFile.arrayBuffer()
    const base64String = Buffer.from(buffer).toString('base64')

    // Formatar o resultado como uma string base64
    const mimeType = imageFile.type
    return `data:${mimeType};base64,${base64String}`
  } catch {
    throw new Error('Error converting image to base64')
  }
}
