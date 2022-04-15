<template>
  <div class="isSmart">
    <HeaderPhone @onChangeModeHeader="changeModeHeader" />
    <div class="likeHeader"></div>
    <div class="timerView">
      <button
        class="button is-success is-fullwidth mr-4 mb-1"
        :class="{ today: isToday }"
        @click="initWorkDay"
      >
        Iniciar o dia
      </button>
      <button
        class="button is-danger is-fullwidth mr-4 mb-1"
        :class="{ today: !isToday }"
        @click="showModalEndDay"
      >
        finalizar o dia
      </button>
      <div :class="{ invisible: !visibilityTotal }">
        <!-- <button class="button is-success mb-2" @click="initDay">Iniciar o dia</button> -->
        <total-timer msg="Contador geral " :total="getTotalTimer" />
      </div>
      <div :class="{ invisible: visibilityTotal }">
        <card-text>
          <span class="textMode">Contador desativado</span>
        </card-text>
      </div>

      <button class="button is-success is-rounded" @click="changeVisibility">
        <span class="icon is-small eyes">
          <i :class="buttonIconEye"></i>
        </span>
      </button>
    </div>
  </div>
  <header>
    <h1 class="isNotSmart">
      <img src="../../assets/logo.png" alt="logo do site" />
    </h1>
    <div class="isNotSmart">
      <i @click="changeModeLight" class="fa-solid fa-sun"></i>
      <i @click="changeMode" :class="buttonIcon"></i>
      <i @click="changeModeDark" class="fa-solid fa-moon"></i>
    </div>
    <div class="isNotSmart">
      <button
        class="button is-success is-fullwidth mr-4 mb-2 mt-2"
        :class="{ today: isToday }"
        @click="initWorkDay"
      >
        Iniciar o dia
      </button>
      <button
        class="button is-danger is-fullwidth mr-4 mb-2 mt-2"
        :class="{ today: !isToday }"
        @click="showModalEndDay"
      >
        finalizar o dia
      </button>
      <total-timer :total="getTotalTimer" />
    </div>
    <nav class="panel mt-4">
      <ul class="panel-smart">
        <li>
          <router-link class="link" to="/">
            <i class="fas fa-tasks"></i>
            Tarefas
          </router-link>
        </li>
        <li>
          <router-link class="link" to="/projects">
            <i class="fa-solid fa-folder-tree"></i>
            Projetos
          </router-link>
        </li>
        <li>
          <router-link class="link" to="/trackers">
            <i class="fa-solid fa-box-archive"></i>
            Trackers
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
  <modal-msg
    title="Finalizar Tracker ?"
    btnText="Confirmar"
    :show="showModalFinish"
    colorModal="is-success"
    @okClick="okModalEndDay"
    @cancelClick="cancelModalEndDay"
  >
  <p>Você tem certeza que deseja finalizar o tracker por hoje? 
    se finalizar não será possível deletar e editar tarefas de hoje</p>
  </modal-msg>
  <modal-msg
    title="Aviso!!!"
    btnText="Fechar"
    :show="showModalAlert"
    colorModal="is-danger"
    @okClick="okModalAlert"
    @cancelClick="cancelModalAlert"
  >
  
   <p>Você iniciou o dia, mas não fez nenhuma atividade, 
     não há como salvar nada, deseja fechar o tracker</p>

  </modal-msg>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TotalTimer from "../formView/TotalTimer.vue";
import HeaderPhone from "./HeaderPhone.vue";
import CardText from "../Utils/CardText.vue";
import { useStore } from "../../store";
import ModalMsg from "../Utils/ModalMsg.vue";
import { CLEAN_ALL, FINISH_WORK_DAY, INIT_WORK_DAY } from "@/store/mutations-types";
import { REGISTER_TRACKER_POST } from "@/store/actions-types";

export default defineComponent({
  name: "SideBar",
  emits: ["onChangeMode"],
  components: {
    TotalTimer,
    HeaderPhone,
    CardText,
    ModalMsg,
  },
  data() {
    return {
      isDarkMode: false,
      visibilityTotal: true,
      store: useStore(),
      showModalFinish: false,
      showModalAlert: false,
    };
  },
  computed: {
    buttonIcon() {
      return !this.isDarkMode
        ? "fa-solid fa-toggle-off"
        : "fa-solid fa-toggle-on";
    },
    buttonIconEye() {
      return this.visibilityTotal ? "fa fa-eye" : "fa fa-eye-slash";
    },
    getTotalTimer() {
      return this.$store.state.totalTimer;
      // return this.total
    },
    isToday() {
      let today = new Date().toLocaleDateString("en-GB");
      return today === this.$store.state.today;
    },
  },
  methods: {
    initWorkDay() {
      this.$store.commit(INIT_WORK_DAY);
    },
    finishWorkDay() {
      this.$store.dispatch(REGISTER_TRACKER_POST);
    },
    changeModeHeader(darkMode: boolean) {
      this.isDarkMode = darkMode;
      this.$emit("onChangeMode", this.isDarkMode);
    },
    changeMode() {
      this.isDarkMode = !this.isDarkMode;
      this.$emit("onChangeMode", this.isDarkMode);
    },
    changeModeDark() {
      this.isDarkMode = true;
      this.$emit("onChangeMode", this.isDarkMode);
    },
    changeModeLight() {
      this.isDarkMode = false;
      this.$emit("onChangeMode", this.isDarkMode);
    },
    changeVisibility() {
      this.visibilityTotal = !this.visibilityTotal;
    },
    showModalEndDay() {
      if (this.$store.state.tasks.length === 0) {
        this.showModalAlert = true;
      } else {
        this.showModalFinish = true;
      }
    },
    okModalEndDay() {
      this.finishWorkDay();
      this.showModalFinish = false;
      this.showModalAlert = false;
    },
    cancelModalEndDay() {
      this.showModalFinish = false;
      this.showModalAlert = false;
    },
    okModalAlert() {
      this.$store.commit(CLEAN_ALL);
      this.showModalAlert = false;
      this.showModalFinish = false;
    },
    cancelModalAlert() {
      this.showModalAlert = false;
      this.showModalFinish = false;
    },
  },
});
</script>

<style scoped>
header {
  padding: 2rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  text-align: center;
}
.invisible {
  visibility: hidden;
  height: 0;
}
.likeHeader {
  padding: 0.5rem;
  background: #0d3b66;
}
.timerView {
  padding-left: 30px;
  padding-right: 30px;
  background: #0d3b66;
}
i {
  font-size: 30px;
  margin: 10px;
  color: aliceblue;
}
.eyes > i {
  font-size: 20px;
  margin: 0;
  padding: 0;
}
.is-rounded {
  position: absolute;
  right: 10px;
  top: 170px;
}
.today {
  visibility: hidden;
  height: 0;
}
.panel li {
  margin: 8px 0;
}
.link {
  color: #fff;
}
.link:hover, i:hover {
  color: rgb(98, 147, 253);
}
.link.router-link-active {
  color: rgb(98, 147, 253);
}
.link > i {
  font-size: 1rem;
  margin: 1rem;
}
@media only screen and (min-width: 768px) {
  .isSmart {
    visibility: hidden;
    height: 0;
  }

  .isNotSmart {
    visibility: visible;
  }

  .panel-smart {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}

@media only screen and (max-width: 768px) {
  header {
    padding: 0.5rem;
    height: auto;
  }
  .panel-smart > li {
    display: inline-flex;
    padding-left: 5px;
    padding-right: 5px;
    flex-direction: column;
    align-items: center;
  }

  .isSmart {
    visibility: visible;
  }

  .isNotSmart {
    visibility: hidden;
    height: 0;
  }
}
</style>
