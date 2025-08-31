import {
  Box, FormControl, InputLabel, Select, MenuItem, Paper, Stack
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';
import { ProductionFilter, ProductOption, ALL_PRODUCTS_VALUE, createDefaultFilter } from '../../types/filters';
import { productsService } from '../../services/products';

dayjs.locale('pt-br');

interface Props {
  filter: ProductionFilter;
  onFilterChange: (filter: ProductionFilter) => void;
}

export default function ProductionFilters({ filter, onFilterChange }: Props) {
  const [products, setProducts] = useState<ProductOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await productsService.getActiveProducts();
        setProducts(productsData.map(p => ({ id: p.id, name: p.name })));
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleProductChange = (productId: string) => {
    onFilterChange({
      ...filter,
      productId
    });
  };

  const handleStartDateChange = (date: Dayjs | null) => {
    onFilterChange({
      ...filter,
      startDate: date ? date.format('YYYY-MM-DD') : null
    });
  };

  const handleEndDateChange = (date: Dayjs | null) => {
    onFilterChange({
      ...filter,
      endDate: date ? date.format('YYYY-MM-DD') : null
    });
  };

  return (
    <Paper sx={{ p: 2, mb: 2, borderRadius: 2 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
          {/* Filtro por produto */}
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel id="product-filter-label">Produto</InputLabel>
            <Select
              labelId="product-filter-label"
              label="Produto"
              value={filter.productId}
              onChange={(e) => handleProductChange(e.target.value)}
              disabled={isLoading}
            >
              <MenuItem value={ALL_PRODUCTS_VALUE}>Todos os Produtos</MenuItem>
              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Data inicial */}
          <DatePicker
            label="Data Inicial"
            value={filter.startDate ? dayjs(filter.startDate) : null}
            onChange={handleStartDateChange}
            slotProps={{ 
              textField: { 
                size: 'small',
                sx: { minWidth: 140 }
              } 
            }}
            format="DD/MM/YYYY"
          />

          {/* Data final */}
          <DatePicker
            label="Data Final"
            value={filter.endDate ? dayjs(filter.endDate) : null}
            onChange={handleEndDateChange}
            slotProps={{ 
              textField: { 
                size: 'small',
                sx: { minWidth: 140 }
              } 
            }}
            format="DD/MM/YYYY"
          />
        </Stack>
      </LocalizationProvider>
    </Paper>
  );
}