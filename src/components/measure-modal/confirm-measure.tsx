'use client'
import Image from 'next/image'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Label } from '../ui/label'
import confirmMeasure from '@/actions/confirmMeasure'
type UploadMeasure = {
  image_url: string
  measure_value: number
  measure_uuid: string
}
interface ConfirmMeasureFormProps {
  data: UploadMeasure
}
const formSchema = z.object({
  measure_uuid: z.string(),
  confirmed_value: z.coerce.number().refine(
    (value) => {
      return Number.isInteger(value * 1000)
    },
    {
      message: 'O número deve ter no máximo 3 casas decimais.',
    },
  ),
})
export default function ConfirmMeasureForm({ data }: ConfirmMeasureFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      measure_uuid: data.measure_uuid,
      confirmed_value: data.measure_value,
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await confirmMeasure(data)
      // logica para salvar as informações usando zustand/redux
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col"
      >
        <div className="flex flex-col gap-2">
          <Label className="self-start">Measure Image</Label>
          <Image
            src={data.image_url}
            alt="Image of measure"
            width={200}
            height={200}
            className="self-center"
          />
        </div>
        <FormField
          control={form.control}
          name="confirmed_value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Value</FormLabel>
              <FormControl>
                <Input {...field} type="number" placeholder="Confirmed value" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="self-end">
          Confirm
        </Button>
      </form>
    </Form>
  )
}
