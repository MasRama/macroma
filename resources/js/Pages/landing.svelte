<!-- landing.svelte -->
<script lang="ts">
  import { inertia, page } from '@inertiajs/svelte'
  import { fly } from 'svelte/transition'
  import { onMount } from 'svelte'
  import HeroCarousel from '../Components/HeroCarousel.svelte'

  let mounted = false
  onMount(() => { mounted = true })

  interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    is_admin: boolean;
    is_verified: boolean;
  }

  interface CarouselImage {
    id: string;
    title: string;
    description: string | null;
    image_url: string;
    order: number;
  }

  export let carousels: CarouselImage[] = [];

  interface Portfolio {
    id: string;
    image_url: string;
    description: string;
    badge: string;
    hyperlink?: string | null;
  }

  export let portfolios: Portfolio[] = [];

  interface Service {
    title: string;
    desc: string;
    icon: string;
  }

  interface Product {
    id: string;
    name: string;
    tagline: string;
    desc: string;
    badge: string;
    image_url: string;
    hyperlink?: string | null;
    type: string;
    is_featured: boolean;
  }

  export let products: Product[] = [];

  let user = $page.props.user as User | undefined

  // Data Static untuk Konten
  const services: Service[] = [
    {
      title: "System Architecture",
      desc: "Merancang fondasi teknologi yang kokoh, skalabel, dan efisien untuk menopang pertumbuhan bisnis jangka panjang.",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />`
    },
    {
      title: "Custom Development",
      desc: "Pengembangan perangkat lunak tailor-made yang presisi sesuai kebutuhan spesifik operasional perusahaan Anda.",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />`
    },
    {
      title: "Digital Transformation",
      desc: "Konsultasi strategis untuk mendigitalkan proses manual, meningkatkan efisiensi, dan mengurangi human error.",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />`
    }
  ];
</script>

<!-- Background Elements -->
<div class="fixed inset-0 -z-10 bg-slate-950 selection:bg-blue-500/30">
  <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
  <div class="absolute left-1/4 top-0 -z-10 h-[600px] w-[600px] rounded-full bg-blue-600 opacity-20 blur-[120px]"></div>
  <div class="absolute right-0 top-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-indigo-500 opacity-15 blur-[100px]"></div>
  <div class="absolute left-1/2 bottom-0 -z-10 h-[300px] w-[500px] rounded-full bg-cyan-500 opacity-10 blur-[100px]"></div>
</div>

<!-- Header -->
<header class="fixed inset-x-0 top-0 z-40 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/60">
  <div class="max-w-7xl mx-auto flex h-20 items-center justify-between px-6 lg:px-8">
    <a href="/" use:inertia class="flex items-center gap-3 group">
      <div class="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
        <img src="/public/macroma.png" alt="Macroma Logo" class="h-full w-full object-contain" />
      </div>
      <div class="flex flex-col leading-none">
        <span class="text-lg font-bold tracking-tight text-slate-100">Macroma</span>
        <span class="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-semibold">Media</span>
      </div>
    </a>

    <nav class="hidden md:flex items-center gap-8">
      <a href="#services" class="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">Solusi</a>
      <a href="#products" class="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">Produk</a>
      <a href="#portfolio" class="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">Portofolio</a>
      <a href="#about" class="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">Tentang Kami</a>
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
          href="https://wa.me/6285168657868?text=Halo%20Macroma%20Media%2C%20saya%20ingin%20berkonsultasi%20tentang%20layanan%20Anda."
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center rounded-lg px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all hover:shadow-[0_0_24px_-5px_rgba(59,130,246,0.6)]"
        >
          Hubungi Kami
        </a>
      {/if}
    </div>
  </div>
</header>

<main class="relative overflow-hidden">
  <!-- Hero Section -->
  <section class="relative min-h-screen flex items-center justify-center px-6 py-20 pt-28">
    <!-- Floating Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
    </div>

    <div class="max-w-7xl mx-auto w-full">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <!-- Left: Copy -->
        <div class="text-center lg:text-left">
          {#if mounted}
            <div in:fly={{ x: -30, duration: 800 }} class="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 backdrop-blur-md mb-8">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span class="text-xs font-semibold tracking-wide uppercase text-blue-300">IT Solutions & Products</span>
            </div>

            <h1 in:fly={{ x: -30, duration: 800, delay: 100 }} class="font-sans text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Wujudkan Ide,<br />
              <span class="relative">
                <span class="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">Bangun Sistem.</span>
                <svg class="absolute -bottom-2 left-0 w-full h-3 text-blue-500/30" viewBox="0 0 200 12" preserveAspectRatio="none">
                  <path d="M0,8 Q50,0 100,8 T200,8" stroke="currentColor" stroke-width="3" fill="none" />
                </svg>
              </span>
            </h1>

            <p in:fly={{ x: -30, duration: 800, delay: 200 }} class="text-lg sm:text-xl text-slate-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Macroma adalah partner teknologi yang berfokus pada pengembangan <span class="text-white font-medium">sistem operasional digital untuk institusi pendidikan</span>, membantu mereka meninggalkan proses manual dan bekerja lebih efisien. Kami juga melayani <span class="text-blue-400 font-medium">UMKM dan perusahaan skala besar</span> dengan kebutuhan sistem custom.
            </p>

            <div in:fly={{ x: -30, duration: 800, delay: 300 }} class="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a href="#products" class="group w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-blue-500/25 transition-all hover:shadow-blue-500/40 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900">
                Lihat Produk Kami
                <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                  <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </span>
              </a>
              <a href="https://wa.me/6285168657868?text=Halo%20Macroma%20Media%2C%20saya%20ingin%20berkonsultasi%20gratis%20tentang%20layanan%20Anda." target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/50 px-8 py-4 text-sm font-semibold text-slate-300 backdrop-blur-sm transition-all hover:bg-slate-800 hover:text-white hover:border-slate-600">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                Diskusi Kebutuhan Sistem Institusi Anda
              </a>
            </div>

            <!-- Trust Badges -->
            <div in:fly={{ x: -30, duration: 800, delay: 400 }} class="mt-12 pt-8 border-t border-slate-800">
              <p class="text-xs uppercase tracking-wider text-slate-500 mb-4">Berfokus pada institusi pendidikan, kami juga dipercaya oleh UMKM dan perusahaan skala besar untuk pengembangan sistem custom.</p>
              <div class="flex items-center gap-8 justify-center lg:justify-start opacity-50">
                <span class="text-slate-400 font-bold text-lg">Instansi Pendidikan</span>
                <span class="text-slate-400 font-bold text-lg">Pemerintahan</span>
                <span class="text-slate-400 font-bold text-lg">Perusahaan Perorangan</span>
              </div>
            </div>
          {/if}
        </div>

        <!-- Right: Carousel -->
        <div class="relative hidden lg:block">
          {#if mounted}
            <div in:fly={{ x: 30, duration: 800, delay: 200 }} class="relative h-[500px]">
              <HeroCarousel images={carousels} />
            </div>
          {/if}
        </div>
      </div>
    </div>
  </section>

  <!-- Stats / Trust Section -->
  <section class="border-y border-slate-800 bg-slate-900/30">
    <div class="max-w-7xl mx-auto px-6 py-12">
      <div class="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
        <div>
          <p class="text-3xl font-bold text-slate-100">50+</p>
          <p class="text-xs uppercase tracking-wider text-slate-500 mt-1">Klien Enterprise</p>
        </div>
        <div>
          <p class="text-3xl font-bold text-slate-100">120+</p>
          <p class="text-xs uppercase tracking-wider text-slate-500 mt-1">Project Selesai</p>
        </div>
        <div>
          <p class="text-3xl font-bold text-slate-100">99.9%</p>
          <p class="text-xs uppercase tracking-wider text-slate-500 mt-1">System Uptime</p>
        </div>
        <div>
          <p class="text-3xl font-bold text-slate-100">24/7</p>
          <p class="text-xs uppercase tracking-wider text-slate-500 mt-1">Support Expert</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section id="services" class="py-24 px-6 relative">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <span class="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">Our Services</span>
        <h2 class="text-3xl md:text-4xl font-bold text-slate-50 mb-4">Solusi Kami untuk Institusi Pendidikan</h2>
        <p class="text-slate-400 max-w-2xl mx-auto">Kami merancang dan membangun sistem operasional pendidikan yang disesuaikan dengan alur kerja institusi Anda — bukan sistem generik yang memaksa Anda beradaptasi.</p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        {#each services as service}
          <div class="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-8 hover:border-blue-500/50 transition-colors duration-300">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div class="relative z-10">
              <div class="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {@html service.icon}
                </svg>
              </div>
              <h3 class="text-xl font-bold text-slate-100 mb-3">{service.title}</h3>
              <p class="text-slate-400 text-sm leading-relaxed">
                {service.desc}
              </p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Products Section -->
  <section id="products" class="py-24 px-6 bg-slate-900/20 relative">
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent"></div>
    <div class="max-w-7xl mx-auto relative z-10">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span class="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">Our Products</span>
          <h2 class="text-3xl md:text-4xl font-bold text-slate-50 mb-4">Produk Unggulan</h2>
          <p class="text-slate-400 max-w-xl">Inovasi siap pakai yang dirancang untuk mengakselerasi bisnis Anda.</p>
        </div>
        <a href="#products" class="text-blue-400 hover:text-blue-300 font-medium text-sm inline-flex items-center gap-1 group">
          Lihat semua produk 
          <span class="group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </div>

      {#if products && products.length > 0}
        <div class="grid lg:grid-cols-3 gap-8">
          {#each products as product}
            <div class="group rounded-3xl bg-slate-950 border border-slate-800 p-2 hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5">
              <div class="h-full rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-900/50 overflow-hidden flex flex-col">
                <!-- Product Image -->
                <div class="aspect-video bg-slate-800 overflow-hidden relative">
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    on:error={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/400x225?text=No+Image';
                    }}
                  />
                  <!-- Badge on image -->
                  <span class="absolute top-2 right-2 px-3 py-1 rounded-full bg-blue-500/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-white border border-blue-400/20 shadow-lg">
                    {product.badge}
                  </span>
                </div>

                <!-- Product Content -->
                <div class="p-6 flex flex-col flex-grow">
                  <h3 class="text-xl font-bold text-slate-50 mb-1 group-hover:text-blue-400 transition-colors">{product.name}</h3>
                  <p class="text-blue-400 text-xs font-medium uppercase tracking-wider mb-4">{product.tagline}</p>
                  <p class="text-slate-400 text-sm mb-8 flex-grow">{product.desc}</p>

                  {#if product.hyperlink}
                    <a 
                      href={product.hyperlink}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="w-full rounded-xl bg-slate-800 py-3 text-sm font-medium text-slate-300 hover:bg-blue-600 hover:text-white transition-all border border-slate-700/50 hover:border-blue-600 text-center block"
                    >
                      Pelajari Selengkapnya
                    </a>
                  {:else}
                    <button class="w-full rounded-xl bg-slate-800 py-3 text-sm font-medium text-slate-300 hover:bg-blue-600 hover:text-white transition-all border border-slate-700/50 hover:border-blue-600">
                      Pelajari Selengkapnya
                    </button>
                  {/if}
                </div>
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <div class="rounded-2xl border border-slate-800 bg-slate-900/50 p-12 text-center">
          <svg class="w-16 h-16 mx-auto text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <p class="text-slate-400 text-lg mb-2">Belum ada produk unggulan untuk ditampilkan</p>
          <p class="text-slate-500 text-sm">Produk unggulan akan segera ditambahkan.</p>
        </div>
      {/if}
    </div>
  </section>

  <!-- Portfolio Section -->
  <section id="portfolio" class="py-24 px-6 relative">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <span class="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">Our Portfolio</span>
        <h2 class="text-3xl md:text-4xl font-bold text-slate-50 mb-4">Portofolio Kami</h2>
        <p class="text-slate-400 max-w-2xl mx-auto">Lihat hasil karya dan proyek-proyek yang telah kami kerjakan untuk berbagai klien.</p>
      </div>

      {#if portfolios && portfolios.length > 0}
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {#each portfolios as portfolio}
            <div class="group rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/5">
              <!-- Image -->
              <div class="aspect-video bg-slate-800 overflow-hidden relative">
                <img 
                  src={portfolio.image_url} 
                  alt={portfolio.description}
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  on:error={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/400x225?text=No+Image';
                  }}
                />
                <!-- Badge on image -->
                {#if portfolio.badge}
                  <span class="absolute top-2 right-2 px-2 py-1 rounded-full bg-purple-500/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-white border border-purple-400/20 shadow-lg">
                    {portfolio.badge}
                  </span>
                {/if}
              </div>
              
              <!-- Content -->
              <div class="p-6">
                <p class="text-sm text-slate-300 mb-4 line-clamp-3">
                  {portfolio.description}
                </p>
                
                {#if portfolio.hyperlink}
                  <a 
                    href={portfolio.hyperlink}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors font-medium"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Lihat Project
                  </a>
                {/if}
              </div>
            </div>
          {/each}
        </div>

        <div class="text-center">
          <a 
            href="/portfolios" 
            use:inertia
            class="inline-flex items-center justify-center gap-2 rounded-2xl border border-purple-500/30 bg-purple-500/10 px-8 py-4 text-sm font-semibold text-purple-300 backdrop-blur-sm transition-all hover:bg-purple-500/20 hover:text-purple-200 hover:border-purple-500/50"
          >
            Lihat Semua Portofolio
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      {:else}
        <div class="rounded-2xl border border-slate-800 bg-slate-900/50 p-12 text-center">
          <svg class="w-16 h-16 mx-auto text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p class="text-slate-400 text-lg mb-2">Belum ada portofolio untuk ditampilkan</p>
          <p class="text-slate-500 text-sm">Portofolio proyek akan segera ditambahkan.</p>
        </div>
      {/if}
    </div>
  </section>

  <!-- About Section -->
  <section id="about" class="py-24 px-6 relative">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <span class="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">Tentang Kami</span>
        <h2 class="text-3xl md:text-4xl font-bold text-slate-50 mb-4">Mengenal Lebih Dekat</h2>
        <p class="text-slate-400 max-w-2xl mx-auto">Macroma adalah partner teknologi yang berfokus pada pengembangan sistem operasional digital untuk institusi pendidikan. Kami membantu menggantikan proses manual dengan sistem yang lebih efisien, rapi, dan terukur.</p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Company Profile -->
        <div class="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 hover:border-cyan-500/50 transition-colors duration-300">
          <div class="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-slate-100 mb-4">Profil Perusahaan</h3>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between border-b border-slate-800 pb-2">
              <span class="text-slate-500">Nama Perusahaan</span>
              <span class="text-slate-300 font-medium">PT Macroma Media Teknologi</span>
            </div>
            <div class="flex justify-between border-b border-slate-800 pb-2">
              <span class="text-slate-500">NIB</span>
              <span class="text-slate-300 font-medium">1812250110117</span>
            </div>
            <div class="flex justify-between border-b border-slate-800 pb-2">
              <span class="text-slate-500">No. SK Kemenkumham</span>
              <span class="text-slate-300 font-medium text-right text-xs">AHU-070436.AH.01.30.Tahun 2025</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">Tahun Berdiri</span>
              <span class="text-slate-300 font-medium">2025</span>
            </div>
          </div>
        </div>

        <!-- Vision & Mission -->
        <div class="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 hover:border-cyan-500/50 transition-colors duration-300">
          <div class="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-slate-100 mb-4">Visi & Misi</h3>
          <div class="space-y-4">
            <div>
              <h4 class="text-cyan-400 font-semibold text-sm mb-2">Visi</h4>
              <p class="text-slate-400 text-sm leading-relaxed">Menjadi partner teknologi terdepan yang membantu bisnis Indonesia bertransformasi digital dengan solusi yang inovatif dan terjangkau.</p>
            </div>
            <div>
              <h4 class="text-cyan-400 font-semibold text-sm mb-2">Misi</h4>
              <ul class="text-slate-400 text-sm leading-relaxed space-y-2">
                <li class="flex items-start gap-2">
                  <span class="text-cyan-400 mt-1">•</span>
                  <span>Menyediakan solusi digital yang disesuaikan dengan kebutuhan unik setiap klien</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-cyan-400 mt-1">•</span>
                  <span>Mengutamakan kualitas dan efisiensi dalam setiap pengembangan sistem</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-cyan-400 mt-1">•</span>
                  <span>Memberikan layanan purna jual yang responsif dan profesional</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Team -->
        <div class="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 hover:border-cyan-500/50 transition-colors duration-300">
          <div class="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-slate-100 mb-4">Tim Kami</h3>
          <p class="text-slate-400 text-sm leading-relaxed mb-6">Tim profesional yang berdedikasi untuk memberikan solusi terbaik bagi bisnis Anda.</p>
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
                MF
              </div>
              <div>
                <p class="text-slate-200 font-medium">M Ferrari Firmansyah</p>
                <p class="text-slate-500 text-sm">Founder & CEO</p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                MR
              </div>
              <div>
                <p class="text-slate-200 font-medium">M Roykhan Maulana</p>
                <p class="text-slate-500 text-sm">Marketing Team</p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold">
                FR
              </div>
              <div>
                <p class="text-slate-200 font-medium">Fatqan Ramadhiansyah</p>
                <p class="text-slate-500 text-sm">Development Team</p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
        <h2 class="text-3xl md:text-5xl font-bold text-slate-50 mb-6">Siap Transformasi Digital?</h2>
        <p class="text-slate-400 max-w-xl mx-auto mb-10 text-lg">Konsultasikan kebutuhan sistem IT institusi Anda dengan tim ahli Macroma Media.</p>
        <a href="#contact" class="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-sm font-bold text-white hover:from-blue-500 hover:to-indigo-500 transition-all shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02]">
          Hubungi Kami Sekarang
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
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
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold text-lg shadow-lg shadow-blue-500/20">M</div>
            <div>
              <span class="text-xl font-bold text-slate-100">Macroma Media</span>
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
            <li><a href="#services" class="hover:text-blue-400 transition-colors">System Architecture</a></li>
            <li><a href="#services" class="hover:text-blue-400 transition-colors">Custom Development</a></li>
            <li><a href="#services" class="hover:text-blue-400 transition-colors">IT Consultancy</a></li>
            <li><a href="#services" class="hover:text-blue-400 transition-colors">Cloud Solutions</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-slate-100 font-semibold mb-6">Perusahaan</h4>
          <ul class="space-y-4 text-sm text-slate-400">
            <li><a href="#about" class="hover:text-blue-400 transition-colors">Tentang Kami</a></li>
            <li><a href="#about" class="hover:text-blue-400 transition-colors">Karir</a></li>
            <li><a href="#about" class="hover:text-blue-400 transition-colors">Blog</a></li>
            <li><a href="#contact" class="hover:text-blue-400 transition-colors">Kontak</a></li>
          </ul>
        </div>
      </div>

      <div class="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-xs text-slate-500">© {new Date().getFullYear()} Macroma Media. All rights reserved.</p>
        <div class="flex gap-6">
          <a href="#social" class="text-slate-500 hover:text-blue-400 transition-colors">
            <span class="sr-only">LinkedIn</span>
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          <a href="#social" class="text-slate-500 hover:text-blue-400 transition-colors">
             <span class="sr-only">Twitter</span>
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</main>
