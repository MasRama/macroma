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
  name: string;
  tagline: string;
  desc: string;
  badge: string;
  image_url: string;
  hyperlink?: string;
  type: string;
  is_featured: boolean;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Form data for creating/editing products
 */
export interface ProductForm {
  id: string | null;
  name: string;
  tagline: string;
  desc: string;
  badge: string;
  image_url: string;
  hyperlink: string;
  type: string;
  is_featured: boolean;
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
    name: '',
    tagline: '',
    desc: '',
    badge: '',
    image_url: '',
    hyperlink: '',
    type: 'software',
    is_featured: false
  };
}

/**
 * Convert Product to ProductForm for editing
 */
export function productToForm(product: Product): ProductForm {
  return {
    id: product.id,
    name: product.name || '',
    tagline: product.tagline || '',
    desc: product.desc || '',
    badge: product.badge || '',
    image_url: product.image_url || '',
    hyperlink: product.hyperlink || '',
    type: product.type || 'software',
    is_featured: product.is_featured || false
  };
}
