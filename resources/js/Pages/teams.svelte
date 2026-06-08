<script lang="ts">
  import { fly } from 'svelte/transition';
  import { page as inertiaPage, router } from '@inertiajs/svelte';
  import Header from '../Components/Header.svelte';
  import TeamModal from '../Components/TeamModal.svelte';
  import Pagination from '../Components/Pagination.svelte';
  import axios from 'axios';
  import { api, Toast } from '../Components/helper';
  import type { TeamMember, TeamForm } from '../types/team';
  import { createEmptyTeamForm, teamToForm } from '../types/team';
  import type { PaginationMeta } from '../types/portfolio';
  import type { User } from '../types/user';

  export let teams: TeamMember[] = [];
  export let total: number = 0;
  export let page: number = 1;
  export let limit: number = 10;
  export let totalPages: number = 1;
  export let hasNext: boolean = false;
  export let hasPrev: boolean = false;
  export let search: string = '';

  const currentUser = $inertiaPage.props.user as User | undefined;

  $: paginationMeta = { total, page, limit, totalPages, hasNext, hasPrev } as PaginationMeta;

  let showTeamModal: boolean = false;
  let isSubmitting: boolean = false;
  let mode: 'create' | 'edit' = 'create';
  let form: TeamForm = createEmptyTeamForm();

  function openCreateTeam(): void {
    mode = 'create';
    form = createEmptyTeamForm();
    showTeamModal = true;
  }

  function openEditTeam(team: TeamMember): void {
    mode = 'edit';
    form = teamToForm(team);
    showTeamModal = true;
  }

  function closeTeamModal(): void {
    showTeamModal = false;
    form = createEmptyTeamForm();
  }

  async function handleSubmit(event: CustomEvent<TeamForm>): Promise<void> {
    const formData = event.detail;
    if (!formData.name || !formData.position || !formData.jobdesk) {
      Toast('Nama, jabatan, dan jobdesk wajib diisi', 'error');
      return;
    }

    isSubmitting = true;

    const payload = {
      photo_url: formData.photo_url || null,
      name: formData.name,
      position: formData.position,
      jobdesk: formData.jobdesk,
      order: formData.order || 0
    };

    const result = mode === 'create'
      ? await api(() => axios.post('/teams', payload))
      : await api(() => axios.put(`/teams/${formData.id}`, payload));

    if (result.success) {
      closeTeamModal();
      router.visit('/teams', { preserveScroll: true, preserveState: true });
    }

    isSubmitting = false;
  }

  async function deleteTeam(id: string): Promise<void> {
    if (!confirm('Yakin ingin menghapus team member ini?')) return;

    isSubmitting = true;
    const result = await api(() => axios.delete('/teams', { data: { ids: [id] } }));
    if (result.success) {
      router.visit('/teams', { preserveScroll: true, preserveState: true });
    }
    isSubmitting = false;
  }
</script>

<Header group="teams" />

<section class="min-h-[calc(100vh-5rem)] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
    <div class="flex items-center justify-between mb-6">
      <div>
        <p class="text-xs tracking-[0.35em] uppercase text-slate-400 mb-2">Teams</p>
        <h1 class="text-2xl sm:text-3xl font-semibold tracking-tight leading-[1.25] mb-2">Manajemen Tim</h1>
        <p class="text-sm text-slate-300/90 max-w-xl">Kelola anggota tim yang ditampilkan di halaman landing section "Tim Kami".</p>
      </div>
      {#if currentUser && currentUser.is_admin}
        <button
          class="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-medium shadow-sm hover:shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
          on:click={openCreateTeam}
          disabled={isSubmitting}
        >
          Tambah member
        </button>
      {/if}
    </div>

    <!-- Teams Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {#if teams && teams.length}
        {#each teams as member}
          <div 
            class="group rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden hover:border-slate-700 transition-colors p-6 text-center"
            in:fly={{ y: 20, duration: 300 }}
          >
            <!-- Photo -->
            <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center overflow-hidden">
              {#if member.photo_url}
                <img src={member.photo_url} alt={member.name} class="w-full h-full object-cover" on:error={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
              {:else}
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              {/if}
            </div>

            <h3 class="text-base font-semibold text-slate-100 mb-1">{member.name}</h3>
            <p class="text-cyan-400 text-xs font-medium mb-3">{member.position}</p>
            <p class="text-slate-400 text-xs line-clamp-3 mb-4">{member.jobdesk}</p>
            
            <span class="inline-block px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-400 border border-slate-700">
              Urutan: {member.order}
            </span>

            {#if currentUser && currentUser.is_admin}
              <div class="flex gap-2 pt-4 mt-4 border-t border-slate-800 justify-center">
                <button
                  class="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-xs text-slate-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  on:click={() => openEditTeam(member)}
                  disabled={isSubmitting}
                >
                  Edit
                </button>
                <button
                  class="inline-flex items-center px-3 py-1.5 rounded-full bg-red-500/90 hover:bg-red-400 text-xs text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                  on:click={() => deleteTeam(member.id)}
                  disabled={isSubmitting}
                >
                  Hapus
                </button>
              </div>
            {/if}
          </div>
        {/each}
      {:else}
        <div class="col-span-full">
          <div class="rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center">
            <svg class="w-12 h-12 mx-auto text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p class="text-slate-500 text-sm">Belum ada team member untuk ditampilkan.</p>
          </div>
        </div>
      {/if}
    </div>

    <Pagination meta={paginationMeta} />
  </div>

  <TeamModal 
    show={showTeamModal} 
    {mode} 
    {form} 
    {isSubmitting}
    on:close={closeTeamModal}
    on:submit={handleSubmit}
  />
</section>
