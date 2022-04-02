<template>
  <div class="alert">
    <article
      class="message"
      :class="getTypeAlert(index)"
      v-for="(alert, index) in getAlerts"
      :key="alert.id"
    >
      <div class="message-header">
        {{ alert.title }}
        <button class="delete" aria-label="delete"></button>
      </div>
      <div class="message-body">
        {{ alert.text }}
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { AlertTypes } from "@/interfaces/IAlert";
import { defineComponent } from "vue";

export default defineComponent({
  name: "AlertMsg",
  computed: {
    getAlerts() {
      return this.$store.state.alerts;
    },
  },
  methods: {
    getTypeAlert(pos:number) {
      let tipo = this.$store.state.alerts[pos].alertType;
      switch (tipo) {
        case AlertTypes.SUCCESS:
          return "is-success";
        case AlertTypes.WARNING:
          return "is-warning";
        case AlertTypes.DANGER:
          return "is-danger";
      }
    },
  },
});
</script>


<style scoped>
.alert {
  position: absolute;
  right: 0;
  margin-top: 100px;
  width: 300px;
  z-index: 100;
}
</style>