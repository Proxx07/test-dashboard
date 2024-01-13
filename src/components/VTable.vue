<script setup lang="ts">
import {ITableHead} from "@/models/interfaces/tableInterfaces.ts";
import EmptyText from "@/components/EmptyText.vue";
import VPreloader from "@/components/UI/VPreloader.vue";

const props = defineProps<{
  tableHeaders: ITableHead[]
  tableList: any[]
  loading: boolean,

  lazyLoading?: boolean
}>()

const emit = defineEmits<{
  (e: 'rowClicked', item: any): void
  (e: 'loadMore'): void
}>()

const rowClickHandler = (item: any) => {
  emit('rowClicked', item)
}

const loadMore = () => {
  emit('loadMore')
}
</script>

<template>
  <table>
    <thead>
    <tr>
      <th v-for="header in tableHeaders" :width="header?.width">
        {{ header.name }}
      </th>
    </tr>
    </thead>
    <tbody>

      <tr v-if="props.loading">
        <td :colspan="tableHeaders.length" align="center" style="height: 10rem;">
          <v-preloader/>
        </td>
      </tr>

      <template v-else-if="tableList.length">
        <tr
          v-for="item in tableList"
          class="table-row"
          @click="rowClickHandler(item)"
        >
          <td v-for="header in tableHeaders" :key="header.value">
            {{ item[header.value] || header?.defaultText || "-" }}
          </td>
        </tr>

        <tr v-if="lazyLoading">
          <td :colspan="tableHeaders.length" style="padding: 0;">
            <v-preloader v-intersection="loadMore" type="line"/>
          </td>
        </tr>
      </template>

      <tr v-else>
        <td :colspan="tableHeaders.length" align="center">
          <empty-text/>
        </td>
      </tr>

    </tbody>

  </table>
</template>

<style lang="scss" scoped>
table {
  text-align: left;
  width: 100%;
  font: var(--font-m);
  border-collapse: separate;
  border-spacing: 0 .6rem;
  &.center {
    text-align: center;
  }

  thead {
    font: var(--font-m-m);
    position: sticky;
    top: 0;
    backdrop-filter: blur(2rem);
    th {
      background: var(--bg-10);
      &:first-child {
        border-radius: var(--radius-m) 0 0 var(--radius-m);
      }
      &:last-child {
        border-radius: 0 var(--radius-m) var(--radius-m) 0;
      }
    }
  }

  tbody {
    .table-row {
      cursor: pointer;
      transition: var(--transition-fast);
      &:hover {
        background: var(--bg-2);
      }

      td {
        background: var(--bg-5);
        padding-top: 1.8rem;
        padding-bottom: 1.8rem;
        &:first-child {
          border-radius: var(--radius-m) 0 0 var(--radius-m);
        }
        &:last-child {
          border-radius: 0 var(--radius-m) var(--radius-m) 0;
        }
      }
    }
  }

  th, td {
    padding: 1.5rem;
    font-weight: inherit;
  }
}
</style>