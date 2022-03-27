<template>
  <div class="mb-2">
    <vue-collapsible-panel-group base-color="#0d3b66" accordion>
      <vue-collapsible-panel :expanded="expanded">
        <template #title>
          <p class="mb-0">
            <strong class="p-0">Atividades do dia: </strong>
            <small class="p-0">{{ getDate }}</small>
          </p>

          <span class="ml-auto mr-4">
            Total
            <stopwatch-view :timerInSeconds="oldTotalTimer" />
          </span>
        </template>
        <template #content>
          <slot></slot>
        </template>
      </vue-collapsible-panel>
    </vue-collapsible-panel-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  VueCollapsiblePanelGroup,
  VueCollapsiblePanel,
} from "@dafcoe/vue-collapsible-panel";

import StopwatchView from "../formView/StopwatchView.vue";

export default defineComponent({
  name: "TaskList",
  props: {
    oldDate: {
      type: String,
      default: "",
    },
    oldTotalTimer: {
      type: Number,
      default: 0,
    },
    expanded: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    VueCollapsiblePanelGroup,
    VueCollapsiblePanel,
    StopwatchView,
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
