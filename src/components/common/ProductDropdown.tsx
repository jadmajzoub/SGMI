import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useState, useEffect } from 'react'
import { Product, productsService } from '../../services/products'

interface Props {
  label: string
  value: string
  onChange: (value: string) => void
  hasError?: boolean
  errorMessage?: string
  disabled?: boolean
  fullWidth?: boolean
  onClearError?: () => void
}

export default function ProductDropdown({ 
  label, 
  value, 
  onChange, 
  hasError = false, 
  errorMessage, 
  disabled = false, 
  fullWidth = false,
  onClearError 
}: Props) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        setLoadError(null)
        const activeProducts = await productsService.getActiveProducts()
        setProducts(activeProducts)
      } catch (error) {
        console.error('Erro ao carregar produtos:', error)
        setLoadError('Erro ao carregar produtos')
        setProducts([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value
    onChange(selectedValue)
    if (onClearError) {
      onClearError()
    }
  }

  return (
    <FormControl 
      fullWidth={fullWidth} 
      error={hasError || !!loadError}
      disabled={disabled || isLoading}
    >
      <InputLabel id="product-select-label">{label}</InputLabel>
      <Select
        labelId="product-select-label"
        id="product-select"
        value={value}
        label={label}
        onChange={handleChange}
        displayEmpty
      >
        {isLoading ? (
          <MenuItem disabled>
            Carregando produtos...
          </MenuItem>
        ) : loadError ? (
          <MenuItem disabled>
            {loadError}
          </MenuItem>
        ) : products.length === 0 ? (
          <MenuItem disabled>
            Nenhum produto disponível
          </MenuItem>
        ) : (
          products.map((product) => (
            <MenuItem key={product.id} value={product.id}>
              {product.name}
            </MenuItem>
          ))
        )}
      </Select>
      {(hasError && errorMessage) && (
        <FormHelperText error>
          {errorMessage}
        </FormHelperText>
      )}
      {loadError && (
        <FormHelperText error>
          {loadError}
        </FormHelperText>
      )}
    </FormControl>
  )
}