import getMeasures from '@/actions/getMeasures'
import { Measure } from '@/types/types'
import { create } from 'zustand'

interface ReadingData {
  customer_code: string
  measures: Measure[]
}

interface MeterState {
  readings: ReadingData | null
  setReadings: (readings: ReadingData) => void
  fetchReadings: (customerCode: string) => Promise<void>
  updateReading: (id: string, confirmedValue: number) => void
}

export const useMeterStore = create<MeterState>((set) => ({
  readings: null, // Inicializamos com null ou um objeto vazio

  setReadings: (readings) => set({ readings }),

  fetchReadings: async (customerCode: string) => {
    const { customer_code, measures } = await getMeasures({ customerCode })

    set({
      readings: { customer_code, measures },
    })
  },

  updateReading: (id: string, confirmedValue: number) =>
    set((state) => ({
      readings: state.readings
        ? {
            ...state.readings,
            measures: state.readings.measures.map((reading) =>
              reading.measure_uuid === id
                ? { ...reading, confirmed_value: confirmedValue }
                : reading,
            ),
          }
        : null,
    })),
}))
