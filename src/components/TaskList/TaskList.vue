<template>
  <vue-collapsible-panel-group base-color="#0d3b66">
    <vue-collapsible-panel>
      <template #title>
        <p class="card-header-title">Atividades do dia: {{ getDate }}</p>
      </template>
      <template #content>
        <slot></slot>
      </template>
    </vue-collapsible-panel>
  </vue-collapsible-panel-group>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  VueCollapsiblePanelGroup,
  VueCollapsiblePanel,
} from "@dafcoe/vue-collapsible-panel";

export default defineComponent({
  name: "TaskList",
  props: {
    oldDate: {
      type: String,
      default: "",
    },
  },
  components: {
    VueCollapsiblePanelGroup,
    VueCollapsiblePanel,
  },
  computed: {
    getDate() {
      return this.oldDate === ""
        ? new Date().toLocaleDateString("en-GB")
        : this.oldDate;
    },
  },
});
</script>
