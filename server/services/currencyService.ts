import { calculateConversion } from '../utils/convert'
const FRANKFURTER_API = process.env.FRANKFURTER_API || 'https://api.frankfurter.app/latest'

export const convert = async (from: string, to: string, amount: number): Promise<{ amount: number }> => {
  try {
    const { rate } = await fetchRate(from,to)
    const result = calculateConversion(amount,rate)
    return { amount: result }
  } catch (error) {
    throw Error(error instanceof Error ? error.message : 'Error calculating conversion.')
  }
}


const fetchRate = async(from: string, to:string): Promise<{ rate: number }> => {
  const response = await fetch(`${FRANKFURTER_API}?from=${from}&to=${to}`);

  if (!response.ok) {
    throw new Error('Error retrieving exchange rate.')
  }

  const data = await response.json()
  const rate = data.rates?.[to] // Use to parameter to get required rate using bracket syntax since to is as string. 
  if (typeof rate !== 'number') throw Error("Exchange rate is not a number.")
  
  return { rate: rate}
}