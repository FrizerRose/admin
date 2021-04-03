<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';

export default defineComponent({
  setup() {
    const store = useStore();
    const fetchCompany = async () => {
      store.dispatch(ActionTypes.FETCH_COMPANY, undefined);
      store.dispatch(ActionTypes.FETCH_FAQ, {});
    };
    fetchCompany();
  },
});
</script>
