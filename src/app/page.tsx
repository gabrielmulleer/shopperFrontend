import { ChartMeasurement } from '@/components/chart/chart-measurement'

export default async function Home() {
  // const measures = await getMeasures({
  //   customerCode: '1',
  // })

  return (
    <div className="min-h-dvh flex items-center justify-center">
      <ChartMeasurement customerCode="1" />
    </div>
  )
}
