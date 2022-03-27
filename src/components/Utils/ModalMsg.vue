<template>
  <div class="modal" :class="{ 'is-active': show }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button class="delete" aria-label="close" @click="cancelClick"></button>
      </header>
      <section class="modal-card-body">
        {{ content }}
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button class="button" @click="cancelClick">Cancel</button>
        <button class="button" :class="colorModal" @click="okClick">
          {{ btnText }}
        </button>
      </footer>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ModalMsg",
  emits: ["okClick", "cancelClick"],
  // data() {
  //   return {
  //     isShow: false,
  //   };
  // },
  props: {
    content: {
      type: String,
      default: "",
    },
    btnText: {
      type: String,
      default: "OK",
    },
    title: {
      type: String,
      default: "",
    },
    colorModal: {
      type: String,
      default: "",
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    okClick() {
      this.$emit("okClick");
    },
    cancelClick() {
      this.$emit("cancelClick");
    },
  },
});
</script>
