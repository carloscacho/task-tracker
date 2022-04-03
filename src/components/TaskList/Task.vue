<template>
  <div class="box has-text-weight-bold">
    <div class="columns">
      <div class="column is-4">
        {{ item.description || "Tarefa sem descrição" }}
      </div>
      <div class="column is-3">
        {{ item.project?.name || "N/D"}}
      </div>
      <div class="column is-3">
        <StopwatchView :timerInSeconds="item.timerInSeconds" />
      </div>
      <div v-if="showBtns" class="column is-flex is-align-items-center is-justify-content-end">
        <button class="button is-warning mr-2">
          <i class="fa fa-pencil"></i>
        </button>
        <button class="button is-danger" @click="showModal">
          <i class="fa fa-trash"></i>
        </button>
      </div>
    </div>
  </div>
  <modal-msg
    title="Deletar tarefa ?"
    content="Você tem certeza que deseja deletar a Tarefa, se sim click em confirmar, se não em cancelar."
    btnText="Confirmar"
    :show="showModalBool"
    colorModal="is-danger"
    @okClick="okModalDel"
    @cancelClick="cancelModalDel"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import StopwatchView from "../formView/StopwatchView.vue";
import ITask from "../../interfaces/ITask";
import ModalMsg from "../Utils/ModalMsg.vue";

export default defineComponent({
  name: "TaskItem",
  data () {
    return {
      showModalBool: false
    }
  },
  components: {
    StopwatchView,
    ModalMsg,
  },
  props: {
    item: {
      type: Object as PropType<ITask>,
    },
    showBtns: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    delete() {
      this.$store.commit("deleteItem", this.item);
    },
    showModal() {
      this.showModalBool = true
    },
    okModalDel() {
      this.delete()
      this.showModalBool = false
    },
    cancelModalDel() {
      this.showModalBool = false
    }
  },
});
</script>

<style scoped>
.box {
  background: var(--bg-secondary);
  color: var(--text-primary);
}
</style>
