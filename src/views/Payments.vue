<template>
  <common-layout>
    <h3>Payment list</h3>
    <PaymentListTable />
    <PaymentListEdit v-if="paymentBeingEdited" />
  </common-layout>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import CommonLayout from '@/components/layout/CommonLayout.vue'; // @ is an alias to /src
import PaymentListTable from '@/components/PaymentListTable.vue';
import PaymentListEdit from '@/components/PaymentListEdit.vue';
import { useStore } from '@/store';
import MutationTypes from '@/store/mutation-types';

export default defineComponent({
  components: {
    CommonLayout,
    PaymentListTable,
    PaymentListEdit,
  },
  setup() {
    const store = useStore();
    const paymentBeingEdited = computed(() => store.state.payment.paymentBeingEdited);

    function openCreateModal() {
      store.commit(MutationTypes.TOGGLE_CREATE_MODAL, true);
    }

    return { paymentBeingEdited, openCreateModal };
  },
});
</script>
