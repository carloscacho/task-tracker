import ITask from "./ITask";

export default interface ITracker {
  id: string,
  day: string,
  tasks: ITask[];
  totalTimer: number
}