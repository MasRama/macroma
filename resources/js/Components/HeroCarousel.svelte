<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fly, fade } from 'svelte/transition';

  interface CarouselImage {
    id: string;
    title: string;
    description: string | null;
    image_url: string;
    order: number;
  }

  export let images: CarouselImage[] = [];

  let currentIndex = 0;
  let autoplayInterval: ReturnType<typeof setInterval> | null = null;
  let isPaused = false;

  function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  }

  function goToSlide(index: number) {
    currentIndex = index;
  }

  function startAutoplay() {
    if (images.length <= 1) return;
    autoplayInterval = setInterval(() => {
      if (!isPaused) {
        nextSlide();
      }
    }, 5000);
  }

  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  onMount(() => {
    startAutoplay();
  });

  onDestroy(() => {
    stopAutoplay();
  });

  $: currentImage = images[currentIndex];
</script>

{#if images.length > 0}
  <div 
    class="relative w-full h-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-700/50 shadow-2xl"
    on:mouseenter={() => isPaused = true}
    on:mouseleave={() => isPaused = false}
  >
    <div class="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-cyan-500/20 rounded-[2rem] blur-2xl"></div>
    
    <div class="relative h-full">
      {#key currentIndex}
        <div 
          class="absolute inset-0"
          in:fade={{ duration: 500 }}
        >
          <img 
            src={currentImage.image_url} 
            alt={currentImage.title}
            class="w-full h-full object-cover"
            on:error={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
            }}
          />
          
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
          
          <div class="absolute bottom-0 left-0 right-0 p-8">
            <h3 class="text-2xl font-bold text-white mb-2" in:fly={{ y: 20, duration: 500, delay: 200 }}>
              {currentImage.title}
            </h3>
            {#if currentImage.description}
              <p class="text-slate-300 text-sm max-w-2xl" in:fly={{ y: 20, duration: 500, delay: 300 }}>
                {currentImage.description}
              </p>
            {/if}
          </div>
        </div>
      {/key}

      {#if images.length > 1}
        <button
          on:click={prevSlide}
          class="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-700 flex items-center justify-center text-white hover:bg-slate-800 transition-all hover:scale-110"
          aria-label="Previous slide"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          on:click={nextSlide}
          class="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-700 flex items-center justify-center text-white hover:bg-slate-800 transition-all hover:scale-110"
          aria-label="Next slide"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {#each images as _, index}
            <button
              on:click={() => goToSlide(index)}
              class="w-2 h-2 rounded-full transition-all {index === currentIndex ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'}"
              aria-label="Go to slide {index + 1}"
            ></button>
          {/each}
        </div>
      {/if}

      <div class="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30">
        <span class="text-xs font-bold text-white">About Us</span>
      </div>
    </div>
  </div>
{:else}
  <div class="relative w-full h-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-700/50 flex items-center justify-center">
    <div class="text-center p-8">
      <svg class="w-16 h-16 mx-auto text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p class="text-slate-500 text-sm">No carousel images available</p>
    </div>
  </div>
{/if}
