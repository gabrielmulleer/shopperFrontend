'use client'
import Image from 'next/image'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
type UploadMeasure = {
  image_url: string
  measure_value: number
  measure_uuid: string
}
interface ConfirmMeasureFormProps {
  data: UploadMeasure
}
export default function ConfirmMeasureForm({ data }: ConfirmMeasureFormProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div>Measure Image</div>
        <Image
          src={data.image_url}
          width={240}
          height={240}
          alt="Measurement image"
          className="self-center"
        />
      </div>
      <div>
        <label htmlFor="measure_value">Measure Readed</label>
        <Input
          id="measure_value"
          type="number"
          value={data.measure_value}
          disabled
        />
      </div>
      <div>
        <label htmlFor="confirmed_value">Confirm Measure</label>
        <Input id="confirmed_value" type="number" />
      </div>
      <Button className="self-end">Confirm</Button>
    </div>
  )
}
