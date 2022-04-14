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
        <button class="button is-warning mr-2" @click="holderModalEdit">
          <i class="fa fa-pencil"></i>
        </button>
        <button class="button is-danger" @click="showModalDelete">
          <i class="fa fa-trash"></i>
        </button>
      </div>
    </div>
  </div>
  <modal-msg
    title="Deletar tarefa ?"
    btnText="Confirmar"
    :show="showModalDeleteBool"
    colorModal="is-danger"
    @okClick="okModalDel"
    @cancelClick="cancelModalDel"
  >
  <p>Você tem certeza que deseja deletar a Tarefa, 
    se sim click em confirmar, se não em cancelar.</p>
  </modal-msg>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import StopwatchView from "../formView/StopwatchView.vue";
import ITask from "../../interfaces/ITask";
import ModalMsg from "../Utils/ModalMsg.vue";
import { REMOVE_TASK_DELETE } from "@/store/actions-types";

export default defineComponent({
  name: "TaskItem",
  emits:["onClickEdit"],
  data () {
    return {
      showModalDeleteBool: false
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
    holderModalEdit(){
      this.$emit("onClickEdit", this.item)
    },
    delete() {
      this.$store.dispatch(REMOVE_TASK_DELETE, this.item)
    },
    showModalDelete() {
      this.showModalDeleteBool = true
    },
    okModalDel() {
      this.delete()
      this.showModalDeleteBool = false
    },
    cancelModalDel() {
      this.showModalDeleteBool = false
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
