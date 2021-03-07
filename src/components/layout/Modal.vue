<template>
  <a-modal
    v-model:visible="isModalOpen"
    title="Edit Modal"
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
    const isModalOpen = computed(() => store.state.shared.isModalOpen);

    function closeModal() {
      store.commit(MutationTypes.TOGGLE_MODAL, !isModalOpen.value);
      store.commit(MutationTypes.CHANGE_COMPANY_TO_EDIT, null);
    }

    return {
      isModalOpen,
      closeModal,
    };
  },
});
</script>
