<template>
  <modal v-if="customer">
    <a-form-item label="Customer name">
      <a-input
        v-model:value="formData.name"
        placeholder="Name"
      />
    </a-form-item>
    <a-form-item label="Customer slug">
      <a-input
        v-model:value="formData.bookingPageSlug"
        placeholder="Name"
      />
    </a-form-item>
    <a-form-item label="Customer email">
      <a-input
        v-model:value="formData.contactEmail"
        placeholder="Name"
      />
    </a-form-item>
    <a-form-item label="Customer status">
      <a-switch v-model:checked="formData.isPublic" />
    </a-form-item>
    <button @click="testfunc()" />
  </modal>
</template>
<script>
import {
  defineComponent, computed, ref, reactive,
} from 'vue';
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';
import Modal from './layout/Modal.vue';

export default defineComponent({
  components: {
    Modal,
  },
  setup() {
    const store = useStore();
    const customer = computed(() => store.state.company.companyBeingEdited);
    const requestSent = ref(false);
    const status = ref(false);
    const formData = reactive(JSON.parse(JSON.stringify(customer.value)));

    function testfunc() {
      console.log(formData);
    }
    // TODO: logo
    async function save() {
      try {
        await store.dispatch(ActionTypes.UPDATE_COMPANY, customer);
        requestSent.value = true;
        status.value = true;
      } catch {
        requestSent.value = true;
        status.value = false;
      }
    }
    return {
      customer,
      save,
      formData,
      status,
      requestSent,
      testfunc,
    };
  },
});
</script>
