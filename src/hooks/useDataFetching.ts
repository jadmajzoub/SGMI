import { useState, useEffect, useCallback } from 'react'

interface UseDataFetchingProps<T> {
  fetchFn: () => Promise<T>
  dependencies?: any[]
  delay?: number
}

interface UseDataFetchingReturn<T> {
  data: T | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

const DEFAULT_FETCH_DELAY_MS = 1500

export default function useDataFetching<T>({
  fetchFn,
  dependencies = [],
  delay = DEFAULT_FETCH_DELAY_MS
}: UseDataFetchingProps<T>): UseDataFetchingReturn<T> {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Simulate network delay for better UX demonstration
      await new Promise(resolve => setTimeout(resolve, delay))
      
      const result = await fetchFn()
      setData(result)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar dados'
      setError(errorMessage)
      console.error('Data fetching error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [fetchFn, delay])

  useEffect(() => {
    fetchData()
  }, [...dependencies, fetchData])

  const refetch = useCallback(async () => {
    await fetchData()
  }, [fetchData])

  return {
    data,
    isLoading,
    error,
    refetch
  }
}