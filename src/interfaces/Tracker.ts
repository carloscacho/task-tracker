import ITask from "./ITask";

export default interface Tracker {
  id: string,
  day: string,
  data: ITask[];
  totalTimer: number
}