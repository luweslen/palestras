<script setup lang="ts">
withDefaults(defineProps<{
  bgColor?: 'primary' | 'secondary';
}>(), {});
</script>

<template>
  <div class="slidev-layout center" :class="{
    'bg-primary': bgColor === 'primary',
    'bg-secondary': bgColor === 'secondary'
  }">
    <div class="relative h-full w-full flex-col flex justify-center items-center">
      <slot></slot>
    </div>
  </div>
</template>

<style>
.slidev-layout.center {
  @apply h-full grid pt-xs;

  h1 {
    @apply text-6xl font-bold text-center;
  }
}

.bg-primary {
  background-color: var(--zrp-primary);
  h1 {
    color: var(--zrp-background);
  }
}

.bg-secondary {
  background-color: var(--zrp-secondary);
  color: #000 !important;
  h1 {
    color: var(--zrp-background);
  }
}
</style>
