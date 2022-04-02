import ITask from './ITask';
import Tracker from './Tracker';
import IProject from './IProjects';
import IAlert from './IAlert';

export default interface State {
  data: ITask[];
  totalTimer: number;
  today: string;
  OldTrackers: Tracker[]
  projects: IProject[]
  alerts: IAlert[]
}