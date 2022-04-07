import { AlertTypes } from '@/interfaces/IAlert';
import {store} from '@/store'
import { SHOW_ALERT } from './../store/mutations-types';

 export const notifyMixin = {
   methods: {
    notify(alertType: AlertTypes, title: string, text: string):void {
      store.commit(SHOW_ALERT, {
        alert: {
          id: 0,
          title,
          text,
          alertType,
        },
      });
    },
   }
 }