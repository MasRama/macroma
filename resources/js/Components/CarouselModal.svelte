<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { CarouselForm } from '../types/carousel';
  import { uploadImage } from './helper';

  export let show: boolean = false;
  export let mode: 'create' | 'edit' = 'create';
  export let form: CarouselForm;
  export let isSubmitting: boolean = false;

  const dispatch = createEventDispatcher<{
    close: void;
    submit: CarouselForm;
  }>();

  let isUploading = false;

  function handleClose() {
    if (!isSubmitting && !isUploading) {
      dispatch('close');
    }
  }

  function handleSubmit() {
    dispatch('submit', form);
  }

  async function handleImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    isUploading = true;
    const url = await uploadImage(file);
    if (url) {
      form.image_url = url;
    }
    isUploading = false;
  }
</script>

{#if show}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" on:click={handleClose}>
    <div 
      class="relative w-full max-w-2xl bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl max-h-[90vh] overflow-y-auto"
      on:click|stopPropagation
    >
      <div class="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900">
        <h2 class="text-xl font-semibold text-slate-100">
          {mode === 'create' ? 'Tambah Carousel' : 'Edit Carousel'}
        </h2>
        <button
          type="button"
          class="text-slate-400 hover:text-slate-100 transition disabled:opacity-50"
          on:click={handleClose}
          disabled={isSubmitting || isUploading}
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form on:submit|preventDefault={handleSubmit} class="p-6 space-y-6">
        <div>
          <label for="title" class="block text-sm font-medium text-slate-300 mb-2">
            Judul <span class="text-red-400">*</span>
          </label>
          <input
            id="title"
            type="text"
            bind:value={form.title}
            required
            class="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            placeholder="Masukkan judul carousel"
            disabled={isSubmitting || isUploading}
          />
        </div>

        <div>
          <label for="description" class="block text-sm font-medium text-slate-300 mb-2">
            Deskripsi
          </label>
          <textarea
            id="description"
            bind:value={form.description}
            rows="3"
            class="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition resize-none"
            placeholder="Masukkan deskripsi carousel (opsional)"
            disabled={isSubmitting || isUploading}
          />
        </div>

        <div>
          <label for="image_url" class="block text-sm font-medium text-slate-300 mb-2">
            URL Gambar <span class="text-red-400">*</span>
          </label>
          <input
            id="image_url"
            type="text"
            bind:value={form.image_url}
            required
            class="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            placeholder="https://example.com/image.jpg"
            disabled={isSubmitting || isUploading}
          />
          <div class="mt-2">
            <label class="inline-flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm rounded-lg cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              {isUploading ? 'Uploading...' : 'Upload Gambar'}
              <input
                type="file"
                accept="image/*"
                class="hidden"
                on:change={handleImageUpload}
                disabled={isSubmitting || isUploading}
              />
            </label>
          </div>
          {#if form.image_url}
            <div class="mt-3">
              <img 
                src={form.image_url} 
                alt="Preview" 
                class="w-full h-48 object-cover rounded-lg border border-slate-700"
                on:error={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/400x225?text=Invalid+Image';
                }}
              />
            </div>
          {/if}
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="order" class="block text-sm font-medium text-slate-300 mb-2">
              Urutan
            </label>
            <input
              id="order"
              type="number"
              bind:value={form.order}
              min="0"
              class="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              disabled={isSubmitting || isUploading}
            />
          </div>

          <div>
            <label for="is_active" class="block text-sm font-medium text-slate-300 mb-2">
              Status
            </label>
            <select
              id="is_active"
              bind:value={form.is_active}
              class="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              disabled={isSubmitting || isUploading}
            >
              <option value={true}>Aktif</option>
              <option value={false}>Tidak Aktif</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            class="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            on:click={handleClose}
            disabled={isSubmitting || isUploading}
          >
            Batal
          </button>
          <button
            type="submit"
            class="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting || isUploading}
          >
            {isSubmitting ? 'Menyimpan...' : mode === 'create' ? 'Tambah' : 'Simpan'}
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}
