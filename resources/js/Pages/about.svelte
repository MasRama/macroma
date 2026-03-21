<!-- about.svelte -->
<script lang="ts">
  import { inertia, page } from '@inertiajs/svelte'
  import { fly } from 'svelte/transition'
  import { onMount } from 'svelte'

  let mounted = false
  onMount(() => { mounted = true })

  interface User {
    id: string;
    name: string;
    email: string;
    is_admin: boolean;
  }

  let user = $page.props.user as User | undefined

  const companyProfile = {
    name: "PT Macroma Media Teknologi",
    nib: "1812250110117",
    skKemenkumham: "AHU-070436.AH.01.30.Tahun 2025",
    tahunBerdiri: "2025"
  }

  const visiMisi = {
    visi: "Menjadi perusahaan teknologi terdepan yang memberikan solusi digital inovatif dan terpercaya untuk mendukung transformasi bisnis di Indonesia.",
    misi: [
      "Menyediakan layanan pengembangan aplikasi berkualitas tinggi yang disesuaikan dengan kebutuhan klien.",
      "Mengutamakan kepuasan pelanggan melalui solusi yang efisien, tepat waktu, dan berkelanjutan.",
      "Membangun tim profesional yang kompeten dan berkomitmen terhadap inovasi teknologi.",
      "Berkontribusi pada kemajuan digitalisasi di berbagai sektor industri."
    ]
  }

  const team = [
    {
      name: "Founder & CEO",
      role: "Chief Executive Officer",
      desc: "Memimpin visi dan strategi perusahaan untuk pertumbuhan berkelanjutan."
    },
    {
      name: "CTO",
      role: "Chief Technology Officer", 
      desc: "Mengarahkan pengembangan teknologi dan inovasi produk."
    },
    {
      name: "Lead Developer",
      role: "Technical Lead",
      desc: "Memimpin tim pengembangan dalam membangun solusi berkualitas."
    }
  ]
</script>

<!-- Background Elements -->
<div class="fixed inset-0 -z-10 bg-slate-950 selection:bg-blue-500/30">
  <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
  <div class="absolute left-1/4 top-0 -z-10 h-[600px] w-[600px] rounded-full bg-blue-600 opacity-20 blur-[120px]"></div>
  <div class="absolute right-0 top-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-indigo-500 opacity-15 blur-[100px]"></div>
</div>

<!-- Header -->
<header class="fixed inset-x-0 top-0 z-40 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/60">
  <div class="max-w-7xl mx-auto flex h-20 items-center justify-between px-6 lg:px-8">
    <a href="/" use:inertia class="flex items-center gap-3 group">
      <img src="/public/macroma.png" alt="Macroma Logo" class="h-10 w-10 rounded-xl object-contain" />
      <div class="flex flex-col leading-none">
        <span class="text-lg font-bold tracking-tight text-slate-100">Macroma</span>
        <span class="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-semibold">Media Teknologi</span>
      </div>
    </a>

    <nav class="hidden md:flex items-center gap-8">
      <a href="/#services" class="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">Solusi</a>
      <a href="/#products" class="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">Produk</a>
      <a href="/about" use:inertia class="text-sm font-medium text-blue-400 transition-colors">Tentang Kami</a>
    </nav>

    <div class="flex items-center gap-4">
      {#if user && user.id}
        <a
          href="/dashboard"
          use:inertia
          class="inline-flex items-center justify-center rounded-lg px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 transition-all hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)]"
        >
          Dashboard
        </a>
      {:else}
        <a
          href="https://wa.me/6285168657868?text=Halo%20Macroma%2C%20saya%20ingin%20bertanya%20tentang%20layanan%20Anda."
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 transition-all hover:shadow-[0_0_24px_-5px_rgba(34,197,94,0.6)]"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Hubungi Kami
        </a>
      {/if}
    </div>
  </div>
</header>

<main class="relative overflow-hidden">
  <!-- Hero Section -->
  <section class="relative pt-32 pb-20 px-6">
    <div class="max-w-7xl mx-auto">
      {#if mounted}
        <div in:fly={{ y: 30, duration: 800 }} class="text-center mb-16">
          <span class="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">Tentang Kami</span>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            PT Macroma Media Teknologi
          </h1>
          <p class="text-xl text-slate-400 max-w-3xl mx-auto">
            Partner teknologi terpercaya untuk solusi sistem informasi dan transformasi digital.
          </p>
        </div>
      {/if}
    </div>
  </section>

  <!-- Company Profile Section -->
  <section id="profile" class="py-20 px-6 bg-slate-900/30">
    <div class="max-w-7xl mx-auto">
      {#if mounted}
        <div in:fly={{ y: 30, duration: 800, delay: 100 }}>
          <div class="text-center mb-12">
            <span class="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">Profil Perusahaan</span>
            <h2 class="text-3xl md:text-4xl font-bold text-slate-50 mb-4">Informasi Perusahaan</h2>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 text-center">
              <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <p class="text-xs text-slate-500 uppercase tracking-wider mb-2">Nama Perusahaan</p>
              <p class="text-lg font-semibold text-white">{companyProfile.name}</p>
            </div>

            <div class="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 text-center">
              <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-green-500/10 flex items-center justify-center">
                <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p class="text-xs text-slate-500 uppercase tracking-wider mb-2">NIB</p>
              <p class="text-lg font-semibold text-white">{companyProfile.nib}</p>
            </div>

            <div class="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 text-center">
              <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <p class="text-xs text-slate-500 uppercase tracking-wider mb-2">SK Kemenkumham</p>
              <p class="text-sm font-semibold text-white">{companyProfile.skKemenkumham}</p>
            </div>

            <div class="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 text-center">
              <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                <svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p class="text-xs text-slate-500 uppercase tracking-wider mb-2">Tahun Berdiri</p>
              <p class="text-lg font-semibold text-white">{companyProfile.tahunBerdiri}</p>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </section>

  <!-- Visi & Misi Section -->
  <section id="visi-misi" class="py-20 px-6">
    <div class="max-w-7xl mx-auto">
      {#if mounted}
        <div in:fly={{ y: 30, duration: 800, delay: 200 }}>
          <div class="grid lg:grid-cols-2 gap-12">
            <!-- Visi -->
            <div class="rounded-3xl bg-gradient-to-br from-blue-900/30 to-slate-900/50 border border-blue-500/20 p-8 md:p-10">
              <div class="flex items-center gap-4 mb-6">
                <div class="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                  <svg class="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-white">Visi</h3>
              </div>
              <p class="text-slate-300 text-lg leading-relaxed">
                {visiMisi.visi}
              </p>
            </div>

            <!-- Misi -->
            <div class="rounded-3xl bg-gradient-to-br from-indigo-900/30 to-slate-900/50 border border-indigo-500/20 p-8 md:p-10">
              <div class="flex items-center gap-4 mb-6">
                <div class="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center">
                  <svg class="w-7 h-7 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-white">Misi</h3>
              </div>
              <ul class="space-y-4">
                {#each visiMisi.misi as misi, i}
                  <li class="flex items-start gap-3">
                    <span class="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs font-bold text-indigo-400">{i + 1}</span>
                    <p class="text-slate-300">{misi}</p>
                  </li>
                {/each}
              </ul>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </section>

  <!-- Team Section -->
  <section id="team" class="py-20 px-6 bg-slate-900/30">
    <div class="max-w-7xl mx-auto">
      {#if mounted}
        <div in:fly={{ y: 30, duration: 800, delay: 300 }}>
          <div class="text-center mb-12">
            <span class="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">Our Team</span>
            <h2 class="text-3xl md:text-4xl font-bold text-slate-50 mb-4">Tim Kami</h2>
            <p class="text-slate-400 max-w-2xl mx-auto">Profesional berpengalaman yang berkomitmen untuk memberikan solusi terbaik.</p>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            {#each team as member}
              <div class="group rounded-3xl bg-slate-900/80 border border-slate-800 p-8 text-center hover:border-cyan-500/30 transition-all duration-300">
                <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{member.name}</h3>
                <p class="text-cyan-400 text-sm font-medium mb-4">{member.role}</p>
                <p class="text-slate-400 text-sm">{member.desc}</p>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-24 px-6">
    <div class="max-w-5xl mx-auto rounded-[2.5rem] bg-gradient-to-r from-blue-900/30 via-indigo-900/30 to-slate-900/30 border border-blue-500/20 p-12 md:p-16 text-center relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)]"></div>
      <div class="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
      
      <div class="relative z-10">
        <span class="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">Let's Talk</span>
        <h2 class="text-3xl md:text-5xl font-bold text-slate-50 mb-6">Siap Bekerja Sama?</h2>
        <p class="text-slate-400 max-w-xl mx-auto mb-10 text-lg">Konsultasikan kebutuhan sistem IT perusahaan Anda dengan tim ahli Macroma Media.</p>
        <a 
          href="https://wa.me/6285168657868?text=Halo%20Macroma%2C%20saya%20ingin%20bertanya%20tentang%20layanan%20Anda."
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-600 to-green-500 px-8 py-4 text-sm font-bold text-white hover:from-green-500 hover:to-green-400 transition-all shadow-xl shadow-green-500/25 hover:shadow-green-500/40 hover:scale-[1.02]"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Hubungi Kami Sekarang
        </a>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="border-t border-slate-800 bg-slate-950 pt-16 pb-8 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="grid md:grid-cols-4 gap-12 mb-12">
        <div class="md:col-span-2">
          <div class="flex items-center gap-3 mb-6">
            <img src="/public/macroma.png" alt="Macroma Logo" class="h-10 w-10 rounded-xl object-contain" />
            <div>
              <span class="text-xl font-bold text-slate-100">Macroma Media Teknologi</span>
              <p class="text-xs text-blue-400">IT Solutions & Products</p>
            </div>
          </div>
          <p class="text-slate-400 text-sm leading-relaxed max-w-sm">
            Partner teknologi terpercaya untuk solusi sistem informasi, pengembangan perangkat lunak, dan transformasi digital enterprise.
          </p>
        </div>
        
        <div>
          <h4 class="text-slate-100 font-semibold mb-6">Layanan</h4>
          <ul class="space-y-4 text-sm text-slate-400">
            <li><a href="/#services" class="hover:text-blue-400 transition-colors">System Architecture</a></li>
            <li><a href="/#services" class="hover:text-blue-400 transition-colors">Custom Development</a></li>
            <li><a href="/#services" class="hover:text-blue-400 transition-colors">IT Consultancy</a></li>
            <li><a href="/#services" class="hover:text-blue-400 transition-colors">Cloud Solutions</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-slate-100 font-semibold mb-6">Perusahaan</h4>
          <ul class="space-y-4 text-sm text-slate-400">
            <li><a href="/about" use:inertia class="hover:text-blue-400 transition-colors">Tentang Kami</a></li>
            <li><a href="/#portfolio" class="hover:text-blue-400 transition-colors">Portfolio</a></li>
            <li><a href="/#products" class="hover:text-blue-400 transition-colors">Produk</a></li>
          </ul>
        </div>
      </div>

      <div class="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-xs text-slate-500">© {new Date().getFullYear()} Macroma Media Teknologi. All rights reserved.</p>
        <div class="flex gap-6">
          <a href="https://wa.me/6285168657868" target="_blank" rel="noopener noreferrer" class="text-slate-500 hover:text-green-400 transition-colors">
            <span class="sr-only">WhatsApp</span>
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</main>
