import { ALL_PRODUCTS_VALUE, ProductionFilter } from '../types/filters';
import { productionService } from './production';
import { productsService } from './products';

// Types for chart data (reusing from charts.ts)
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
  totalMinutes: number;
  kgPerBatch: number;
}

export interface DateRange {
  from?: string;
  to?: string;
}

// Helper to build date range from filter
const buildDateRange = (filter: ProductionFilter): DateRange => {
  const range: DateRange = {};

  if (filter.startDate) {
    range.from = `${filter.startDate}T00:00:00Z`;
  }
  if (filter.endDate) {
    range.to = `${filter.endDate}T23:59:59Z`;
  }

  return range;
};

// Helper to convert DD/MM/YYYY to YYYY-MM-DD for consistent sorting and comparison
const parsePortugueseDate = (dateStr: string): string => {
  const [day, month, year] = dateStr.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

// Helper to get product name from product ID
const getProductNameFromId = async (productId: string): Promise<string | null> => {
  try {
    const products = await productsService.getActiveProducts();
    const product = products.find(p => p.id === productId);
    return product ? product.name : null;
  } catch (error) {
    console.error('Failed to fetch products for filtering:', error);
    return null;
  }
};

// Session-based Charts API service - uses production sessions instead of production plans
export const sessionChartService = {
  // Get daily production data for bar chart
  getDailyProduction: async (filter: ProductionFilter): Promise<DailyProductionChart[]> => {
    try {
      const dateRange = buildDateRange(filter);
      const sessions = await productionService.getSessions(dateRange);

      // Filter by product if specified - convert product ID to name for comparison
      let filteredSessions = sessions;
      if (filter.productId && filter.productId !== ALL_PRODUCTS_VALUE) {
        const productName = await getProductNameFromId(filter.productId);
        if (productName) {
          filteredSessions = sessions.filter(session => session.product === productName);
        }
      }

      // Group by date and sum kg
      const dailyMap = new Map<string, number>();
      filteredSessions.forEach(session => {
        const date = parsePortugueseDate(session.date);
        const currentKg = dailyMap.get(date) || 0;
        dailyMap.set(date, currentKg + session.totalKg);
      });

      return Array.from(dailyMap.entries())
        .map(([date, kg]) => ({ date, kg }))
        .sort((a, b) => a.date.localeCompare(b.date));
    } catch (error) {
      console.error('Failed to fetch daily production data from sessions:', error);
      throw error;
    }
  },

  // Get product share data for pie chart
  getProductShare: async (filter: ProductionFilter): Promise<ProductShareChart[]> => {
    try {
      const dateRange = buildDateRange(filter);
      const sessions = await productionService.getSessions(dateRange);

      // Filter by product if specified - convert product ID to name for comparison
      let filteredSessions = sessions;
      if (filter.productId && filter.productId !== ALL_PRODUCTS_VALUE) {
        const productName = await getProductNameFromId(filter.productId);
        if (productName) {
          filteredSessions = sessions.filter(session => session.product === productName);
        }
      }

      // Group by product and sum kg
      const productMap = new Map<string, number>();
      filteredSessions.forEach(session => {
        const currentKg = productMap.get(session.product) || 0;
        productMap.set(session.product, currentKg + session.totalKg);
      });

      const totalSum = Array.from(productMap.values()).reduce((sum, kg) => sum + kg, 0);

      return Array.from(productMap.entries())
        .map(([name, kg]) => ({
          name,
          value: Math.round((kg / totalSum) * 100),
        }))
        .filter(item => item.value > 0)
        .sort((a, b) => b.value - a.value);
    } catch (error) {
      console.error('Failed to fetch product share data from sessions:', error);
      throw error;
    }
  },

  // Get trend data for line chart
  getTrend: async (filter: ProductionFilter): Promise<TrendChart[]> => {
    try {
      const dateRange = buildDateRange(filter);
      const sessions = await productionService.getSessions(dateRange);

      // Filter by product if specified - convert product ID to name for comparison
      let filteredSessions = sessions;
      if (filter.productId && filter.productId !== ALL_PRODUCTS_VALUE) {
        const productName = await getProductNameFromId(filter.productId);
        if (productName) {
          filteredSessions = sessions.filter(session => session.product === productName);
        }
      }

      // Group by date and sum kg
      const dailyMap = new Map<string, number>();
      filteredSessions.forEach(session => {
        const date = session.date;
        const currentKg = dailyMap.get(date) || 0;
        dailyMap.set(date, currentKg + session.totalKg);
      });

      return Array.from(dailyMap.entries())
        .map(([date, kg]) => ({
          day: date,
          kg
        }))
        .sort((a, b) => {
          // Sort by date using consistent date parsing
          const dateA = parsePortugueseDate(a.day);
          const dateB = parsePortugueseDate(b.day);
          return dateA.localeCompare(dateB);
        });
    } catch (error) {
      console.error('Failed to fetch trend data from sessions:', error);
      throw error;
    }
  },

  // Get table data
  getTableData: async (filter: ProductionFilter): Promise<TableRow[]> => {
    try {
      const dateRange = buildDateRange(filter);
      const sessions = await productionService.getSessions(dateRange);

      // Filter by product if specified - convert product ID to name for comparison
      let filteredSessions = sessions;
      if (filter.productId && filter.productId !== ALL_PRODUCTS_VALUE) {
        const productName = await getProductNameFromId(filter.productId);
        if (productName) {
          filteredSessions = sessions.filter(session => session.product === productName);
        }
      }

      return filteredSessions.map(session => ({
        date: session.date,
        shift: session.shift,
        product: session.product,
        batches: session.batches,
        approxKg: session.totalKg,
      }));
    } catch (error) {
      console.error('Failed to fetch table data from sessions:', error);
      throw error;
    }
  },

  // Get production metrics/KPIs
  getMetrics: async (filter: ProductionFilter): Promise<ProductionMetrics> => {
    try {
      const dateRange = buildDateRange(filter);
      const sessions = await productionService.getSessions(dateRange);

      // Filter by product if specified - convert product ID to name for comparison
      let filteredSessions = sessions;
      if (filter.productId && filter.productId !== ALL_PRODUCTS_VALUE) {
        const productName = await getProductNameFromId(filter.productId);
        if (productName) {
          filteredSessions = sessions.filter(session => session.product === productName);
        }
      }

      const totalKg = filteredSessions.reduce((sum, session) => sum + session.totalKg, 0);
      const totalBatches = filteredSessions.reduce((sum, session) => sum + session.batches, 0);
      const totalSeconds = filteredSessions.reduce((sum, session) => sum + session.duration, 0);
      const kgPerBatch = totalBatches > 0 ? Math.round(totalKg / totalBatches) : 0;
      const totalMinutes =  Math.floor(totalSeconds / 60);

      return {
        totalKg,
        totalBatches,
        totalMinutes,
        kgPerBatch,
      };
    } catch (error) {
      console.error('Failed to fetch production metrics from sessions:', error);
      throw error;
    }
  },
};