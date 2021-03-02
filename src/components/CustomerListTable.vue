<template>
  <a-table
    :columns="columns"
    :data-source="companies"
    row-key="{record => record.uid}"
  >
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #action="{record}">
      <span>
        <a @click="showModal(record)">Edit</a>
      </span>
    </template>
  </a-table>
</template>
<script>
import { defineComponent, computed, ref } from 'vue';
import ActionTypes from '@/store/action-types';
import MutationTypes from '@/store/mutation-types';
import { useStore } from '@/store';

export default defineComponent({
  setup() {
    const isModalVisible = ref(false);
    const store = useStore();
    const companies = computed(() => store.state.company.company);
    const columns = [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      {
        title: 'Contact E-mail',
        dataIndex: 'contactEmail',
        key: 'contactEmail',
      },
      { title: 'Booking URL', dataIndex: 'bookingPageSlug', key: 'bookingPageSlug' },
      {
        title: 'Last paid',
        key: 'lastPaid',
        dataIndex: 'lastPaid',
        sorter: true,
      },
      {
        title: 'Status',
        key: 'isPublic',
        dataIndex: 'isPublic',
        sorter: true,
        customRender: (record) => String(record.record.isPublic),
      },
      {
        title: 'Action',
        key: 'action',
        slots: { customRender: 'action' },
      },
    ];
    const fetchCompany = async () => {
      store.dispatch(ActionTypes.FETCH_COMPANY);
    };

    fetchCompany();

    function showModal(record) {
      store.commit(MutationTypes.CHANGE_COMPANY_TO_EDIT, record);
      store.commit(MutationTypes.TOGGLE_MODAL, !isModalVisible.value);
    }

    return {
      columns,
      companies,
      fetchCompany,
      isModalVisible,
      showModal,
    };
  },
});
</script>
