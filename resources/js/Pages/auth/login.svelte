<script lang="ts">
    import { inertia, router } from '@inertiajs/svelte' 
    import NaraIcon from '../../Components/NaraIcon.svelte'; 

    interface LoginForm {
      email: string;
      password: string;
    }
  
    let form: LoginForm = {
      email: '',
      password: '',
    }

    export let error: string | undefined;

    function submitForm(): void {
      router.post("/login", { email: form.email, password: form.password })
    }
  </script>
  
  <section class="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
    <div class="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 mx-auto min-h-screen">
        <div class="flex items-center gap-3 mb-2">
            <img src="/public/macroma.png" alt="Macroma Logo" class="h-10 w-10 rounded-xl object-contain" />
            <div class="flex flex-col leading-none">
              <span class="text-lg font-bold tracking-tight text-slate-100">Macroma</span>
              <span class="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-semibold">Media Teknologi</span>
            </div>
        </div>
        <div class="mb-6 text-sm text-slate-400">
            <a href="/" use:inertia class="inline-flex items-center gap-1 text-slate-400 hover:text-slate-200">
                <span>←</span>
                <span>Kembali ke beranda</span>
            </a>
        </div>
        <div class="w-full max-w-md rounded-3xl border border-slate-800/80 bg-slate-900/70 backdrop-blur-xl shadow-[0_24px_80px_rgba(15,23,42,0.8)] md:mt-0 sm:max-w-md xl:p-0">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              
                {#if error}
                <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  dark:text-red-400 dark:bg-red-900" role="alert">
                   {error}
                </div>
                {/if}
             

                <form class="space-y-4 md:space-y-6" on:submit|preventDefault={submitForm}>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-slate-200">Email</label>
                        <input bind:value={form.email} required type="text" name="email" id="email" class="bg-slate-900/70 border border-slate-700 text-slate-50 sm:text-sm rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 focus:outline-none block w-full py-2.5 px-3" >
                     
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-slate-200">Password</label>
                        <input bind:value={form.password} required type="password" name="password" id="password" class="bg-slate-900/70 border border-slate-700 text-slate-50 sm:text-sm rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 focus:outline-none block w-full py-2.5 px-3" >
                    </div>  
                    <button type="submit" class="w-full text-sm font-medium rounded-full px-5 py-2.5 text-slate-950 bg-emerald-400 hover:bg-emerald-300 focus:ring-4 focus:outline-none focus:ring-emerald-300">Login</button>
                    
                </form>
            </div>
        </div>
    </div>
  </section>