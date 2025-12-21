export interface Carousel {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  order: number;
  is_active: boolean;
  created_at: number;
  updated_at: number;
}

export interface CarouselForm {
  id?: string;
  title: string;
  description: string;
  image_url: string;
  order: number;
  is_active: boolean;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export function createEmptyCarouselForm(): CarouselForm {
  return {
    title: '',
    description: '',
    image_url: '',
    order: 0,
    is_active: true,
  };
}

export function carouselToForm(carousel: Carousel): CarouselForm {
  return {
    id: carousel.id,
    title: carousel.title,
    description: carousel.description || '',
    image_url: carousel.image_url,
    order: carousel.order,
    is_active: carousel.is_active,
  };
}
