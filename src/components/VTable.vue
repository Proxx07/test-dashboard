<script setup lang="ts">
import {ITableHead} from "@/models/interfaces/tableInterfaces.ts";

const props = defineProps<{
  tableHeaders: ITableHead[]
  tableList: any[]
}>()
</script>

<template>
  <table>
    <thead>
    <tr>
      <th v-for="header in tableHeaders">
        {{ header.name }}
      </th>
    </tr>
    </thead>
    <tbody>

    <tr v-if="tableList.length" v-for="item in tableList">
      <td v-for="header in tableHeaders">
        {{ item[header.value] }}
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