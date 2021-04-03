<template>
  <a-modal
    v-model:visible="isModalOpen"
    title="Modal"
    @cancel="closeModal()"
  >
    <slot />
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import MutationTypes from '@/store/mutation-types';
import { useStore } from '@/store';

export default defineComponent({
  setup() {
    const store = useStore();
    const isModalOpen = computed(() => store.state.shared.isModalOpen || store.state.shared.isCreateModalOpen);

    function closeModal() {
      store.commit(MutationTypes.TOGGLE_MODAL, !isModalOpen.value);
      store.commit(MutationTypes.TOGGLE_CREATE_MODAL, !isModalOpen.value);
      store.commit(MutationTypes.CHANGE_COMPANY_TO_EDIT, null);
    }

    return {
      isModalOpen,
      closeModal,
    };
  },
});
</script>
