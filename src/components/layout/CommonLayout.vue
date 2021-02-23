<template>
  <a-layout style="min-height: 100vh">
    <TheNavSidebar />
    <a-layout>
      <a-layout-content style="margin: 0 16px">
        <div :style="{ padding: '24px', marginTop: '40px', background: '#fff', minHeight: '360px' }">
          <slot />
        </div>
      </a-layout-content>
      <TheFooter />
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheNavSidebar from './TheNavSidebar.vue';
import TheFooter from './TheFooter.vue';

export default defineComponent({
  components: {
    TheNavSidebar,
    TheFooter,
  },
});
</script>

<style scoped lang="scss">
.example {
  color: grey;
}
</style>
