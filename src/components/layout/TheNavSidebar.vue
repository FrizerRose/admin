<template>
  <a-layout-sider
    v-model:collapsed="isSidebarCollapsed"
    collapsible
    @collapse="toggleSidebar()"
  >
    <img
      class="logo"
      src="@/assets/roselogo.png"
    >
    <a-menu
      v-model:selectedKeys="selectedKeys"
      theme="dark"
      mode="inline"
    >
      <a-menu-item key="1">
        <router-link to="/">
          Home
        </router-link>
      </a-menu-item>
      <a-menu-item key="2">
        <router-link to="/customers">
          Customers
        </router-link>
      </a-menu-item>
      <a-menu-item key="3">
        <span>Settings</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import MutationTypes from '@/store/mutation-types';
import { useStore } from '@/store';

export default defineComponent({
  setup() {
    const store = useStore();
    const isSidebarCollapsed = computed(() => store.state.shared.sidebarCollapsed);

    function toggleSidebar() {
      store.commit(MutationTypes.CHANGE_SIDEBAR_COLLAPSE, !isSidebarCollapsed.value);
    }

    return {
      isSidebarCollapsed,
      toggleSidebar,
    };
  },
});
</script>
