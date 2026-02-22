<script lang="ts">
  import { inertia, page } from '@inertiajs/svelte'
  import { fly } from 'svelte/transition'
  import { onMount } from 'svelte'
  
  let mounted = false
  let scrollY = 0

  onMount(() => { 
    mounted = true 
    window.addEventListener('scroll', () => {
      scrollY = window.scrollY
    })
    return () => {
      window.removeEventListener('scroll', () => {})
    }
  })

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
    id: string;
    title: string;
    desc: string;
    icon: string;
    highlight?: boolean;
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

  const PAGE_SIZE = 6;

  // Products pagination
  let productPage = 1;
  $: productTotalPages = Math.ceil(products.length / PAGE_SIZE);
  $: pagedProducts = products.slice((productPage - 1) * PAGE_SIZE, productPage * PAGE_SIZE);

  // Portfolios pagination
  let portfolioPage = 1;
  $: portfolioTotalPages = Math.ceil(portfolios.length / PAGE_SIZE);
  $: pagedPortfolios = portfolios.slice((portfolioPage - 1) * PAGE_SIZE, portfolioPage * PAGE_SIZE);

  // Helper for smooth scroll
  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  function goProductPage(p: number) {
    productPage = p;
    scrollTo('work');
  }

  function goPortfolioPage(p: number) {
    portfolioPage = p;
    scrollTo('portfolio-section');
  }

  function handleProductImgError(e: Event) {
    const img = e.target as HTMLImageElement;
    img.src = 'https://via.placeholder.com/800x600?text=Macroma+Product';
  }
</script>

<svelte:window bind:scrollY={scrollY} />

<div class="min-h-screen bg-[#050505] text-[#e1e1e1] selection:bg-blue-600 selection:text-white font-sans overflow-x-hidden">
  
  <!-- Noise Texture Overlay -->
  <div class="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-overlay" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');"></div>

  <!-- Navigation -->
  <nav class="fixed top-0 w-full z-40 px-6 py-6 flex justify-between items-center mix-blend-difference text-white transition-transform duration-500 {scrollY > 50 ? '-translate-y-4 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}">
    <a href="/" class="flex items-center gap-2 group">
      <img src="/public/macroma.png" alt="Macroma Logo" class="h-10 w-auto object-contain brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300" />
    </a>
    <div class="hidden md:flex gap-8 text-sm font-medium tracking-wide">
      <button on:click={() => scrollTo('services')} class="hover:text-blue-400 transition-colors">LAYANAN</button>
      <button on:click={() => scrollTo('work')} class="hover:text-blue-400 transition-colors">KARYA</button>
      <button on:click={() => scrollTo('about')} class="hover:text-blue-400 transition-colors">TENTANG</button>
    </div>
    <div class="flex items-center gap-4">
      {#if user && user.id}
        <a href="/dashboard" use:inertia class="text-sm font-bold border-b border-white hover:border-blue-500 hover:text-blue-500 transition-all pb-0.5">DASHBOARD</a>
      {:else}
        <a href="/login" use:inertia class="text-sm font-bold border-b border-transparent hover:border-white transition-all pb-0.5">MASUK</a>
      {/if}
    </div>
  </nav>

  <!-- Sticky Header on Scroll -->
  <div class="fixed top-6 left-6 z-40 transition-all duration-500 mix-blend-difference text-white {scrollY > 50 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}">
     <img src="/public/macroma.png" alt="M." class="h-8 w-auto object-contain brightness-0 invert" />
  </div>

  <div class="fixed top-6 right-6 z-40 transition-all duration-500 {scrollY > 50 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}">
    <a href="https://wa.me/6285168657868" target="_blank" class="bg-white text-black px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-colors">
      Mulai Proyek
    </a>
  </div>

  <main>
    <!-- HERO SECTION -->
    <section class="relative min-h-screen flex flex-col justify-center px-6 pt-32 pb-20 overflow-hidden">
      <!-- Background Gradients -->
      <div class="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[4s]"></div>
      <div class="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div class="max-w-[1600px] mx-auto w-full z-10">
        {#if mounted}
          <div in:fly={{ y: 100, duration: 1000, delay: 0 }} class="flex flex-col">
            <h1 class="text-[12vw] leading-[0.85] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-slate-500 mix-blend-screen">
              EVOLUSI
            </h1>
            <div class="flex items-center gap-4 md:gap-12 ml-2 md:ml-4">
              <span class="h-px w-12 md:w-32 bg-blue-600"></span>
              <p class="text-sm md:text-xl text-slate-400 max-w-md font-light leading-relaxed">
                Kami merancang sistem operasional untuk institusi pendidikan dan perusahaan masa depan.
              </p>
            </div>
            <h1 class="text-[12vw] leading-[0.85] font-black tracking-tighter text-right text-transparent bg-clip-text bg-gradient-to-br from-slate-400 via-white to-white mix-blend-screen">
              DIGITAL
            </h1>
          </div>
        {/if}

        <div class="mt-20 md:mt-32 flex flex-col md:flex-row justify-between items-end border-t border-white/10 pt-8">
          <div class="flex flex-col gap-2">
            <span class="text-xs text-slate-500 uppercase tracking-widest">Est. 2025</span>
            <span class="text-xs text-slate-500 uppercase tracking-widest">Berbasis di Indonesia</span>
          </div>
          
          <div class="flex gap-4 mt-8 md:mt-0">
             <div class="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center animate-bounce">
                <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
             </div>
          </div>
        </div>
      </div>
    </section>

    <!-- NARRATIVE SECTION -->
    <section class="py-32 px-6 border-t border-white/5 bg-[#080808]">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-12 gap-12">
          <div class="md:col-span-4">
             <span class="inline-block w-3 h-3 bg-blue-600 rounded-full mb-4"></span>
             <h2 class="text-sm font-bold uppercase tracking-[0.2em] text-slate-500 mb-8">FILOSOFI KAMI</h2>
          </div>
          <div class="md:col-span-8">
             <p class="text-3xl md:text-5xl lg:text-6xl font-medium leading-tight text-white mb-12">
               Bukan sekadar software. Kami <span class="text-blue-500 italic font-serif">merancang</span> efisiensi.
             </p>
             <div class="grid md:grid-cols-2 gap-12">
               <p class="text-slate-400 text-lg leading-relaxed">
                 Macroma menghilangkan hambatan proses manual. Untuk institusi pendidikan, kami menggantikan tumpukan kertas dengan alur kerja digital yang ramping. Untuk bisnis, kami mengubah kekacauan menjadi data terstruktur.
               </p>
               <p class="text-slate-400 text-lg leading-relaxed">
                 Pendekatan kami personal. Tanpa template generik. Kami mendalami kebutuhan operasional Anda untuk membangun sistem yang pas seperti setelan jas yang dijahit khusus.
               </p>
             </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SERVICES (BENTO GRID STYLE) -->
    <section id="services" class="py-32 px-6">
      <div class="max-w-[1600px] mx-auto">
        <div class="flex justify-between items-end mb-20">
          <h2 class="text-6xl md:text-8xl font-bold tracking-tighter text-white">LAYANAN</h2>
          <span class="text-right text-slate-500 hidden md:block">/// KEAHLIAN KAMI</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[400px]">
          <!-- Service 1 -->
          <div class="group relative md:col-span-2 rounded-3xl bg-[#111] border border-white/5 p-10 overflow-hidden hover:border-blue-600/50 transition-colors duration-500">
             <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-b from-blue-600/10 to-transparent rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover:bg-blue-600/20 transition-all duration-700"></div>
             <div class="relative z-10 h-full flex flex-col justify-between">
                <div class="flex justify-between items-start">
                   <span class="text-4xl font-serif italic text-white/20">01</span>
                   <svg class="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                </div>
                <div>
                   <h3 class="text-4xl font-bold text-white mb-4">Arsitektur Sistem</h3>
                   <p class="text-slate-400 text-xl max-w-lg">Membangun tulang punggung operasional digital Anda. Desain database dan infrastruktur server yang skalabel, aman, dan siap masa depan.</p>
                </div>
             </div>
          </div>

          <!-- Service 2 -->
          <div class="group relative md:col-span-1 rounded-3xl bg-[#111] border border-white/5 p-10 overflow-hidden hover:bg-blue-600 transition-colors duration-500">
             <div class="relative z-10 h-full flex flex-col justify-between">
                <div class="flex justify-between items-start">
                   <span class="text-4xl font-serif italic text-white/20 group-hover:text-white/40">02</span>
                   <svg class="w-12 h-12 text-blue-500 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                </div>
                <div>
                   <h3 class="text-3xl font-bold text-white mb-4">Pengembangan Kustom</h3>
                   <p class="text-slate-400 group-hover:text-blue-100">Solusi perangkat lunak khusus yang selaras sempurna dengan logika bisnis Anda.</p>
                </div>
             </div>
          </div>

           <!-- Service 3 -->
           <div class="group relative md:col-span-1 rounded-3xl bg-[#111] border border-white/5 p-10 overflow-hidden hover:border-blue-600/50 transition-colors duration-500">
            <div class="relative z-10 h-full flex flex-col justify-between">
               <div class="flex justify-between items-start">
                  <span class="text-4xl font-serif italic text-white/20">03</span>
                  <svg class="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               </div>
               <div>
                  <h3 class="text-3xl font-bold text-white mb-4">Transformasi</h3>
                  <p class="text-slate-400">Konsultasi untuk memandu transisi Anda dari analog ke digital.</p>
               </div>
            </div>
         </div>

         <!-- CTA Block -->
         <div class="md:col-span-2 rounded-3xl bg-gradient-to-br from-blue-900 to-slate-900 p-10 flex flex-col justify-center items-center text-center border border-white/10 relative overflow-hidden">
             <!-- Corrected Noise Texture -->
             <div class="absolute inset-0 opacity-10 mix-blend-overlay" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');"></div>
             <h3 class="text-4xl md:text-5xl font-bold text-white mb-6 z-10">Punya masalah kompleks?</h3>
             <a href="https://wa.me/6285168657868" target="_blank" class="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:scale-105 transition-transform z-10">
                Mari Diskusi
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
             </a>
         </div>
        </div>
      </div>
    </section>

    <!-- SELECTED WORKS / PRODUCTS -->
    <section id="work" class="py-32 bg-[#0a0a0a] border-t border-white/5 overflow-hidden">
      <div class="max-w-[1600px] mx-auto px-6">
         <div class="mb-20">
            <h2 class="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-4">UNGGULAN</h2>
            <p class="text-xl text-slate-500">Produk unggulan dan implementasi sukses kami.</p>
         </div>

         <!-- Horizontal Scroll Concept (Simplified to stacked for robust implementation) -->
         <div class="space-y-32">
            {#each pagedProducts as product, i}
               <div class="group grid md:grid-cols-2 gap-12 items-center">
                  <!-- Image Side -->
                  <div class="{i % 2 === 1 ? 'md:order-2' : ''} relative aspect-[4/3] overflow-hidden rounded-sm">
                     <div class="absolute inset-0 bg-blue-600/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
                     <img 
                       src={product.image_url} 
                       alt={product.name} 
                       class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                       on:error={handleProductImgError}
                     />
                  </div>
                  
                  <!-- Text Side -->
                  <div class="{i % 2 === 1 ? 'md:order-1 md:text-right' : ''} relative">
                     <span class="text-blue-500 font-mono text-sm mb-4 block">PRODUK // {product.badge}</span>
                     <h3 class="text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight">{product.name}</h3>
                     <p class="text-slate-400 text-lg mb-8 max-w-md {i % 2 === 1 ? 'ml-auto' : ''}">
                        {product.desc}
                     </p>
                     
                     {#if product.hyperlink}
                        <a href={product.hyperlink} target="_blank" class="text-white border-b border-white pb-1 hover:text-blue-500 hover:border-blue-500 transition-colors inline-flex items-center gap-2">
                           LIHAT PROYEK <sup class="text-[10px]">↗</sup>
                        </a>
                     {:else}
                        <span class="text-slate-600 cursor-not-allowed">SEGERA HADIR</span>
                     {/if}
                  </div>
               </div>
            {/each}
         </div>

         <!-- Products Pagination -->
         {#if productTotalPages > 1}
         <div class="flex justify-center items-center gap-2 mt-16">
            <button
               on:click={() => goProductPage(productPage - 1)}
               disabled={productPage === 1}
               class="px-4 py-2 rounded border border-white/20 text-slate-400 hover:border-white hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-sm"
            >
               ← Prev
            </button>
            {#each Array.from({ length: productTotalPages }, (_, i) => i + 1) as p}
               <button
                  on:click={() => goProductPage(p)}
                  class="w-9 h-9 rounded border text-sm font-bold transition-colors {p === productPage ? 'border-blue-600 bg-blue-600 text-white' : 'border-white/20 text-slate-400 hover:border-white hover:text-white'}"
               >
                  {p}
               </button>
            {/each}
            <button
               on:click={() => goProductPage(productPage + 1)}
               disabled={productPage === productTotalPages}
               class="px-4 py-2 rounded border border-white/20 text-slate-400 hover:border-white hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-sm"
            >
               Next →
            </button>
         </div>
         {/if}

         <!-- Portfolio Grid -->
         {#if portfolios.length > 0}
         <div id="portfolio-section" class="mt-40">
            <div class="flex items-center gap-4 mb-12">
               <span class="h-px bg-white/20 flex-grow"></span>
               <span class="text-sm font-bold tracking-widest uppercase text-slate-500">Karya Lainnya</span>
               <span class="h-px bg-white/20 flex-grow"></span>
            </div>
            
            <div class="grid md:grid-cols-3 gap-8">
               {#each pagedPortfolios as portfolio}
                  <a href={portfolio.hyperlink || '#'} target="_blank" class="block group">
                     <div class="aspect-video bg-[#111] overflow-hidden relative mb-4">
                        <img 
                           src={portfolio.image_url} 
                           alt="Portfolio" 
                           class="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        />
                     </div>
                     <h4 class="text-white font-bold text-lg group-hover:text-blue-500 transition-colors">{portfolio.description.substring(0, 50)}...</h4>
                     <span class="text-xs text-slate-500 uppercase mt-1 block">{portfolio.badge}</span>
                  </a>
               {/each}
            </div>

            <!-- Portfolio Pagination -->
            {#if portfolioTotalPages > 1}
            <div class="flex justify-center items-center gap-2 mt-12">
               <button
                  on:click={() => goPortfolioPage(portfolioPage - 1)}
                  disabled={portfolioPage === 1}
                  class="px-4 py-2 rounded border border-white/20 text-slate-400 hover:border-white hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-sm"
               >
                  ← Prev
               </button>
               {#each Array.from({ length: portfolioTotalPages }, (_, i) => i + 1) as p}
                  <button
                     on:click={() => goPortfolioPage(p)}
                     class="w-9 h-9 rounded border text-sm font-bold transition-colors {p === portfolioPage ? 'border-blue-600 bg-blue-600 text-white' : 'border-white/20 text-slate-400 hover:border-white hover:text-white'}"
                  >
                     {p}
                  </button>
               {/each}
               <button
                  on:click={() => goPortfolioPage(portfolioPage + 1)}
                  disabled={portfolioPage === portfolioTotalPages}
                  class="px-4 py-2 rounded border border-white/20 text-slate-400 hover:border-white hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-sm"
               >
                  Next →
               </button>
            </div>
            {/if}
         </div>
         {/if}
      </div>
    </section>

    <!-- FOOTER -->
    <footer id="about" class="bg-[#050505] pt-32 pb-12 px-6 border-t border-white/10">
       <div class="max-w-[1600px] mx-auto">
          <div class="grid md:grid-cols-2 gap-20 mb-32">
             <div>
                <h2 class="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8 leading-none">
                   MARI BANGUN<br>
                   <span class="text-blue-600">MASA DEPAN.</span>
                </h2>
                <a href="https://wa.me/6285168657868" class="inline-block border-2 border-white/20 text-white rounded-full px-10 py-4 text-lg font-bold hover:bg-white hover:text-black transition-colors uppercase tracking-widest">
                   Mulai Percakapan
                </a>
             </div>
             
             <div class="grid grid-cols-2 gap-12">
                <div>
                   <h4 class="text-slate-500 uppercase tracking-widest text-xs mb-6">Sosial Media</h4>
                   <ul class="space-y-4">
                      <li><a href="#" class="text-white text-xl hover:text-blue-500 transition-colors">Instagram</a></li>
                      <li><a href="#" class="text-white text-xl hover:text-blue-500 transition-colors">LinkedIn</a></li>
                      <li><a href="#" class="text-white text-xl hover:text-blue-500 transition-colors">Twitter</a></li>
                   </ul>
                </div>
                <div>
                   <h4 class="text-slate-500 uppercase tracking-widest text-xs mb-6">Kontak</h4>
                   <p class="text-white text-lg mb-2">hello@macroma.media</p>
                   <p class="text-white text-lg">+62 851-6865-7868</p>
                   <p class="text-slate-500 mt-4 text-sm">Malang, Jawa Timur<br>Indonesia</p>
                </div>
             </div>
          </div>

          <div class="flex flex-col md:flex-row justify-between items-end pt-12 border-t border-white/10">
             <div class="mb-8 md:mb-0">
                <span class="text-[10vw] md:text-[8vw] font-black text-white/5 leading-none select-none">MACROMA</span>
             </div>
             <div class="text-right">
                <p class="text-slate-600 text-xs uppercase tracking-widest">© {new Date().getFullYear()} Macroma Media Teknologi.<br>Semua Hak Dilindungi.</p>
             </div>
          </div>
       </div>
    </footer>
  </main>
</div>

<style>
  /* Custom scrollbar for webkit */
  :global(::-webkit-scrollbar) {
    width: 8px;
  }
  
  :global(::-webkit-scrollbar-track) {
    background: #050505; 
  }
 
  :global(::-webkit-scrollbar-thumb) {
    background: #333; 
    border-radius: 4px;
  }

  :global(::-webkit-scrollbar-thumb:hover) {
    background: #555; 
  }
  
  /* Smooth scroll behavior */
  :global(html) {
    scroll-behavior: smooth;
  }
</style>
