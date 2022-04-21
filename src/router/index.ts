import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
//views
import TaskView from "../views/TaskView.vue";
import TrackersView from "../views/TrackersView.vue";
import ProjectsView from "../views/ProjectsView.vue";
import ListProjects from "../views/Projects/ListProjects.vue";
import FormProjects from "../views/Projects/FormProjects.vue";
// rotas
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "TaskView",
    component: TaskView,
  },
  {
    path: "/trackers",
    name: "TrackersView",
    component: TrackersView,
  },
  {
    path: "/projects",
    component: ProjectsView,
    children: [
      {
        path: "",
        name: "ProjectsView",
        component: ListProjects,
      },
      {
        path: "new",
        name: "NewProject",
        component: FormProjects,
      },
      {
        path: "edit/:id",
        name: "EditProject",
        component: FormProjects,
        props: true,
      },
    ],
  },
];
// roteador
const routerPaths = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default routerPaths;
