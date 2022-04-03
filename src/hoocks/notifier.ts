import { AlertTypes } from '@/interfaces/IAlert';
import { store } from '@/store';


type Notifier = {
  notify:(alertType:AlertTypes, title: string, text: string) => void
}

export default () : Notifier => {
  const notify = (alertType: AlertTypes, title: string, text: string):void => {
    store.commit("alertShow", {
      alert: {
        id: 0,
        title,
        text,
        alertType,
      },
    });
  }
  return {
    notify
  }
}