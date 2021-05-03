<template>
  <a-table
    :columns="columns"
    :data-source="payment"
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
import Payment from '@/types/payment';

export default defineComponent({
  setup() {
    const isModalVisible = ref(false);
    const store = useStore();
    const payment = computed(() => store.state.payment.payment);
    console.log('🚀 ~ file: PaymentListTable.vue ~ line 28 ~ setup ~ payment', payment);

    function showModal(record: Payment) {
      store.commit(MutationTypes.CHANGE_PAYMENT_BEING_EDITED, record);
      store.commit(MutationTypes.TOGGLE_MODAL, !isModalVisible.value);
    }

    const columns = [
      { title: 'ID', dataIndex: 'id', key: 'id' },
      { title: 'Date', dataIndex: 'date', key: 'date' },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Company',
        key: 'company.name',
        dataIndex: 'company.name',
      },
      {
        title: 'Action',
        key: 'action',
        slots: { customRender: 'action' },
      },
    ];

    return {
      columns,
      payment,
      isModalVisible,
      showModal,
    };
  },
});
</script>
