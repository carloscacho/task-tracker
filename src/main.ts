import { createApp } from "vue";
import App from "./App.vue";
import {store, key} from './store'

import '@dafcoe/vue-collapsible-panel/dist/vue-collapsible-panel.css'
import "@fortawesome/fontawesome-free/css/all.css";
import routerPaths from './router';



const app = createApp(App);

app.use(store, key);
app.use(routerPaths)
app.mount("#app");
