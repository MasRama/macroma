<script lang="ts">
  import type { PortfolioForm } from '../types/portfolio';
  import { createEventDispatcher } from 'svelte';

  export let show: boolean = false;
  export let mode: 'create' | 'edit' = 'create';
  export let form: PortfolioForm;
  export let isSubmitting: boolean = false;

  const dispatch = createEventDispatcher<{
    close: void;
    submit: PortfolioForm;
  }>();

  function handleClose(): void {
    dispatch('close');
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
        <div class="space-y-1">
          <label for="portfolio-image" class="block text-xs font-medium text-slate-400">URL Gambar</label>
          <input
            id="portfolio-image"
            class="w-full px-3 py-2.5 rounded-lg bg-slate-900/60 border border-slate-700 text-sm text-slate-50 focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400 outline-none"
            type="text"
            bind:value={form.image_url}
            placeholder="https://example.com/image.jpg"
          />
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
