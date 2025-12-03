<script lang="ts">
  import { fly } from 'svelte/transition';
  import { page as inertiaPage, router } from '@inertiajs/svelte';
  import Header from '../Components/Header.svelte';
  import PortfolioModal from '../Components/PortfolioModal.svelte';
  import Pagination from '../Components/Pagination.svelte';
  import axios from 'axios';
  import { api, Toast } from '../Components/helper';
  import type { Portfolio, PortfolioForm, PaginationMeta } from '../types/portfolio';
  import { createEmptyPortfolioForm, portfolioToForm } from '../types/portfolio';
  import type { User } from '../types/user';

  export let portfolios: Portfolio[] = [];
  // Pagination meta from backend
  export let total: number = 0;
  export let page: number = 1;
  export let limit: number = 10;
  export let totalPages: number = 1;
  export let hasNext: boolean = false;
  export let hasPrev: boolean = false;
  export let search: string = '';

  const currentUser = $inertiaPage.props.user as User | undefined;

  // Build pagination meta object
  $: paginationMeta = { total, page, limit, totalPages, hasNext, hasPrev } as PaginationMeta;

  let showPortfolioModal: boolean = false;
  let isSubmitting: boolean = false;
  let mode: 'create' | 'edit' = 'create';
  let form: PortfolioForm = createEmptyPortfolioForm();

  function openCreatePortfolio(): void {
    mode = 'create';
    form = createEmptyPortfolioForm();
    showPortfolioModal = true;
  }

  function openEditPortfolio(portfolioItem: Portfolio): void {
    mode = 'edit';
    form = portfolioToForm(portfolioItem);
    showPortfolioModal = true;
  }

  function closePortfolioModal(): void {
    showPortfolioModal = false;
    form = createEmptyPortfolioForm();
  }

  async function handleSubmit(event: CustomEvent<PortfolioForm>): Promise<void> {
    const formData = event.detail;
    if (!formData.image_url || !formData.description) {
      Toast('URL gambar dan deskripsi wajib diisi', 'error');
      return;
    }

    isSubmitting = true;

    const payload = {
      image_url: formData.image_url,
      description: formData.description,
      hyperlink: formData.hyperlink || null
    };

    const result = mode === 'create'
      ? await api(() => axios.post('/portfolios', payload))
      : await api(() => axios.put(`/portfolios/${formData.id}`, payload));

    if (result.success) {
      closePortfolioModal();
      router.visit('/portfolios', { preserveScroll: true, preserveState: true });
    }

    isSubmitting = false;
  }

  async function deletePortfolio(id: string): Promise<void> {
    if (!confirm('Yakin ingin menghapus portfolio ini?')) {
      return;
    }

    isSubmitting = true;

    const result = await api(() => axios.delete('/portfolios', { data: { ids: [id] } }));

    if (result.success) {
      router.visit('/portfolios', { preserveScroll: true, preserveState: true });
    }

    isSubmitting = false;
  }

  function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }
</script>

<Header group="portfolios" />

<section class="min-h-[calc(100vh-5rem)] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
    <div class="flex items-center justify-between mb-6">
      <div>
        <p class="text-xs tracking-[0.35em] uppercase text-slate-400 mb-2">
          Portfolios
        </p>
        <h1 class="text-2xl sm:text-3xl font-semibold tracking-tight leading-[1.25] mb-2">
          Manajemen Portfolio
        </h1>
        <p class="text-sm text-slate-300/90 max-w-xl">
          Kelola portfolio proyek untuk ditampilkan di halaman publik.
        </p>
      </div>
      {#if currentUser && currentUser.is_admin}
        <button
          class="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-medium shadow-sm hover:shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
          on:click={openCreatePortfolio}
          disabled={isSubmitting}
        >
          Tambah portfolio
        </button>
      {/if}
    </div>

    <!-- Portfolio Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {#if portfolios && portfolios.length}
        {#each portfolios as portfolioItem}
          <div 
            class="group rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden hover:border-slate-700 transition-colors"
            in:fly={{ y: 20, duration: 300 }}
          >
            <!-- Image -->
            <div class="aspect-video bg-slate-800 overflow-hidden">
              <img 
                src={portfolioItem.image_url} 
                alt={truncateText(portfolioItem.description, 50)}
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                on:error={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/400x225?text=No+Image';
                }}
              />
            </div>
            
            <!-- Content -->
            <div class="p-4">
              <p class="text-sm text-slate-300 mb-3 line-clamp-3">
                {portfolioItem.description}
              </p>
              
              {#if portfolioItem.hyperlink}
                <a 
                  href={portfolioItem.hyperlink}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors mb-3"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Lihat Project
                </a>
              {/if}
              
              {#if currentUser && currentUser.is_admin}
                <div class="flex gap-2 pt-2 border-t border-slate-800">
                  <button
                    class="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-xs text-slate-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    on:click={() => openEditPortfolio(portfolioItem)}
                    disabled={isSubmitting}
                  >
                    Edit
                  </button>
                  <button
                    class="inline-flex items-center px-3 py-1.5 rounded-full bg-red-500/90 hover:bg-red-400 text-xs text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                    on:click={() => deletePortfolio(portfolioItem.id)}
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
            <p class="text-slate-500 text-sm">Belum ada portfolio untuk ditampilkan.</p>
          </div>
        </div>
      {/if}
    </div>

    <Pagination meta={paginationMeta} />
  </div>

  <PortfolioModal 
    show={showPortfolioModal} 
    {mode} 
    {form} 
    {isSubmitting}
    on:close={closePortfolioModal}
    on:submit={handleSubmit}
  />
</section>
