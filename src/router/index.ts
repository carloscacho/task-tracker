import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
//views
import TaskView from "../views/TaskView.vue";
import ProjectsView from "../views/ProjectsView.vue"
import OldTaskView from '../views/OldTaskView.vue'
// rotas
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "TaskView",
    component: TaskView,
  },
  {
    path: "/projects",
    name: "ProjectsView",
    component: ProjectsView,
  },
  {
    path: "/salved",
    name: "OldTaskView",
    component: OldTaskView,
  },
];
// roteador
const routerPaths = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default routerPaths;
