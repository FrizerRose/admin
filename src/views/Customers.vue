<template>
  <common-layout>
    <h3>Customer list</h3>
    <CustomerListTable />
  </common-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CommonLayout from '@/components/layout/CommonLayout.vue'; // @ is an alias to /src
import CustomerListTable from '@/components/CustomerListTable.vue';

export default defineComponent({
  components: {
    CommonLayout,
    CustomerListTable,
  },
});
</script>
