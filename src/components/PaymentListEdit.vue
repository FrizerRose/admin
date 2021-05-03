<template>
  <modal
    v-if="selectedPayment"
    @ok="save"
  >
    <a-alert
      v-if="requestSent && !status"
      message="There has been an error, please try again"
      type="error"
    />
    <a-form-item label="Date">
      <a-input
        v-model:value="formData.date"
        placeholder="date"
      />
    </a-form-item>
    <a-form-item label="Status (paid, processing, unpaid)">
      <a-input
        v-model:value="formData.status"
        placeholder="status"
      />
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
    const selectedPayment = computed(() => store.state.payment.paymentBeingEdited);
    const requestSent = ref(false);
    const status = ref(false);
    const formData = reactive(JSON.parse(JSON.stringify(selectedPayment.value)));

    async function save() {
      try {
        await store.dispatch(ActionTypes.UPDATE_PAYMENT, formData);
        await store.dispatch(ActionTypes.FETCH_PAYMENT, {});
        requestSent.value = true;
        status.value = true;
        store.commit(MutationTypes.TOGGLE_MODAL, false);
      } catch {
        requestSent.value = true;
        status.value = false;
      }
    }

    return {
      selectedPayment,
      formData,
      save,
      status,
      requestSent,
    };
  },
});
</script>
