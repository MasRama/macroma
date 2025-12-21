<script lang="ts">
  import { fly } from 'svelte/transition';
  import { page as inertiaPage, router } from '@inertiajs/svelte';
  import Header from '../Components/Header.svelte';
  import CarouselModal from '../Components/CarouselModal.svelte';
  import Pagination from '../Components/Pagination.svelte';
  import axios from 'axios';
  import { api, Toast } from '../Components/helper';
  import type { Carousel, CarouselForm, PaginationMeta } from '../types/carousel';
  import { createEmptyCarouselForm, carouselToForm } from '../types/carousel';
  import type { User } from '../types/user';

  export let carousels: Carousel[] = [];
  export let total: number = 0;
  export let page: number = 1;
  export let limit: number = 10;
  export let totalPages: number = 1;
  export let hasNext: boolean = false;
  export let hasPrev: boolean = false;
  export let search: string = '';

  const currentUser = $inertiaPage.props.user as User | undefined;

  $: paginationMeta = { total, page, limit, totalPages, hasNext, hasPrev } as PaginationMeta;

  let showCarouselModal: boolean = false;
  let isSubmitting: boolean = false;
  let mode: 'create' | 'edit' = 'create';
  let form: CarouselForm = createEmptyCarouselForm();

  function openCreateCarousel(): void {
    mode = 'create';
    form = createEmptyCarouselForm();
    showCarouselModal = true;
  }

  function openEditCarousel(carouselItem: Carousel): void {
    mode = 'edit';
    form = carouselToForm(carouselItem);
    showCarouselModal = true;
  }

  function closeCarouselModal(): void {
    showCarouselModal = false;
    form = createEmptyCarouselForm();
  }

  async function handleSubmit(event: CustomEvent<CarouselForm>): Promise<void> {
    const formData = event.detail;
    if (!formData.image_url || !formData.title) {
      Toast('URL gambar dan judul wajib diisi', 'error');
      return;
    }

    isSubmitting = true;

    const payload = {
      title: formData.title,
      description: formData.description || null,
      image_url: formData.image_url,
      order: formData.order,
      is_active: formData.is_active
    };

    const result = mode === 'create'
      ? await api(() => axios.post('/carousels', payload))
      : await api(() => axios.put(`/carousels/${formData.id}`, payload));

    if (result.success) {
      closeCarouselModal();
      router.visit('/carousels', { preserveScroll: true, preserveState: true });
    }

    isSubmitting = false;
  }

  async function deleteCarousel(id: string): Promise<void> {
    if (!confirm('Yakin ingin menghapus carousel ini?')) {
      return;
    }

    isSubmitting = true;

    const result = await api(() => axios.delete('/carousels', { data: { ids: [id] } }));

    if (result.success) {
      router.visit('/carousels', { preserveScroll: true, preserveState: true });
    }

    isSubmitting = false;
  }

  function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }
</script>

<Header group="carousels" />

<section class="min-h-[calc(100vh-5rem)] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
    <div class="flex items-center justify-between mb-6">
      <div>
        <p class="text-xs tracking-[0.35em] uppercase text-slate-400 mb-2">
          Carousels
        </p>
        <h1 class="text-2xl sm:text-3xl font-semibold tracking-tight leading-[1.25] mb-2">
          Manajemen Carousel
        </h1>
        <p class="text-sm text-slate-300/90 max-w-xl">
          Kelola gambar carousel untuk ditampilkan di halaman landing.
        </p>
      </div>
      {#if currentUser && currentUser.is_admin}
        <button
          class="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-medium shadow-sm hover:shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
          on:click={openCreateCarousel}
          disabled={isSubmitting}
        >
          Tambah Carousel
        </button>
      {/if}
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {#if carousels && carousels.length}
        {#each carousels as carouselItem}
          <div 
            class="group rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden hover:border-slate-700 transition-colors"
            in:fly={{ y: 20, duration: 300 }}
          >
            <div class="aspect-video bg-slate-800 overflow-hidden relative">
              <img 
                src={carouselItem.image_url} 
                alt={carouselItem.title}
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                on:error={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/400x225?text=No+Image';
                }}
              />
              <div class="absolute top-2 right-2 flex gap-2">
                <span class="px-2 py-1 rounded-full text-[10px] font-medium bg-slate-900/80 text-slate-300 backdrop-blur-sm">
                  Order: {carouselItem.order}
                </span>
                <span class="px-2 py-1 rounded-full text-[10px] font-medium {carouselItem.is_active ? 'bg-green-500/80 text-white' : 'bg-red-500/80 text-white'} backdrop-blur-sm">
                  {carouselItem.is_active ? 'Aktif' : 'Nonaktif'}
                </span>
              </div>
            </div>
            
            <div class="p-4">
              <h3 class="text-base font-semibold text-slate-100 mb-2">
                {carouselItem.title}
              </h3>
              {#if carouselItem.description}
                <p class="text-sm text-slate-400 mb-3 line-clamp-2">
                  {carouselItem.description}
                </p>
              {/if}
              
              {#if currentUser && currentUser.is_admin}
                <div class="flex gap-2 pt-2 border-t border-slate-800">
                  <button
                    class="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-xs text-slate-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    on:click={() => openEditCarousel(carouselItem)}
                    disabled={isSubmitting}
                  >
                    Edit
                  </button>
                  <button
                    class="inline-flex items-center px-3 py-1.5 rounded-full bg-red-500/90 hover:bg-red-400 text-xs text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                    on:click={() => deleteCarousel(carouselItem.id)}
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p class="text-slate-500 text-sm">Belum ada carousel untuk ditampilkan.</p>
          </div>
        </div>
      {/if}
    </div>

    <Pagination meta={paginationMeta} />
  </div>

  <CarouselModal 
    show={showCarouselModal} 
    {mode} 
    {form} 
    {isSubmitting}
    on:close={closeCarouselModal}
    on:submit={handleSubmit}
  />
</section>
