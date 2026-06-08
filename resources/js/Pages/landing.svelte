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

  interface Service {
    title: string;
    desc: string;
    icon: string;
  }

  interface Product {
    name: string;
    tagline: string;
    desc: string;
    badge: string;
    image_url: string;
    type: string;
    hyperlink: string | null;
  }

  interface CarouselImage {
    id: string;
    title: string;
    description: string | null;
    image_url: string;
    order: number;
  }

  interface Portfolio {
    id: string;
    description: string;
    image_url: string;
    hyperlink: string | null;
    badge?: string;
  }

  let user = $page.props.user as User | undefined
  let carousels = $page.props.carousels as CarouselImage[] || []
  let portfolios = $page.props.portfolios as Portfolio[] || []
  let products = $page.props.products as Product[] || []
  let teamsData = $page.props.teams as any[] || []

  // ── Pagination state ──
  const ITEMS_PER_PAGE = 9
  let productPage = 1
  let portfolioPage = 1

  $: totalProductPages = Math.max(1, Math.ceil(products.length / ITEMS_PER_PAGE))
  $: totalPortfolioPages = Math.max(1, Math.ceil(portfolios.length / ITEMS_PER_PAGE))

  $: paginatedProducts = products.slice((productPage - 1) * ITEMS_PER_PAGE, productPage * ITEMS_PER_PAGE)
  $: paginatedPortfolios = portfolios.slice((portfolioPage - 1) * ITEMS_PER_PAGE, portfolioPage * ITEMS_PER_PAGE)

  function goToProductPage(p: number) {
    if (p < 1 || p > totalProductPages) return
    productPage = p
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
  }

  function goToPortfolioPage(p: number) {
    if (p < 1 || p > totalPortfolioPages) return
    portfolioPage = p
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
  }

  // ── Portfolio detail modal ──
  let selectedPortfolio: Portfolio | null = null

  function openPortfolioDetail(portfolio: Portfolio) {
    selectedPortfolio = portfolio
    document.body.style.overflow = 'hidden'
  }

  function closePortfolioDetail() {
    selectedPortfolio = null
    document.body.style.overflow = ''
  }

  // ── Static data ──
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

  function getTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      'software': 'Software',
      'service': 'Service',
      'hardware': 'Hardware',
      'saas': 'SaaS'
    };
    return labels[type] || type;
  }

  function getTypeBadgeColor(type: string): string {
    switch (type) {
      case 'software': return 'bg-blue-500/15 text-blue-300 border-blue-500/20';
      case 'service': return 'bg-purple-500/15 text-purple-300 border-purple-500/20';
      case 'hardware': return 'bg-orange-500/15 text-orange-300 border-orange-500/20';
      case 'saas': return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/20';
      default: return 'bg-slate-500/15 text-slate-300 border-slate-500/20';
    }
  }

  // Build pagination page numbers
  function getPageNumbers(current: number, total: number): number[] {
    const pages: number[] = []
    const maxVisible = 5
    let start = Math.max(1, current - Math.floor(maxVisible / 2))
    let end = Math.min(total, start + maxVisible - 1)
    if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1)
    for (let i = start; i <= end; i++) pages.push(i)
    return pages
  }
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
      <img src="/public/macroma.png" alt="Macroma Logo" class="h-10 w-10 rounded-xl object-contain" />
      <div class="flex flex-col leading-none">
        <span class="text-lg font-bold tracking-tight text-slate-100">Macroma</span>
        <span class="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-semibold">Media Teknologi</span>
      </div>
    </a>

    <nav class="hidden md:flex items-center gap-8">
      <a href="#services" class="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">Solusi</a>
      <a href="#products" class="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">Produk</a>
      <a href="#portfolio" class="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">Portfolio</a>
      <a href="#about" class="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">Tentang Kami</a>
    </nav>

    <div class="flex items-center gap-4">
      <a
        href="https://wa.me/6285168657868?text=Halo%20Macroma%2C%20saya%20ingin%20bertanya%20tentang%20layanan%20Anda."
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 transition-all hover:shadow-[0_0_24px_-5px_rgba(34,197,94,0.6)]"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        Hubungi Kami
      </a>
    </div>
  </div>
</header>

<main class="relative overflow-hidden">
  <!-- Hero Section -->
  <section class="relative min-h-screen flex items-center justify-center px-6 py-20">
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
              Kami adalah partner teknologi yang mengubah <span class="text-white font-medium">tantangan operasional</span> menjadi <span class="text-blue-400 font-medium">solusi digital yang elegan</span>. Dari konsep hingga deployment.
            </p>

            <div in:fly={{ x: -30, duration: 800, delay: 300 }} class="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a href="#products" class="group w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-blue-500/25 transition-all hover:shadow-blue-500/40 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900">
                Lihat Produk Kami
                <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                  <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </span>
              </a>
              <a href="#services" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/50 px-8 py-4 text-sm font-semibold text-slate-300 backdrop-blur-sm transition-all hover:bg-slate-800 hover:text-white hover:border-slate-600">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                Konsultasi Gratis
              </a>
            </div>

            <!-- Trust Badges -->
            <div in:fly={{ x: -30, duration: 800, delay: 400 }} class="mt-12 pt-8 border-t border-slate-800">
              <p class="text-xs uppercase tracking-wider text-slate-500 mb-4">Dipercaya oleh berbagai client</p>
              <div class="flex items-center gap-8 justify-center lg:justify-start opacity-70">
                <span class="text-slate-400 font-bold text-sm">Instansi Pendidikan</span>
                <span class="text-slate-400 font-bold text-sm">Pemerintahan</span>
                <span class="text-slate-400 font-bold text-sm">Perusahaan Perorangan</span>
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
        <h2 class="text-3xl md:text-4xl font-bold text-slate-50 mb-4">Solving Problems with Systems</h2>
        <p class="text-slate-400 max-w-2xl mx-auto">Setiap pekerjaan memiliki langkah kerja yang unik, dan sistem digital harus mampu menyesuaikannya. Kami menyediakan layanan pembuatan aplikasi by request untuk membantu pekerjaan Anda menjadi lebih cepat, rapi, dan efisien.</p>
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
      <div class="mb-16">
        <span class="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">Our Products</span>
        <h2 class="text-3xl md:text-4xl font-bold text-slate-50 mb-4">Produk Unggulan</h2>
        <p class="text-slate-400 max-w-xl">Inovasi siap pakai yang dirancang untuk mengakselerasi bisnis Anda.</p>
      </div>

      {#if products.length > 0}
        <div class="grid lg:grid-cols-3 gap-8">
          {#each paginatedProducts as product}
            <div class="group rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden hover:border-slate-700 transition-colors">
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
                <span class="absolute top-2 right-2 px-2 py-1 rounded-full text-[10px] font-medium border {getTypeBadgeColor(product.type)}">
                  {getTypeLabel(product.type)}
                </span>
              </div>
              <div class="p-4">
                <div class="flex items-start justify-between mb-2">
                  <h3 class="text-base font-semibold text-slate-100">{product.name}</h3>
                  <span class="px-2 py-0.5 rounded-full bg-blue-500/10 text-[10px] font-bold uppercase tracking-wider text-blue-400 border border-blue-500/20">
                    {product.badge}
                  </span>
                </div>
                <p class="text-xs text-blue-400 font-medium uppercase tracking-wider mb-2">{product.tagline}</p>
                <p class="text-sm text-slate-300 mb-3 line-clamp-2">{product.desc}</p>
                
                {#if product.hyperlink}
                  <a 
                    href={product.hyperlink}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Lihat Produk
                  </a>
                {/if}
              </div>
            </div>
          {/each}
        </div>

        <!-- Products Pagination -->
        {#if totalProductPages > 1}
          <div class="flex items-center justify-center gap-2 mt-10">
            <button
              class="px-3.5 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-sm font-medium transition disabled:opacity-40 disabled:cursor-not-allowed border border-slate-700/50"
              on:click={() => goToProductPage(productPage - 1)}
              disabled={productPage <= 1}
            >
              ← Prev
            </button>
            {#each getPageNumbers(productPage, totalProductPages) as pNum}
              <button
                class="px-3.5 py-2 rounded-lg text-sm font-medium transition border {pNum === productPage ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700/50'}"
                on:click={() => goToProductPage(pNum)}
              >
                {pNum}
              </button>
            {/each}
            <button
              class="px-3.5 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-sm font-medium transition disabled:opacity-40 disabled:cursor-not-allowed border border-slate-700/50"
              on:click={() => goToProductPage(productPage + 1)}
              disabled={productPage >= totalProductPages}
            >
              Next →
            </button>
          </div>
          <p class="text-center text-xs text-slate-500 mt-3">Menampilkan {(productPage-1)*ITEMS_PER_PAGE+1}–{Math.min(productPage*ITEMS_PER_PAGE, products.length)} dari {products.length} produk</p>
        {/if}
      {:else}
        <div class="text-center py-16">
          <svg class="w-16 h-16 mx-auto text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <p class="text-slate-500">Produk akan segera hadir</p>
        </div>
      {/if}
    </div>
  </section>

  <!-- Portfolio Section -->
  <section id="portfolio" class="py-24 px-6 relative">
    <div class="max-w-7xl mx-auto">
      <div class="mb-16">
        <span class="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">Portfolio</span>
        <h2 class="text-3xl md:text-4xl font-bold text-slate-50 mb-4">Karya Kami</h2>
        <p class="text-slate-400 max-w-xl">Beberapa proyek yang telah kami kerjakan untuk berbagai klien.</p>
      </div>

      {#if portfolios.length > 0}
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {#each paginatedPortfolios as portfolio}
            <div class="group rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden hover:border-slate-700 transition-colors">
              <div class="aspect-video bg-slate-800 overflow-hidden relative">
                <img 
                  src={portfolio.image_url} 
                  alt={portfolio.badge || 'Portfolio'}
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  on:error={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/600x400?text=Portfolio';
                  }}
                />
                {#if portfolio.badge}
                  <span class="absolute top-2 right-2 px-2 py-1 rounded-full bg-blue-500/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-white border border-blue-400/20 shadow-lg">
                    {portfolio.badge}
                  </span>
                {/if}
              </div>
              <div class="p-4">
                <h3 class="text-base font-semibold text-slate-100 mb-2 group-hover:text-cyan-400 transition-colors">{portfolio.badge || 'Project'}</h3>
                <p class="text-sm text-slate-300 mb-3 line-clamp-2">{portfolio.description}</p>
                <div class="flex items-center gap-3">
                  <button 
                    class="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                    on:click={() => openPortfolioDetail(portfolio)}
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Lihat Project
                  </button>
                  {#if portfolio.hyperlink}
                    <a 
                      href={portfolio.hyperlink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Kunjungi Situs
                    </a>
                  {/if}
                </div>
              </div>
            </div>
          {/each}
        </div>

        <!-- Portfolio Pagination -->
        {#if totalPortfolioPages > 1}
          <div class="flex items-center justify-center gap-2 mt-10">
            <button
              class="px-3.5 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-sm font-medium transition disabled:opacity-40 disabled:cursor-not-allowed border border-slate-700/50"
              on:click={() => goToPortfolioPage(portfolioPage - 1)}
              disabled={portfolioPage <= 1}
            >
              ← Prev
            </button>
            {#each getPageNumbers(portfolioPage, totalPortfolioPages) as pNum}
              <button
                class="px-3.5 py-2 rounded-lg text-sm font-medium transition border {pNum === portfolioPage ? 'bg-cyan-600 text-white border-cyan-500' : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700/50'}"
                on:click={() => goToPortfolioPage(pNum)}
              >
                {pNum}
              </button>
            {/each}
            <button
              class="px-3.5 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-sm font-medium transition disabled:opacity-40 disabled:cursor-not-allowed border border-slate-700/50"
              on:click={() => goToPortfolioPage(portfolioPage + 1)}
              disabled={portfolioPage >= totalPortfolioPages}
            >
              Next →
            </button>
          </div>
          <p class="text-center text-xs text-slate-500 mt-3">Menampilkan {(portfolioPage-1)*ITEMS_PER_PAGE+1}–{Math.min(portfolioPage*ITEMS_PER_PAGE, portfolios.length)} dari {portfolios.length} project</p>
        {/if}
      {:else}
        <div class="text-center py-16">
          <svg class="w-16 h-16 mx-auto text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p class="text-slate-500">Portfolio akan segera hadir</p>
        </div>
      {/if}
    </div>
  </section>

  <!-- About Us Section -->
  <section id="about" class="py-24 px-6 bg-slate-900/30">
    <div class="max-w-7xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <span class="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">Tentang Kami</span>
        <h2 class="text-3xl md:text-4xl font-bold text-slate-50 mb-4">PT Macroma Media Teknologi</h2>
        <p class="text-slate-400 max-w-2xl mx-auto">Partner teknologi terpercaya untuk solusi sistem informasi dan transformasi digital.</p>
      </div>

      <!-- Company Profile Cards -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        <div class="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 text-center hover:border-blue-500/30 transition-colors">
          <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <p class="text-xs text-slate-500 uppercase tracking-wider mb-2">Nama Perusahaan</p>
          <p class="text-base font-semibold text-white">{companyProfile.name}</p>
        </div>

        <div class="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 text-center hover:border-green-500/30 transition-colors">
          <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-green-500/10 flex items-center justify-center">
            <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p class="text-xs text-slate-500 uppercase tracking-wider mb-2">NIB</p>
          <p class="text-base font-semibold text-white">{companyProfile.nib}</p>
        </div>

        <div class="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 text-center hover:border-purple-500/30 transition-colors">
          <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-purple-500/10 flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <p class="text-xs text-slate-500 uppercase tracking-wider mb-2">SK Kemenkumham</p>
          <p class="text-sm font-semibold text-white">{companyProfile.skKemenkumham}</p>
        </div>

        <div class="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 text-center hover:border-cyan-500/30 transition-colors">
          <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-cyan-500/10 flex items-center justify-center">
            <svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p class="text-xs text-slate-500 uppercase tracking-wider mb-2">Tahun Berdiri</p>
          <p class="text-base font-semibold text-white">{companyProfile.tahunBerdiri}</p>
        </div>
      </div>

      <!-- Visi & Misi -->
      <div class="grid lg:grid-cols-2 gap-10 mb-20">
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
          <p class="text-slate-300 text-lg leading-relaxed">{visiMisi.visi}</p>
        </div>

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

      <!-- Team -->
      <div class="text-center mb-12">
        <span class="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">Our Team</span>
        <h3 class="text-2xl md:text-3xl font-bold text-slate-50 mb-4">Tim Kami</h3>
        <p class="text-slate-400 max-w-2xl mx-auto">Profesional berpengalaman yang berkomitmen untuk memberikan solusi terbaik.</p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        {#each teamsData as member}
          <div class="group rounded-3xl bg-slate-900/80 border border-slate-800 p-8 text-center hover:border-cyan-500/30 transition-all duration-300">
            <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center overflow-hidden">
              {#if member.photo_url}
                <img src={member.photo_url} alt={member.name} class="w-full h-full object-cover" on:error={(e) => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden') }} />
                <svg class="w-12 h-12 text-white hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              {:else}
                <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              {/if}
            </div>
            <h4 class="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{member.name}</h4>
            <p class="text-cyan-400 text-sm font-medium mb-4">{member.position}</p>
            <p class="text-slate-400 text-sm">{member.jobdesk}</p>
          </div>
        {/each}
        {#if teamsData.length === 0}
          <div class="col-span-full text-center py-8">
            <p class="text-slate-500">Tim akan segera hadir</p>
          </div>
        {/if}
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
            <li><a href="#portfolio" class="hover:text-blue-400 transition-colors">Portfolio</a></li>
            <li><a href="#products" class="hover:text-blue-400 transition-colors">Produk</a></li>
          </ul>
        </div>
      </div>

      <div class="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-xs text-slate-500">&copy; {new Date().getFullYear()} Macroma Media Teknologi. All rights reserved.</p>
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

<!-- Portfolio Detail Modal -->
{#if selectedPortfolio}
  <div 
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    on:click|self={closePortfolioDetail}
    on:keydown={(e) => { if (e.key === 'Escape') closePortfolioDetail() }}
    role="dialog"
    aria-modal="true"
    tabindex="-1"
  >
    <div class="w-full max-w-2xl rounded-3xl border border-slate-700/50 bg-slate-900/95 shadow-2xl overflow-hidden" in:fly={{ y: 20, duration: 300 }}>
      <!-- Modal Image -->
      <div class="aspect-video bg-slate-800 overflow-hidden relative">
        <img 
          src={selectedPortfolio.image_url} 
          alt={selectedPortfolio.badge || 'Portfolio'}
          class="w-full h-full object-cover"
          on:error={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/800x450?text=Portfolio';
          }}
        />
        {#if selectedPortfolio.badge}
          <span class="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-blue-500/90 backdrop-blur-sm text-xs font-bold uppercase tracking-wider text-white border border-blue-400/20 shadow-lg">
            {selectedPortfolio.badge}
          </span>
        {/if}
        <button 
          class="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          on:click={closePortfolioDetail}
          aria-label="Tutup detail project"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Modal Content -->
      <div class="p-6 md:p-8">
        <h3 class="text-xl md:text-2xl font-bold text-white mb-3">{selectedPortfolio.badge || 'Project'}</h3>
        <p class="text-slate-300 leading-relaxed mb-6">{selectedPortfolio.description}</p>
        
        <div class="flex items-center gap-3 flex-wrap">
          {#if selectedPortfolio.hyperlink}
            <a 
              href={selectedPortfolio.hyperlink} 
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 px-5 py-2.5 text-sm font-medium text-white transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Kunjungi Situs
            </a>
          {/if}
          <button 
            class="inline-flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300 transition-colors"
            on:click={closePortfolioDetail}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
