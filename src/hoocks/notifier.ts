import { AlertTypes } from '@/interfaces/IAlert';
import { store } from '@/store';
import { SHOW_ALERT } from './../store/mutations-types';


type Notifier = {
  notify:(alertType:AlertTypes, title: string, text: string) => void
}

export default () : Notifier => {
  const notify = (alertType: AlertTypes, title: string, text: string):void => {
    store.commit(SHOW_ALERT, {
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