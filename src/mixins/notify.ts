import { AlertTypes } from "@/interfaces/IAlert";
import { store } from "@/store";

export const notifyMixin = {
  methods: {
    notify(alertType: AlertTypes, title: string, text: string): void {
      store.commit("alertShow", {
        alert: {
          id: 0,
          title,
          text,
          alertType,
        },
      });
    },
  },
};
