<script setup lang="ts">
import Navigation from "@/components/Navigation.vue";
import {useRouter} from "vue-router";

const authToken = localStorage.getItem('token')
const router = useRouter()
if (!authToken) router.push({path: "/auth"})

</script>

<template>
  <div class="app-inner">
    <aside class="sidebar">
      <Navigation/>
    </aside>

    <div class="site-content">
      <slot/>
    </div>
  </div>
</template>


<style>
.app-inner {
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(200px, 200px) auto;
  max-width: 1440px;
  margin: 0 auto;
}

.sidebar {
  padding: 20px 15px 20px 2.4rem;
  border-right: 1px solid var(--LayoutBorderColor);
  width: 100%;
}

.site-content {
  padding: 2.2rem 2.4rem 2.4rem;
  /*display: grid;
  grid-template-columns: 1fr;*/
}
</style>