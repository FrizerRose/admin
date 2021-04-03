<template>
  <modal
    v-if="selectedQuestion"
    @ok="save"
  >
    <a-alert
      v-if="requestSent && !status"
      message="There has been an error, please try again"
      type="error"
    />
    <a-form-item label="Question">
      <a-input
        v-model:value="formData.question"
        placeholder="question"
      />
    </a-form-item>
    <a-form-item label="Answer">
      <a-input
        v-model:value="formData.answer"
        placeholder="answer"
      />
    </a-form-item>
    <a-form-item label="Order">
      <a-input
        v-model:value="formData.order"
        placeholder="0"
      />
    </a-form-item>
    <a-form-item label="Category">
      <a-input
        v-model:value="formData.category"
        placeholder="Category (Kalendar, Termini, Notifikacije)"
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
    const selectedQuestion = computed(() => store.state.faq.faqBeingEdited);
    const requestSent = ref(false);
    const status = ref(false);
    const formData = reactive(JSON.parse(JSON.stringify(selectedQuestion.value)));

    async function save() {
      try {
        await store.dispatch(ActionTypes.UPDATE_FAQ, formData);
        await store.dispatch(ActionTypes.FETCH_FAQ, {});
        requestSent.value = true;
        status.value = true;
        store.commit(MutationTypes.TOGGLE_MODAL, false);
      } catch {
        requestSent.value = true;
        status.value = false;
      }
    }

    return {
      selectedQuestion,
      formData,
      save,
      status,
      requestSent,
    };
  },
});
</script>
