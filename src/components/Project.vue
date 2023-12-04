<script setup lang="ts">
import {projectValues} from "@/models/staticContent/projectContent.ts";
import arrowIcon from "@/assets/icons/arrow.svg?raw"
// interface ITestProject {
//   logo: string,
//   name: string,
//   site: string
// }

const props = defineProps<{
  project: any
}>()

</script>

<template>
  <div class="project">
    <button class="arrow" v-html="arrowIcon"/>
    <div class="project__field" v-for="field in projectValues" :key="field.value">
      <div class="logo" v-if="field.value === 'logo'">
        <img v-if="props.project[field.value]" :src="project[field.value]" :alt="project[field.name]">
        <template v-else>
          {{field.value}}
        </template>
      </div>
      <div v-else class="project__info">
        <div class="project__info-title">
          {{field.name}}
        </div>
        <div class="project__info-body">
          <a v-if="project[field.value].includes('http')" :href="project[field.value]" target="_blank" rel="nofollow">
            {{project[field.value].replace(/^https?:\/\//, '')}}
          </a>
          <span v-else>
            {{project[field.value]}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.project {
  border-radius: .8rem;
  padding: 1.6rem 1.6rem 3.4rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: var(--WhiteBg);
  position: relative;
  .arrow {
    cursor: pointer;
    border: 0;
    width: 30px;
    height: 30px;
    position: absolute;
    right: 1.6rem;
    top: 1.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__field {
    .logo {
      display: inline-flex;
      width: 7rem;
      height: 7rem;
      border-radius: 50%;
      text-align: center;
      justify-content: center;
      align-items: center;
      border: 1px solid var(--ContentBorderColor);
      text-transform: uppercase;
      margin-bottom: .6rem;
      font-weight: 600;
    }
  }

  &__info {
    &-title {
      color: var(--TextColorGray);
      font-size: 1.3rem;
      line-height: 1.56;
      opacity: 0.44;
    }

    &-body {
      color: var(--AccentColor);
      line-height: 1.2;
      font-weight: 600;
      font-size: 1.5rem;

      > * {
        display: inline-block;
        padding: .6rem 0;
        text-decoration: none;
        color: inherit;
      }
    }
  }
}
</style>