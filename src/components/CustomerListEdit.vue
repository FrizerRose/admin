<template>
  <modal v-if="customer">
    <a-form-item label="Customer name">
      <a-input
        v-model:value="customer.name"
        placeholder="Name"
      />
    </a-form-item>
    <a-form-item label="Customer slug">
      <a-input
        v-model:value="customer.bookingPageSlug"
        placeholder="Name"
      />
    </a-form-item>
    <a-form-item label="Customer email">
      <a-input
        v-model:value="customer.contactEmail"
        placeholder="Name"
      />
    </a-form-item>
    <a-form-item label="Customer status">
      <a-switch v-model:checked="customer.isPublic" />
    </a-form-item>
  </modal>
</template>
<script>
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import Modal from './layout/Modal.vue';

export default defineComponent({
  components: {
    Modal,
  },
  setup() {
    const store = useStore();
    const customer = computed(() => store.state.company.companyBeingEdited);

    return {
      customer,
    };
  },
});
</script>
