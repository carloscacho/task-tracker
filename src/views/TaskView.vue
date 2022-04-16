<template>
  <FormTask @onSalveTask="saveTask" />
  <div class="taskList">
    <TaskList
      v-if="!isEmptyTaskList"
      :oldTotalTimer="getTotalTimer"
      :expanded="true"
    >
      <TaskItem v-for="(item, index) in getItens" :key="index" :item="item" @onClickEdit="editItem" />
    </TaskList>
    <card-text v-if="isEmptyTaskList">
      <span class="textMode"> "Não há nenhuma tarefa finalizada hoje" </span>
    </card-text>
  </div>
  <modal-msg
    title="Editar Tarefa ?"
    btnText="Editar"
    :show="showModalEditTask"
    colorModal="is-warning"
    @okClick="okEditModal"
    @cancelClick="cancelEditModal"
  >
    <div class="field">
      <label class="label">Editar tarefa</label>
      <div class="control has-icons-left">
        <input
          class="input is-warning"
          type="text"
          v-model="editTask.description"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-pencil"></i>
        </span>
      </div>
    </div>
  </modal-msg>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { ACQUIRE_TASKS_GET, CHANGE_TASK_PUT, REGISTER_TASK_POST } from "@/store/actions-types";
import { computed, defineComponent } from "vue";
import FormTask from "../components/formView/FormTask.vue";
import TaskItem from "../components/TaskList/Task.vue";
import TaskList from "../components/TaskList/TaskList.vue";

import ModalMsg from "../components/Utils/ModalMsg.vue";

import ITask from "../interfaces/ITask";

export default defineComponent({
  name: "TaskView",
  data(){
    return {
      showModalEditTask: false,
      editTask: {} as ITask
    }
  },
  components: {
    FormTask,
    TaskItem,
    TaskList,
    ModalMsg,
  },
  computed: {
    getTotalTimer() {
      return this.$store.state.totalTimer;
    },
    getOldItens() {
      return this.$store.state.OldTrackers;
    },
    isEmptyTaskList(): boolean {
      return this.tasks.length === 0;
    },
    getItens(): ITask[] {
      return this.tasks.slice(0).reverse();
    },
  },
  methods: {
    saveTask(task: ITask) {
      this.$store.dispatch(REGISTER_TASK_POST, task);
    },
    editItem(item: ITask){
      this.editTask = Object.assign({}, item);
      this.showModalEditTask = true
    },
    okEditModal(){
      this.$store.dispatch(CHANGE_TASK_PUT, this.editTask);
      this.showModalEditTask = false
    },
    cancelEditModal(){
      this.showModalEditTask = false
    }
  },
  setup() {
    const store = useStore();
    store.dispatch(ACQUIRE_TASKS_GET);
    return {
      tasks: computed(() => store.state.task.tasks),
    };
  },
});
</script>

<style scoped>
.taskList {
  padding: 2.5rem;
}
.panel-heading {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}
.panel {
  border: 2px solid var(--bg-secondary);
}

@media only screen and (max-width: 768px) {
  .taskList {
    height: calc(100vh - 52px - 32px - 96px - 144px - 1.5rem);
  }
}
main {
  --bg-primary: rgb(255, 255, 255);
  --bg-secondary: rgb(197, 213, 248);
  --text-primary: rgb(15, 15, 15);
}
main.dark {
  --bg-primary: #2d2d42;
  --bg-secondary: rgb(98, 147, 253);
  --text-primary: rgb(240, 240, 240);
}
.content {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}
.textMode {
  font-weight: bold;
  color: var(--text-primary);
}
div.vcpg {
  --base-color: rgb(98, 147, 253) !important;
  --border-color: rgb(98, 147, 253) !important;
  --bg-color-header: rgb(98, 147, 253) !important;
  --bg-color-header-hover: rgb(98, 147, 253) !important;
  --bg-color-header-active: rgb(98, 147, 253) !important;
  --bg-color-body: var(--bg-primary) !important;
}
</style>
