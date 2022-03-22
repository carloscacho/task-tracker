/* eslint-disable */
<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <SideBar />
    </div>
    <div class="column is-three-quarter">
      <FormTask />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "./components/SideBar.vue";
import FormTask from "./components/FormTask.vue"
export default defineComponent({
  name: "App",
  components: {
    SideBar,
    FormTask
  },
});
</script>

<style></style>
