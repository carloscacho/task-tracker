import ITask from './ITask';
import ITracker from './ITracker';
import IProject from './IProjects';
import IAlert from './IAlert';

export default interface State {
  data: ITask[];
  totalTimer: number;
  today: string;
  OldTrackers: ITracker[]
  projects: IProject[]
  alerts: IAlert[]
}