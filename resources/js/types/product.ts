/**
 * Shared Product Types
 * 
 * Centralized type definitions for Product-related data structures.
 * Used across dashboard and product pages.
 */

/**
 * Product entity from database
 */
export interface Product {
  id: string;
  image_url: string;
  description: string;
  hyperlink?: string;
  type: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Form data for creating/editing products
 */
export interface ProductForm {
  id: string | null;
  image_url: string;
  description: string;
  hyperlink: string;
  type: string;
}

/**
 * Pagination metadata from backend
 */
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * Product type options
 */
export const PRODUCT_TYPES = [
  { value: 'software', label: 'Software' },
  { value: 'service', label: 'Service' },
  { value: 'hardware', label: 'Hardware' },
  { value: 'saas', label: 'SaaS' },
  { value: 'other', label: 'Lainnya' },
] as const;

/**
 * Create empty product form
 */
export function createEmptyProductForm(): ProductForm {
  return {
    id: null,
    image_url: '',
    description: '',
    hyperlink: '',
    type: 'software'
  };
}

/**
 * Convert Product to ProductForm for editing
 */
export function productToForm(product: Product): ProductForm {
  return {
    id: product.id,
    image_url: product.image_url || '',
    description: product.description || '',
    hyperlink: product.hyperlink || '',
    type: product.type || 'software'
  };
}
