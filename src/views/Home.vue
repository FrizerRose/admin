<template>
  <common-layout>
    <div class="home">
      <h3>Dashboard Home</h3>
      <a-row v-if="numberOfCustomers">
        <a-col :span="12">
          <a-statistic
            title="Number of customers"
            :value="numberOfCustomers"
            style="margin-right: 50px"
          />
        </a-col>
      </a-row>
    </div>
  </common-layout>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import CommonLayout from '@/components/layout/CommonLayout.vue'; // @ is an alias to /src
import { useStore } from '@/store';
import Company from '@/types/company';

export default defineComponent({
  components: {
    CommonLayout,
  },
  setup() {
    const store = useStore();
    const numberOfCustomers = computed(() => {
      const stateCompanies = store.state.company.company;
      if (stateCompanies !== null) {
        return Object.keys(stateCompanies as Company).length;
      }
      return 0;
    });
    return { numberOfCustomers };
  },
});
</script>
