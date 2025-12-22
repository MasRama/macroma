<script lang="ts">
  import type { PortfolioForm } from '../types/portfolio';
  import { createEventDispatcher } from 'svelte';
  import axios from 'axios';
  import { Toast } from './helper';

  export let show: boolean = false;
  export let mode: 'create' | 'edit' = 'create';
  export let form: PortfolioForm;
  export let isSubmitting: boolean = false;

  let fileInput: HTMLInputElement;
  let previewUrl: string = '';
  let isUploading: boolean = false;

  const dispatch = createEventDispatcher<{
    close: void;
    submit: PortfolioForm;
  }>();

  // Reset preview when modal opens/closes or form changes
  $: if (show && form.image_url) {
    previewUrl = form.image_url;
  }
  $: if (!show) {
    previewUrl = '';
  }

  function handleClose(): void {
    previewUrl = '';
    dispatch('close');
  }

  async function handleFileSelect(event: Event): Promise<void> {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      Toast('Hanya file gambar yang diperbolehkan', 'error');
      return;
    }

    // Show preview immediately
    previewUrl = URL.createObjectURL(file);

    // Upload file
    isUploading = true;
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('/assets/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        form.image_url = response.data.data.url;
        Toast('Gambar berhasil diupload', 'success');
      } else {
        Toast(response.data.message || 'Gagal mengupload gambar', 'error');
        previewUrl = form.image_url || '';
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      Toast(err.response?.data?.message || 'Gagal mengupload gambar', 'error');
      previewUrl = form.image_url || '';
    } finally {
      isUploading = false;
    }
  }

  function triggerFileInput(): void {
    fileInput?.click();
  }

  function handleSubmit(): void {
    dispatch('submit', form);
  }
</script>

{#if show}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div class="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/95 p-6 shadow-2xl">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-sm font-semibold tracking-[0.18em] uppercase text-slate-400">
          {mode === 'create' ? 'Tambah portfolio baru' : 'Edit portfolio'}
        </h3>
        <button
          class="text-slate-400 hover:text-slate-200 text-sm"
          on:click={handleClose}
          disabled={isSubmitting}
        >
          ✕
        </button>
      </div>

      <form class="space-y-4" on:submit|preventDefault={handleSubmit}>
        <div class="space-y-2">
          <label class="block text-xs font-medium text-slate-400">Gambar</label>
          
          <!-- Hidden file input -->
          <input
            bind:this={fileInput}
            type="file"
            accept="image/*"
            class="hidden"
            on:change={handleFileSelect}
          />
          
          <!-- Image preview / upload area -->
          <button
            type="button"
            on:click={triggerFileInput}
            disabled={isUploading || isSubmitting}
            class="w-full aspect-video rounded-lg border-2 border-dashed border-slate-700 bg-slate-900/60 hover:border-slate-600 hover:bg-slate-800/60 transition-colors flex items-center justify-center overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {#if previewUrl}
              <img 
                src={previewUrl} 
                alt="Preview" 
                class="w-full h-full object-cover"
              />
            {:else if isUploading}
              <div class="text-center">
                <svg class="w-8 h-8 mx-auto text-slate-500 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p class="text-xs text-slate-500 mt-2">Mengupload...</p>
              </div>
            {:else}
              <div class="text-center">
                <svg class="w-8 h-8 mx-auto text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p class="text-xs text-slate-500 mt-2">Klik untuk pilih gambar</p>
              </div>
            {/if}
          </button>
          
          {#if previewUrl && !isUploading}
            <p class="text-[10px] text-slate-500 text-center">Klik gambar untuk mengganti</p>
          {/if}
        </div>

        <div class="space-y-1">
          <label for="portfolio-description" class="block text-xs font-medium text-slate-400">Deskripsi</label>
          <textarea
            id="portfolio-description"
            class="w-full px-3 py-2.5 rounded-lg bg-slate-900/60 border border-slate-700 text-sm text-slate-50 focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400 outline-none resize-none"
            rows="4"
            bind:value={form.description}
            placeholder="Deskripsi portfolio (minimal 10 karakter)"
          ></textarea>
        </div>

        <div class="space-y-1">
          <label for="portfolio-badge" class="block text-xs font-medium text-slate-400">Badge</label>
          <input
            id="portfolio-badge"
            class="w-full px-3 py-2.5 rounded-lg bg-slate-900/60 border border-slate-700 text-sm text-slate-50 focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400 outline-none"
            type="text"
            bind:value={form.badge}
            placeholder="Badge portfolio (contoh: Web App, Mobile, Design)"
          />
        </div>

        <div class="space-y-1">
          <label for="portfolio-hyperlink" class="block text-xs font-medium text-slate-400">Hyperlink (opsional)</label>
          <input
            id="portfolio-hyperlink"
            class="w-full px-3 py-2.5 rounded-lg bg-slate-900/60 border border-slate-700 text-sm text-slate-50 focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400 outline-none"
            type="text"
            bind:value={form.hyperlink}
            placeholder="https://example.com/project"
          />
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            on:click={handleClose}
            disabled={isSubmitting}
          >
            Batal
          </button>
          <button
            type="submit"
            class="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-medium shadow-sm hover:shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {#if isSubmitting}
              Menyimpan...
            {:else}
              {mode === 'create' ? 'Simpan portfolio' : 'Update portfolio'}
            {/if}
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}
