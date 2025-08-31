import { ALL_PRODUCTS_VALUE, ProductionFilter } from '../types/filters';
import { api } from './api';

// Types for chart data
export interface DailyProductionChart {
  date: string;
  kg: number;
}

export interface ProductShareChart {
  name: string;
  value: number;
}

export interface TrendChart {
  day: string;
  kg: number;
}

export interface TableRow {
  date: string;
  shift: 'Manhã' | 'Tarde' | 'Noite';
  product: string;
  batches: number;
  approxKg: number;
}

export interface ProductionMetrics {
  totalKg: number;
  totalBatches: number;
  minutesProduced: number;
  kgPerBatch: number;
}

export interface DateRange {
  from?: string;
  to?: string;
}

// Helper to build query params from filter
const buildFilterParams = (filter: ProductionFilter): URLSearchParams => {
  const params = new URLSearchParams();
  
  // Convert YYYY-MM-DD to ISO datetime format for backend validation
  if (filter.startDate) {
    const startDateTime = `${filter.startDate}T00:00:00Z`;
    params.append('from', startDateTime);
  }
  if (filter.endDate) {
    const endDateTime = `${filter.endDate}T23:59:59Z`;
    params.append('to', endDateTime);
  }
  if (filter.productId && filter.productId !== ALL_PRODUCTS_VALUE) {
    params.append('product_id', filter.productId);
  }
  
  return params;
};

// Charts API service
export const chartService = {
  // Get daily production data for bar chart
  getDailyProduction: async (filter: ProductionFilter): Promise<DailyProductionChart[]> => {
    try {
      const params = buildFilterParams(filter);
      
      const response = await api.get(`/director/reports/daily-trend?${params}`);
      
      // Transform the backend response to match chart interface
      return response.data.data.map((item: any) => ({
        date: new Date(item.date).toISOString().split('T')[0],
        kg: Number(item.total_estimated_kg) || 0,
      }));
    } catch (error) {
      console.error('Failed to fetch daily production data:', error);
      throw error;
    }
  },

  // Get product share data for pie chart
  getProductShare: async (filter: ProductionFilter): Promise<ProductShareChart[]> => {
    try {
      const params = buildFilterParams(filter);
      
      const response = await api.get(`/director/production-totals?${params}`);
      
      // Transform the backend response to pie chart format
      const totals = response.data.data;
      const totalSum = totals.reduce((sum: number, item: any) => sum + Number(item.total_produced || item.total_planned || 0), 0);
      
      return totals.map((item: any) => ({
        name: item.product_name,
        value: Math.round(((Number(item.total_produced || item.total_planned || 0) / totalSum) * 100)),
      })).filter((item: any) => item.value > 0);
    } catch (error) {
      console.error('Failed to fetch product share data:', error);
      throw error;
    }
  },

  // Get trend data for line chart
  getTrend: async (filter: ProductionFilter): Promise<TrendChart[]> => {
    try {
      const params = buildFilterParams(filter);
      
      const response = await api.get(`/director/reports/daily-trend?${params}`);
      
      // Transform the backend response to trend chart format
      return response.data.data.map((item: any) => ({
        day: new Date(item.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        kg: Number(item.total_estimated_kg) || 0,
      }));
    } catch (error) {
      console.error('Failed to fetch trend data:', error);
      throw error;
    }
  },

  // Get table data
  getTableData: async (filter: ProductionFilter): Promise<TableRow[]> => {
    try {
      const params = buildFilterParams(filter);
      
      const response = await api.get(`/director/reports/production?${params}`);
      
      // Transform the backend response to table format
      return response.data.data.map((item: any) => ({
        date: new Date(item.date).toLocaleDateString('pt-BR'),
        shift: (item.shift === 'MORNING' ? 'Manhã' : 
               item.shift === 'AFTERNOON' ? 'Tarde' : 'Noite') as 'Manhã' | 'Tarde' | 'Noite',
        product: item.product_name,
        batches: Number(item.batches_count) || 0,
        approxKg: Number(item.estimated_kg) || 0,
      }));
    } catch (error) {
      console.error('Failed to fetch table data:', error);
      throw error;
    }
  },

  // Get production metrics/KPIs
  getMetrics: async (filter: ProductionFilter): Promise<ProductionMetrics> => {
    try {
      const params = buildFilterParams(filter);
      
      const response = await api.get(`/director/reports/summary?${params}`);
      const data = response.data.data;
      
      return {
        totalKg: Number(data.total_estimated_kg) || 0,
        totalBatches: Number(data.total_batches) || 0,
        minutesProduced: Number(data.total_production_minutes) || 0,
        kgPerBatch: Math.round((Number(data.total_estimated_kg) || 0) / Math.max(Number(data.total_batches) || 1, 1)),
      };
    } catch (error) {
      console.error('Failed to fetch production metrics:', error);
      throw error;
    }
  },
};
