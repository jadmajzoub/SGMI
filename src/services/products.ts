import { api } from './api';
import { ProductType } from '../types/production';

// Types for product data
export interface Product {
  id: string;
  name: string;
  unit: 'KG' | 'UN';
  type: ProductType;
  active: boolean;
  createdAt: string;
}

export interface CreateProductionPlanData {
  productId: string;
  plannedQuantity: number;
  shift: 'MORNING' | 'AFTERNOON' | 'NIGHT';
  plannedDate: string; // ISO date string
}

// Products API service
export const productsService = {
  // Get all active products for dropdown
  getActiveProducts: async (): Promise<Product[]> => {
    try {
      const response = await api.get('/products');
      return response.data.data.filter((product: Product) => product.active);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw new Error('Erro ao carregar produtos');
    }
  },

  // Get all products (including inactive)
  getAllProducts: async (): Promise<Product[]> => {
    try {
      const response = await api.get('/products?include_inactive=true');
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch all products:', error);
      throw new Error('Erro ao carregar todos os produtos');
    }
  },

  // Create a production plan
  createProductionPlan: async (data: CreateProductionPlanData): Promise<{ id: string }> => {
    try {
      const response = await api.post('/director/production-plans', {
        product_id: data.productId,
        planned_quantity: data.plannedQuantity,
        shift: data.shift,
        planned_date: data.plannedDate,
      });
      return response.data.data;
    } catch (error) {
      console.error('Failed to create production plan:', error);
      throw new Error('Erro ao criar plano de produção');
    }
  },
};