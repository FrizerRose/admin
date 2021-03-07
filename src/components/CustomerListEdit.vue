<template>
  <modal
    v-if="selectedCustomer"
    @ok="save"
  >
    <a-alert
      v-if="requestSent && !status"
      message="There has been an error, please"
      type="error"
    />
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
  </modal>
</template>
<script>
import {
  defineComponent, computed, ref, reactive,
} from 'vue';
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';
import MutationTypes from '@/store/mutation-types';
import Modal from './layout/Modal.vue';

export default defineComponent({
  components: {
    Modal,
  },
  setup() {
    const store = useStore();
    const selectedCustomer = computed(() => store.state.company.companyBeingEdited);
    const requestSent = ref(false);
    const status = ref(false);
    const formData = reactive(JSON.parse(JSON.stringify(selectedCustomer.value)));

    async function save() {
      try {
        await store.dispatch(ActionTypes.UPDATE_COMPANY, formData);
        await store.dispatch(ActionTypes.FETCH_COMPANY, null);
        requestSent.value = true;
        status.value = true;
        store.commit(MutationTypes.TOGGLE_MODAL, false);
      } catch {
        requestSent.value = true;
        status.value = false;
      }
    }

    return {
      selectedCustomer,
      formData,
      save,
      status,
      requestSent,
    };
  },
});
</script>
