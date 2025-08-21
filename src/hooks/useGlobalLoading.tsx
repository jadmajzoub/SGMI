import { useState, useCallback, useContext, createContext, ReactNode } from 'react'

interface GlobalLoadingContextType {
  isLoading: boolean
  loadingText: string
  showLoading: (text?: string) => void
  hideLoading: () => void
  withLoading: (fn: () => Promise<any>, text?: string) => Promise<any>
}

const DEFAULT_LOADING_TEXT = 'Carregando...'

const GlobalLoadingContext = createContext<GlobalLoadingContextType | undefined>(undefined)

interface GlobalLoadingProviderProps {
  children: ReactNode
}

export function GlobalLoadingProvider({ children }: GlobalLoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingText, setLoadingText] = useState(DEFAULT_LOADING_TEXT)

  const showLoading = useCallback((text: string = DEFAULT_LOADING_TEXT) => {
    setLoadingText(text)
    setIsLoading(true)
  }, [])

  const hideLoading = useCallback(() => {
    setIsLoading(false)
    setLoadingText(DEFAULT_LOADING_TEXT)
  }, [])

  const withLoading = useCallback(async (
    fn: () => Promise<any>, 
    text?: string
  ) => {
    try {
      showLoading(text || DEFAULT_LOADING_TEXT)
      const result = await fn()
      return result
    } finally {
      hideLoading()
    }
  }, [showLoading, hideLoading])

  return (
    <GlobalLoadingContext.Provider 
      value={{ 
        isLoading, 
        loadingText, 
        showLoading, 
        hideLoading, 
        withLoading 
      }}
    >
      {children}
    </GlobalLoadingContext.Provider>
  )
}

export default function useGlobalLoading(): GlobalLoadingContextType {
  const context = useContext(GlobalLoadingContext)
  
  if (!context) {
    throw new Error('useGlobalLoading deve ser usado dentro de um GlobalLoadingProvider')
  }
  
  return context
}