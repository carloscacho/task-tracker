export enum AlertTypes {
  SUCCESS,
  WARNING,
  DANGER
}

export default interface IAlert {
  id: number, 
  title: string,
  text: string,
  alertType: AlertTypes,
}