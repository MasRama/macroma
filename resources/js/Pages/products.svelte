<script lang="ts">
  import { fly } from 'svelte/transition';
  import { page as inertiaPage, router } from '@inertiajs/svelte';
  import Header from '../Components/Header.svelte';
  import ProductModal from '../Components/ProductModal.svelte';
  import Pagination from '../Components/Pagination.svelte';
  import axios from 'axios';
  import { api, Toast } from '../Components/helper';
  import type { Product, ProductForm, PaginationMeta } from '../types/product';
  import { createEmptyProductForm, productToForm, PRODUCT_TYPES } from '../types/product';
  import type { User } from '../types/user';

  export let products: Product[] = [];
  // Pagination meta from backend
  export let total: number = 0;
  export let page: number = 1;
  export let limit: number = 10;
  export let totalPages: number = 1;
  export let hasNext: boolean = false;
  export let hasPrev: boolean = false;
  export let search: string = '';
  export let typeFilter: string = '';

  const currentUser = $inertiaPage.props.user as User | undefined;

  // Build pagination meta object
  $: paginationMeta = { total, page, limit, totalPages, hasNext, hasPrev } as PaginationMeta;

  let showProductModal: boolean = false;
  let isSubmitting: boolean = false;
  let mode: 'create' | 'edit' = 'create';
  let form: ProductForm = createEmptyProductForm();

  function openCreateProduct(): void {
    mode = 'create';
    form = createEmptyProductForm();
    showProductModal = true;
  }

  function openEditProduct(productItem: Product): void {
    mode = 'edit';
    form = productToForm(productItem);
    showProductModal = true;
  }

  function closeProductModal(): void {
    showProductModal = false;
    form = createEmptyProductForm();
  }

  async function handleSubmit(event: CustomEvent<ProductForm>): Promise<void> {
    const formData = event.detail;
    if (!formData.name || !formData.tagline || !formData.desc || !formData.badge || !formData.image_url || !formData.type) {
      Toast('Semua field wajib diisi kecuali hyperlink', 'error');
      return;
    }

    isSubmitting = true;

    const payload = {
      name: formData.name,
      tagline: formData.tagline,
      desc: formData.desc,
      badge: formData.badge,
      image_url: formData.image_url,
      hyperlink: formData.hyperlink || null,
      type: formData.type,
      is_featured: formData.is_featured
    };

    const result = mode === 'create'
      ? await api(() => axios.post('/products', payload))
      : await api(() => axios.put(`/products/${formData.id}`, payload));

    if (result.success) {
      closeProductModal();
      router.visit('/products', { preserveScroll: true, preserveState: true });
    }

    isSubmitting = false;
  }

  async function deleteProduct(id: string): Promise<void> {
    if (!confirm('Yakin ingin menghapus produk ini?')) {
      return;
    }

    isSubmitting = true;

    const result = await api(() => axios.delete('/products', { data: { ids: [id] } }));

    if (result.success) {
      router.visit('/products', { preserveScroll: true, preserveState: true });
    }

    isSubmitting = false;
  }

  function getTypeLabel(type: string): string {
    const found = PRODUCT_TYPES.find(t => t.value === type);
    return found ? found.label : type;
  }

  function getTypeBadgeColor(type: string): string {
    switch (type) {
      case 'software': return 'bg-blue-500/15 text-blue-300 border-blue-500/20';
      case 'service': return 'bg-purple-500/15 text-purple-300 border-purple-500/20';
      case 'hardware': return 'bg-orange-500/15 text-orange-300 border-orange-500/20';
      case 'saas': return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/20';
      default: return 'bg-slate-500/15 text-slate-300 border-slate-500/20';
    }
  }
</script>

<Header group="products" />

<section class="min-h-[calc(100vh-5rem)] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
    <div class="flex items-center justify-between mb-6">
      <div>
        <p class="text-xs tracking-[0.35em] uppercase text-slate-400 mb-2">
          Products
        </p>
        <h1 class="text-2xl sm:text-3xl font-semibold tracking-tight leading-[1.25] mb-2">
          Manajemen Produk
        </h1>
        <p class="text-sm text-slate-300/90 max-w-xl">
          Kelola produk untuk ditampilkan di halaman publik.
        </p>
      </div>
      {#if currentUser && currentUser.is_admin}
        <button
          class="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-medium shadow-sm hover:shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
          on:click={openCreateProduct}
          disabled={isSubmitting}
        >
          Tambah produk
        </button>
      {/if}
    </div>

    <!-- Product Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {#if products && products.length}
        {#each products as productItem}
          <div 
            class="group rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden hover:border-slate-700 transition-colors"
            in:fly={{ y: 20, duration: 300 }}
          >
            <!-- Image -->
            <div class="aspect-video bg-slate-800 overflow-hidden relative">
              <img 
                src={productItem.image_url} 
                alt={productItem.name}
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                on:error={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/400x225?text=No+Image';
                }}
              />
              <!-- Type badge on image -->
              <span class="absolute top-2 right-2 px-2 py-1 rounded-full text-[10px] font-medium border {getTypeBadgeColor(productItem.type)}">
                {getTypeLabel(productItem.type)}
              </span>
            </div>
            
            <!-- Content -->
            <div class="p-4">
              <div class="flex items-start justify-between mb-2">
                <h3 class="text-base font-semibold text-slate-100">{productItem.name}</h3>
                <span class="px-2 py-0.5 rounded-full bg-blue-500/10 text-[10px] font-bold uppercase tracking-wider text-blue-400 border border-blue-500/20">
                  {productItem.badge}
                </span>
              </div>
              <p class="text-xs text-blue-400 font-medium uppercase tracking-wider mb-2">{productItem.tagline}</p>
              <p class="text-sm text-slate-300 mb-3 line-clamp-2">
                {productItem.desc}
              </p>
              
              {#if productItem.hyperlink}
                <a 
                  href={productItem.hyperlink}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors mb-3"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Lihat Produk
                </a>
              {/if}
              
              {#if currentUser && currentUser.is_admin}
                <div class="flex gap-2 pt-2 border-t border-slate-800">
                  <button
                    class="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-xs text-slate-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    on:click={() => openEditProduct(productItem)}
                    disabled={isSubmitting}
                  >
                    Edit
                  </button>
                  <button
                    class="inline-flex items-center px-3 py-1.5 rounded-full bg-red-500/90 hover:bg-red-400 text-xs text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                    on:click={() => deleteProduct(productItem.id)}
                    disabled={isSubmitting}
                  >
                    Hapus
                  </button>
                </div>
              {/if}
            </div>
          </div>
        {/each}
      {:else}
        <div class="col-span-full">
          <div class="rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center">
            <svg class="w-12 h-12 mx-auto text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <p class="text-slate-500 text-sm">Belum ada produk untuk ditampilkan.</p>
          </div>
        </div>
      {/if}
    </div>

    <Pagination meta={paginationMeta} />
  </div>

  <ProductModal 
    show={showProductModal} 
    {mode} 
    {form} 
    {isSubmitting}
    on:close={closeProductModal}
    on:submit={handleSubmit}
  />
</section>
