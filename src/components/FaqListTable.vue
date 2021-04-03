<template>
  <a-table
    :columns="columns"
    :data-source="faq"
    row-key="id"
  >
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #action="{record}">
      <span>
        <a @click="showModal(record)">Edit</a>
      </span>
    </template>
  </a-table>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import MutationTypes from '@/store/mutation-types';
import { useStore } from '@/store';
import Faq from '@/types/faq';

export default defineComponent({
  setup() {
    const isModalVisible = ref(false);
    const store = useStore();
    const faq = computed(() => store.state.faq.faq);
    console.log('🚀 ~ file: FaqListTable.vue ~ line 28 ~ setup ~ faq', faq);

    function showModal(record: Faq) {
      store.commit(MutationTypes.CHANGE_FAQ_BEING_EDITED, record);
      store.commit(MutationTypes.TOGGLE_MODAL, !isModalVisible.value);
    }

    const columns = [
      { title: 'Question', dataIndex: 'question', key: 'question' },
      {
        title: 'Answer',
        dataIndex: 'answer',
        key: 'answer',
      },
      { title: 'Category', dataIndex: 'category', key: 'category' },
      {
        title: 'Menu order',
        key: 'order',
        dataIndex: 'order',
      },
      {
        title: 'Action',
        key: 'action',
        slots: { customRender: 'action' },
      },
    ];

    return {
      columns,
      faq,
      isModalVisible,
      showModal,
    };
  },
});
</script>
