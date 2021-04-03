<template>
  <common-layout>
    <a-button
      type="primary"
      style="float: right; margin-bottom: 3px;"
      @click="openCreateModal()"
    >
      Create new
    </a-button>
    <h3>FAQ list</h3>
    <FaqListTable />
    <FaqListEdit v-if="questionBeingEdited" />
    <FaqListCreate v-if="isCreateModalOpen" />
  </common-layout>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import CommonLayout from '@/components/layout/CommonLayout.vue'; // @ is an alias to /src
import FaqListTable from '@/components/FaqListTable.vue';
import FaqListEdit from '@/components/FaqListEdit.vue';
import FaqListCreate from '@/components/FaqListCreate.vue';
import { useStore } from '@/store';
import MutationTypes from '@/store/mutation-types';

export default defineComponent({
  components: {
    CommonLayout,
    FaqListTable,
    FaqListEdit,
    FaqListCreate,
  },
  setup() {
    const store = useStore();
    const questionBeingEdited = computed(() => store.state.faq.faqBeingEdited);
    const isCreateModalOpen = computed(() => store.state.shared.isCreateModalOpen);

    function openCreateModal() {
      store.commit(MutationTypes.TOGGLE_CREATE_MODAL, true);
    }

    return { questionBeingEdited, isCreateModalOpen, openCreateModal };
  },
});
</script>
