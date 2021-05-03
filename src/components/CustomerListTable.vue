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
import MutationTypes from '@/store/mutation-types';
import { useStore } from '@/store';
import Company from '@/types/company';

export default defineComponent({
  setup() {
    const isModalVisible = ref(false);
    const store = useStore();
    const companies = computed(() => store.state.company.company);

    // function dateRender(record: Company) {
    //   if (record.payments[0] !== undefined) {
    //     return record.payments[0].date;
    //   }
    //   return '-';
    // }

    function showModal(record: Company) {
      store.commit(MutationTypes.CHANGE_COMPANY_TO_EDIT, record);
      store.commit(MutationTypes.TOGGLE_MODAL, !isModalVisible.value);
    }

    const columns = [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      {
        title: 'Contact E-mail',
        dataIndex: 'contactEmail',
        key: 'contactEmail',
      },
      { title: 'Booking URL', dataIndex: 'bookingPageSlug', key: 'bookingPageSlug' },
      // {
      //   title: 'Last paid',
      //   key: 'payments',
      //   dataIndex: 'payments',
      //   // customRender: (record: { record: Company }) => dateRender(record.record),
      //   filters: [{ text: 'Unpaid', value: '' }],
      //   onFilter: (value: string, record: Company) => {
      //     if (record.payments[0] !== undefined) {
      //       const date: Date = new Date(record.payments[0].date);
      //       const currentDay: Date = new Date();
      //       date.setDate(date.getDate() + 30);
      //       return currentDay > date;
      //     }
      //     return record.payments.length === 0;
      //   },
      //   sortDirections: ['descend'],
      //   sorter: (a: Company, b: Company) => {
      //     let dateA: string;
      //     let dateB: string;
      //     if (a.payments[0] === undefined) {
      //       dateA = '1970-01-01';
      //     } else {
      //       dateA = a.payments[0].date;
      //     }
      //     if (b.payments[0] === undefined) {
      //       dateB = '1970-01-01';
      //     } else {
      //       dateB = b.payments[0].date;
      //     }
      //     return new Date(dateA).getTime() - new Date(dateB).getTime();
      //   },
      // },
      {
        title: 'Status',
        key: 'id',
        dataIndex: 'isPublic',
        filters: [{ text: 'Inactive', value: false }],
        sorter: (a: Company, b: Company) => String(a.isPublic).length - String(b.isPublic).length,
        sortDirections: ['descend'],
        customRender: (record: { record: Company }) => String(record.record.isPublic),
        onFilter: (value: boolean, record: Company) => record.isPublic === value,
      },
      {
        title: 'Action',
        key: 'action',
        slots: { customRender: 'action' },
      },
    ];

    return {
      columns,
      companies,
      isModalVisible,
      showModal,
    };
  },
});
</script>
