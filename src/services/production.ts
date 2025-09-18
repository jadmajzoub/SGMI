import { api } from './api';

// Types for production data
export interface ProductionTotal {
  product: string;
  totalKg: number;
}

export interface ProductionReport {
  date: string;
  shift: 'Manhã' | 'Tarde' | 'Noite';
  product: string;
  batches: number;
  totalKg: number;
  duration: number;
}

export interface DateRange {
  from?: string;
  to?: string;
}

// Production API service
export const productionService = {
  // Get production totals from production plans (planned quantities)
  getTotals: async (filters?: DateRange): Promise<ProductionTotal[]> => {
    try {
      const params = new URLSearchParams();
      if (filters?.from) params.append('from', filters.from);
      if (filters?.to) params.append('to', filters.to);
      
      const response = await api.get(`/director/production-totals?${params}`);
      
      // Transform the backend response to match frontend interface
      return response.data.data.map((item: any) => ({
        product: item.product_name,
        totalKg: Number(item.total_planned) || 0,
      }));
    } catch (error) {
      console.error('Failed to fetch production totals:', error);
      throw new Error('Erro ao carregar totais de produção');
    }
  },

  // Get production reports
  getReports: async (filters?: DateRange): Promise<ProductionReport[]> => {
    try {
      const params = new URLSearchParams();
      if (filters?.from) params.append('from', filters.from);
      if (filters?.to) params.append('to', filters.to);
      
      const response = await api.get(`/director/reports/production?${params}`);
      
      // Transform the backend response to match frontend interface
      return response.data.data.map((item: any) => ({
        date: new Date(item.planned_date).toLocaleDateString('pt-BR'),
        shift: (item.shift === 'MORNING' ? 'Manhã' : 
               item.shift === 'AFTERNOON' ? 'Tarde' : 'Noite') as 'Manhã' | 'Tarde' | 'Noite',
        product: item.product_name,
        batches: Number(item.total_batches) || 0,
        totalKg: Number(item.total_produced) || 0,
      }));
    } catch (error) {
      console.error('Failed to fetch production reports:', error);
      throw new Error('Erro ao carregar relatórios de produção');
    }
  },

  // Get production sessions from production entries (for second tab)
  getSessions: async (filters?: DateRange): Promise<ProductionReport[]> => {
    try {
      const params = new URLSearchParams();
      if (filters?.from) params.append('from', filters.from);
      if (filters?.to) params.append('to', filters.to);

      const response = await api.get(`/production/sessions?${params}`);

      // Transform the backend response to match frontend interface
      return response.data.data.map((item: any) => {
        console.log(item)
        return {
          date: item.date,
          shift: item.shift as 'Manhã' | 'Tarde' | 'Noite',
          product: item.product,
          batches: Number(item.batches) || 0,
          totalKg: Number(item.totalKg) || 0,
          duration: item.duration
        }
        
      });
    } catch (error) {
      console.error('Failed to fetch production sessions:', error);
      throw new Error('Erro ao carregar sessões de produção');
    }
  },
};