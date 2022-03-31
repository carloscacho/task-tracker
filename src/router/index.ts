import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
//views
import TaskView from "../views/TaskView.vue";
import ProjectsView from "../views/ProjectsView.vue"
import TrackersView from '../views/TrackersView.vue'
import FormProjects from '../views/Projects/FormProjects.vue'
// rotas
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "TaskView",
    component: TaskView,
  },
  {
    path: "/projects/new",
    name: "NewProject",
    component: FormProjects,
  },
  {
    path: "/projects/:id/edit",
    name: "EditProject",
    component: ProjectsView,
  },
  {
    path: "/projects",
    name: "ProjectsView",
    component: ProjectsView,
  },
  {
    path: "/trackers",
    name: "TrackersView",
    component: TrackersView,
  },
];
// roteador
const routerPaths = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default routerPaths;
