<script setup lang="ts">
import {ref, computed} from "vue";
import {LocationQueryValue, useRouter} from "vue-router";
const route = useRouter();

const props = defineProps<{
  totalPages: string | number,
  modelValue?: LocationQueryValue
}>()

const emit = defineEmits<{
  (e: 'pageChange', page: string | number): void
  (e: 'update:modelValue', page: string) : void
}>()

const activePage = ref(Number(route.currentRoute.value.query?.page) || 1)
const pagesArray = Array.from({length: +props.totalPages}, (_, i) => i + 1)

const visibleItems = 3
const sideItems = Math.floor(visibleItems / 2)
const filteredPages = (current = activePage.value): (number | undefined)[] => pagesArray.map(page => {
  if (current <= visibleItems || current > +props.totalPages - visibleItems) {
    if (page <= visibleItems || page > +props.totalPages - visibleItems) return page
  } else {
    if (page === 1) return page
    if (page === +props.totalPages) return page
    if ((page <= current && page >= current - sideItems) || (page > current && page <= current + sideItems)) return page
  }
})

const renderingPages = computed(() => {
  const array = filteredPages()
  const result: (string | number)[] = [];
  array.forEach((item, index) => {
    if (item === undefined) {
      const nextItemVal = array[index + 1];
      if (nextItemVal !== undefined) {
        result.push("...");
      }
    } else {
      result.push(item);
    }
  });

  return result
})

const changePage = (page: number) => {
  route.push({query: {page}})
  activePage.value = page
  emit('update:modelValue', `${page}`)
  emit('pageChange', page)
}

</script>

<template>
  <div class="pagination" v-if="+totalPages">
    <button class="prev" :disabled="activePage == 1" @click="changePage(+activePage - 1)"/>

    <template v-for="page in renderingPages">
      <button v-if="Number.isInteger(page)" :class="{active: page == activePage}" :disabled="page == activePage" @click="changePage(+page)">
        {{ page }}
      </button>
      <span v-else class="separator"> {{page}} </span>
    </template>

    <button class="next" :disabled="activePage == totalPages" @click="changePage(+activePage + 1)"/>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  flex-wrap: wrap;
  button {
    cursor: pointer;
    font-size: 1.3rem;
    line-height: 1.7;
    padding: .9rem 1.5rem .8rem;
    border-radius: 5rem;
    color: var(--TextColorAccent);
    border: 0;
    text-align: center;
    min-width: 5rem;
    background: var(--white);
    min-height: 3.9rem;
    transition: all 0.3s;

    &.active {
      background: var(--VioletTransparent);
    }

    &.prev, &.next {
      background-color: transparent;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.7068 5.29279C12.8943 5.48031 12.9996 5.73462 12.9996 5.99979C12.9996 6.26495 12.8943 6.51926 12.7068 6.70679L9.41379 9.99979L12.7068 13.2928C12.8889 13.4814 12.9897 13.734 12.9875 13.9962C12.9852 14.2584 12.88 14.5092 12.6946 14.6946C12.5092 14.88 12.2584 14.9852 11.9962 14.9875C11.734 14.9897 11.4814 14.8889 11.2928 14.7068L7.29279 10.7068C7.10532 10.5193 7 10.265 7 9.99979C7 9.73462 7.10532 9.48031 7.29279 9.29279L11.2928 5.29279C11.4803 5.10532 11.7346 5 11.9998 5C12.265 5 12.5193 5.10532 12.7068 5.29279Z' fill='%23232325'/%3E%3C/svg%3E");
      background-position: 50%;
      background-repeat: no-repeat;
    }

    &.next {
      transform: rotateY(180deg);
    }
  }

  .separator {
    font-size: 1.3rem;
    line-height: 1.7;
    padding: .9rem 1.5rem .8rem;
    color: var(--TextColorAccent);
    text-align: center;
    min-width: 5rem;
    min-height: 3.9rem;
  }
}
</style>