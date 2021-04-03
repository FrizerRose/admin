<template>
  <modal
    @ok="save"
  >
    <a-alert
      v-if="requestSent && !status"
      message="There has been an error, please try again"
      type="error"
    />
    <a-form-item label="Question">
      <a-input
        v-model:value="newFaq.question"
        placeholder="question"
      />
    </a-form-item>
    <a-form-item label="Answer">
      <a-input
        v-model:value="newFaq.answer"
        placeholder="answer"
      />
    </a-form-item>
    <a-form-item label="Order">
      <a-input
        v-model:value="newFaq.order"
        placeholder="0"
      />
    </a-form-item>
    <a-form-item label="Category">
      <a-input
        v-model:value="newFaq.category"
        placeholder="Category (Kalendar, Termini, Notifikacije)"
      />
    </a-form-item>
  </modal>
</template>
<script>
import {
  defineComponent, ref,
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
    const requestSent = ref(false);
    const status = ref(false);
    const newFaq = ref({
      question: '', answer: '', category: '', order: 0,
    });

    async function save() {
      try {
        await store.dispatch(ActionTypes.CREATE_FAQ, newFaq.value);
        await store.dispatch(ActionTypes.FETCH_FAQ, {});
        requestSent.value = true;
        status.value = true;
        store.commit(MutationTypes.TOGGLE_CREATE_MODAL, false);
      } catch {
        requestSent.value = true;
        status.value = false;
      }
    }

    return {
      newFaq,
      save,
      status,
      requestSent,
    };
  },
});
</script>
