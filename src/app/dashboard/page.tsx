'use client'
import { useEffect, useState } from 'react'
import getMeasures from '@/actions/getMeasures'
import { ChartMeasurement } from '@/components/chart/chart-measurement'
import { Measure } from '@/types/types'

export default function Home() {
  const [customerCode, setCustomerCode] = useState('defaultCustomerCode')
  const [measures, setMeasures] = useState<Measure[]>([])

  useEffect(() => {
    const storedCustomerCode =
      localStorage.getItem('username') || 'defaultCustomerCode'
    setCustomerCode(storedCustomerCode)

    // async function fetchMeasures() {
    //   const { measures } = await getMeasures({
    //     customerCode: storedCustomerCode,
    //   })
    //   setMeasures(measures)
    // }

    // fetchMeasures()
  }, [])

  return (
    <div className="min-h-dvh flex items-center justify-center">
      <ChartMeasurement customerCode={customerCode} measures={measures} />
    </div>
  )
}
