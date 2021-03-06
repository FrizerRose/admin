<template>
  <a-table
    :columns="columns"
    :data-source="companies"
    row-key="id"
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
<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import ActionTypes from '@/store/action-types';
import MutationTypes from '@/store/mutation-types';
import { useStore } from '@/store';
import Company from '@/types/company';

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
        key: 'id',
        dataIndex: 'lastPaid',
        sorter: true,
      },
      {
        title: 'Status',
        key: 'id',
        dataIndex: 'isPublic',
        sorter: (a: Company, b: Company) => String(a.isPublic).length - String(b.isPublic).length,
        sortDirections: ['descend'],

        customRender: (record: { record: Company }) => String(record.record.isPublic),
      },
      {
        title: 'Action',
        key: 'action',
        slots: { customRender: 'action' },
      },
    ];
    const fetchCompany = async () => {
      store.dispatch(ActionTypes.FETCH_COMPANY, undefined);
    };

    fetchCompany();

    function showModal(record: Company) {
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
