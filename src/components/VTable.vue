<script setup lang="ts">
import {ITableHead} from "@/models/interfaces/tableInterfaces.ts";
import EmptyText from "@/components/EmptyText.vue";
import VPreloader from "@/components/UI/VPreloader.vue";

const props = defineProps<{
  tableHeaders: ITableHead[]
  tableList: any[]
  loading: boolean,
}>()

const emit = defineEmits<{
  (e: 'rowClicked', item: any): void
}>()

const rowClickHandler = (item: any) => {
  emit('rowClicked', item)
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
        <td :colspan="tableHeaders.length" align="center">
          <v-preloader/>
        </td>
      </tr>

      <tr
        v-else-if="tableList.length"
        v-for="item in tableList"
        class="table-row"
        @click="rowClickHandler(item)"
      >
        <td v-for="header in tableHeaders">
          {{ item[header.value] || "-" }}
        </td>
      </tr>

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
  font-size: 1.3rem;
  font-weight: normal;
  text-align: left;
  width: 100%;
  border-collapse: collapse;
  border-radius: .4rem .4rem 0 0;
  overflow: hidden;
  line-height: 1.7;

  &.center {
    text-align: center;
  }

  thead {
    background: var(--VioletTransparent);
    font-weight: 600;
  }

  tbody {
    background: var(--WhiteBg);

    & > tr {
      border-bottom: 1px solid var(--ContentBorderColor);

      &.table-row {
        cursor: pointer;
        transition: all .3s;
        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
  }

  th {
    padding: 1.6rem;
  }

  td {
    padding: 1.5rem;
  }
}
</style>