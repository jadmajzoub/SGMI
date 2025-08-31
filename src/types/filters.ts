export interface ProductionFilter {
  productId: string;
  startDate: string | null;
  endDate: string | null;
}

export interface ProductOption {
  id: string;
  name: string;
}

export const ALL_PRODUCTS_VALUE = '__ALL__';
export const DEFAULT_DAYS_RANGE = 7;

// Helper to get default date range (last 7 days to today)
export const getDefaultDateRange = () => {
  const today = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - DEFAULT_DAYS_RANGE);
  
  return {
    startDate: lastWeek.toISOString().split('T')[0],
    endDate: today.toISOString().split('T')[0]
  };
};

// Helper to create default filter
export const createDefaultFilter = (): ProductionFilter => {
  const { startDate, endDate } = getDefaultDateRange();
  return {
    productId: ALL_PRODUCTS_VALUE,
    startDate,
    endDate
  };
};