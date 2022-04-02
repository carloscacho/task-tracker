import ITask from "./ITask";

export default interface ITracker {
  id: string,
  day: string,
  data: ITask[];
  totalTimer: number
}