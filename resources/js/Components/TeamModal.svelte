<script lang="ts">
  import type { TeamForm } from '../types/team';
  import { createEventDispatcher } from 'svelte';
  import axios from 'axios';
  import { Toast } from './helper';

  export let show: boolean = false;
  export let mode: 'create' | 'edit' = 'create';
  export let form: TeamForm;
  export let isSubmitting: boolean = false;

  let fileInput: HTMLInputElement;
  let previewUrl: string = '';
  let isUploading: boolean = false;

  const dispatch = createEventDispatcher<{
    close: void;
    submit: TeamForm;
  }>();

  $: if (show && form.photo_url) {
    previewUrl = form.photo_url;
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

    if (!file.type.startsWith('image/')) {
      Toast('Hanya file gambar yang diperbolehkan', 'error');
      return;
    }

    previewUrl = URL.createObjectURL(file);
    isUploading = true;
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post('/assets/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data.success) {
        form.photo_url = response.data.data.url;
        Toast('Foto berhasil diupload', 'success');
      } else {
        Toast(response.data.message || 'Gagal mengupload foto', 'error');
        previewUrl = form.photo_url || '';
      }
    } catch {
      Toast('Gagal mengupload foto', 'error');
      previewUrl = form.photo_url || '';
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
    <div class="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/95 p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-sm font-semibold tracking-[0.18em] uppercase text-slate-400">
          {mode === 'create' ? 'Tambah team member' : 'Edit team member'}
        </h3>
        <button class="text-slate-400 hover:text-slate-200 text-sm" on:click={handleClose} disabled={isSubmitting}>✕</button>
      </div>

      <form class="space-y-4" on:submit|preventDefault={handleSubmit}>
        <!-- Photo -->
        <div class="space-y-2">
          <label class="block text-xs font-medium text-slate-400">Foto</label>
          <input bind:this={fileInput} type="file" accept="image/*" class="hidden" on:change={handleFileSelect} />
          <button
            type="button"
            on:click={triggerFileInput}
            disabled={isUploading || isSubmitting}
            class="w-24 h-24 mx-auto rounded-full border-2 border-dashed border-slate-700 bg-slate-900/60 hover:border-slate-600 hover:bg-slate-800/60 transition-colors flex items-center justify-center overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {#if previewUrl}
              <img src={previewUrl} alt="Preview" class="w-full h-full object-cover" />
            {:else if isUploading}
              <svg class="w-6 h-6 text-slate-500 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
            {:else}
              <svg class="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            {/if}
          </button>
          <p class="text-[10px] text-slate-500 text-center">Klik untuk pilih foto</p>
        </div>

        <!-- Name -->
        <div class="space-y-1">
          <label for="team-name" class="block text-xs font-medium text-slate-400">Nama</label>
          <input
            id="team-name"
            class="w-full px-3 py-2.5 rounded-lg bg-slate-900/60 border border-slate-700 text-sm text-slate-50 focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400 outline-none"
            type="text"
            bind:value={form.name}
            placeholder="Nama lengkap"
          />
        </div>

        <!-- Position -->
        <div class="space-y-1">
          <label for="team-position" class="block text-xs font-medium text-slate-400">Jabatan</label>
          <input
            id="team-position"
            class="w-full px-3 py-2.5 rounded-lg bg-slate-900/60 border border-slate-700 text-sm text-slate-50 focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400 outline-none"
            type="text"
            bind:value={form.position}
            placeholder="Contoh: CEO, CTO, Lead Developer"
          />
        </div>

        <!-- Jobdesk -->
        <div class="space-y-1">
          <label for="team-jobdesk" class="block text-xs font-medium text-slate-400">Jobdesk</label>
          <textarea
            id="team-jobdesk"
            class="w-full px-3 py-2.5 rounded-lg bg-slate-900/60 border border-slate-700 text-sm text-slate-50 focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400 outline-none resize-none"
            rows="3"
            bind:value={form.jobdesk}
            placeholder="Deskripsi tugas dan tanggung jawab"
          ></textarea>
        </div>

        <!-- Order -->
        <div class="space-y-1">
          <label for="team-order" class="block text-xs font-medium text-slate-400">Urutan</label>
          <input
            id="team-order"
            class="w-full px-3 py-2.5 rounded-lg bg-slate-900/60 border border-slate-700 text-sm text-slate-50 focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400 outline-none"
            type="number"
            bind:value={form.order}
            placeholder="0"
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
              {mode === 'create' ? 'Simpan' : 'Update'}
            {/if}
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}
