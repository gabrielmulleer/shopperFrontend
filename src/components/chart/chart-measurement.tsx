'use client'

import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

import { MeasureModal } from '../measure-modal/measure-modal'
import { ChartDataPoint, processChartData } from '@/actions/processChartData'
import { useEffect } from 'react'
import { useMeterStore } from '@/store/meterState'
import getMeasures from '@/actions/getMeasures'
import { Measure } from '@/types/types'

export const description = 'A multiple bar chart'

const chartConfig = {
  water: {
    label: 'WATER',
    color: 'hsl(var(--chart-1))',
  },
  gas: {
    label: 'GAS',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

interface ChartMeasurementProps {
  customerCode: string
  measures: Measure[]
}

export function ChartMeasurement({
  customerCode,
  measures,
}: ChartMeasurementProps) {
  const { readings, fetchReadings } = useMeterStore()

  useEffect(() => {
    console.log('Verificando leituras no estado:', readings)

    if (!readings || readings.customer_code !== customerCode) {
      console.log('Nenhuma leitura, fazendo fetchReadings...')
      fetchReadings(customerCode)
    }
  }, [fetchReadings, readings, customerCode])

  let chartData: ChartDataPoint[] = []

  if (customerCode === readings?.customer_code) {
    chartData = readings?.measures ? processChartData(readings.measures) : []
  }
  // const chartData = processChartData(measures)

  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center">
        <div>
          <CardTitle>Bar Chart - Multiple</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </div>
        <MeasureModal />
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="water" fill="var(--color-water)" radius={4} />
            <Bar dataKey="gas" fill="var(--color-gas)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
