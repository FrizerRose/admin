<template>
  <common-layout>
    <h3>Customer list</h3>
    <CustomerListTable />
    <CustomerListEdit v-if="selectedCustomer" />
  </common-layout>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import CommonLayout from '@/components/layout/CommonLayout.vue'; // @ is an alias to /src
import CustomerListTable from '@/components/CustomerListTable.vue';
import CustomerListEdit from '@/components/CustomerListEdit.vue';
import { useStore } from '@/store';

export default defineComponent({
  components: {
    CommonLayout,
    CustomerListTable,
    CustomerListEdit,
  },
  setup() {
    const store = useStore();
    const selectedCustomer = computed(() => store.state.company.companyBeingEdited);

    return { selectedCustomer };
  },
});
</script>
