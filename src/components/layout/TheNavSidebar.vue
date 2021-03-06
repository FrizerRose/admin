<template>
  <a-layout-sider
    v-model:collapsed="isSidebarCollapsed"
    collapsible
    width="250"
    @collapse="toggleSidebar()"
  >
    <img
      v-if="!isSidebarCollapsed"
      class="logo"
      src="@/assets/roselogo.png"
    >
    <a-menu
      v-model:selectedKeys="selectedKeys"
      theme="dark"
      mode="inline"
      @click="handleItemClick"
    >
      <a-menu-item key="Home">
        <router-link to="/">
          <home-outlined />
          <span>Home</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="Customers">
        <router-link to="/customers">
          <user-outlined />
          <span>Customers</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="Settings">
        <tool-outlined />
        <span>Settings</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import MutationTypes from '@/store/mutation-types';
import { useStore } from '@/store';
import { HomeOutlined, UserOutlined, ToolOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  components: {
    HomeOutlined,
    UserOutlined,
    ToolOutlined,
  },
  setup() {
    const store = useStore();
    const router = useRoute();
    const isSidebarCollapsed = computed(() => store.state.shared.sidebarCollapsed);
    const currentRoute = router.name as string;

    const selectedKeys = ref<string[]>([currentRoute]);
    function toggleSidebar() {
      store.commit(MutationTypes.CHANGE_SIDEBAR_COLLAPSE, !isSidebarCollapsed.value);
    }

    function handleItemClick(e: Event) {
      console.log(e);
      // selectedKeys.value = e.keyPath;
    }

    return {
      isSidebarCollapsed,
      toggleSidebar,
      selectedKeys,
      handleItemClick,
    };
  },
});
</script>
