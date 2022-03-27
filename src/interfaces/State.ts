import ITask from './ITask';
import Tracker from './Tracker';

export default interface State {
  data: ITask[];
  totalTimer: number;
  today: string;
  OldTrackers: Tracker[]
}