/**
 * Shared Portfolio Types
 * 
 * Centralized type definitions for Portfolio-related data structures.
 * Used across dashboard and portfolio pages.
 */

/**
 * Portfolio entity from database
 */
export interface Portfolio {
  id: string;
  image_url: string;
  description: string;
  badge: string;
  hyperlink?: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Form data for creating/editing portfolios
 */
export interface PortfolioForm {
  id: string | null;
  image_url: string;
  description: string;
  badge: string;
  hyperlink: string;
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
 * Create empty portfolio form
 */
export function createEmptyPortfolioForm(): PortfolioForm {
  return {
    id: null,
    image_url: '',
    description: '',
    badge: '',
    hyperlink: ''
  };
}

/**
 * Convert Portfolio to PortfolioForm for editing
 */
export function portfolioToForm(portfolio: Portfolio): PortfolioForm {
  return {
    id: portfolio.id,
    image_url: portfolio.image_url || '',
    description: portfolio.description || '',
    badge: portfolio.badge || '',
    hyperlink: portfolio.hyperlink || ''
  };
}
