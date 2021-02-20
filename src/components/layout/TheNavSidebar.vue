<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    collapsible
  >
    <div class="logo" />
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
        <router-link to="/clients">
          Clients
        </router-link>
      </a-menu-item>
      <a-menu-item key="3">
        <span>Settings</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
