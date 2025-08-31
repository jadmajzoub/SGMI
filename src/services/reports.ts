import { api } from './api';

// Types for report data
export interface DailyProductionData {
  date: string;
  kg: number;
}

export interface ProductShareData {
  name: string;
  value: number;
}

export interface ProductionTableRow {
  date: string;
  shift: string;
  product: string;
  batches: number;
  approxKg: number;
}

export interface ProductionMetrics {
  totalKg: number;
  totalBatches: number;
  avgKgPerBatch: number;
  productionDays: number;
}

// Report API service
export const reportService = {
  // Get production metrics
  getMetrics: async (dateFrom?: string, dateTo?: string): Promise<ProductionMetrics> => {
    try {
      const params = new URLSearchParams();
      if (dateFrom) params.append('dateFrom', dateFrom);
      if (dateTo) params.append('dateTo', dateTo);
      
      const response = await api.get(`/director/reports/production?${params}`);
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch production metrics:', error);
      throw error;
    }
  },

  // Get daily production data for charts
  getDailyProduction: async (dateFrom?: string, dateTo?: string): Promise<DailyProductionData[]> => {
    try {
      const params = new URLSearchParams();
      if (dateFrom) params.append('dateFrom', dateFrom);
      if (dateTo) params.append('dateTo', dateTo);
      
      const response = await api.get(`/director/reports/production/daily?${params}`);
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch daily production data:', error);
      throw error;
    }
  },

  // Get product share data for pie chart
  getProductShare: async (dateFrom?: string, dateTo?: string): Promise<ProductShareData[]> => {
    try {
      const params = new URLSearchParams();
      if (dateFrom) params.append('dateFrom', dateFrom);
      if (dateTo) params.append('dateTo', dateTo);
      
      const response = await api.get(`/director/reports/production/products?${params}`);
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch product share data:', error);
      throw error;
    }
  },

  // Get production table data
  getProductionTable: async (dateFrom?: string, dateTo?: string): Promise<ProductionTableRow[]> => {
    try {
      const params = new URLSearchParams();
      if (dateFrom) params.append('dateFrom', dateFrom);
      if (dateTo) params.append('dateTo', dateTo);
      
      const response = await api.get(`/director/reports/production/table?${params}`);
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch production table data:', error);
      throw error;
    }
  }
};