import ITask from './ITask';
import Tracker from './Tracker';
import IProject from './IProjects';

export default interface State {
  data: ITask[];
  totalTimer: number;
  today: string;
  OldTrackers: Tracker[]
  projects: IProject[]
}