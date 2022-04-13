import ITask from './ITask';
import ITracker from './ITracker';
import IProject from './IProjects';
import IAlert from './IAlert';

export default interface State {
  tasks: ITask[]
  projects: IProject[]
  OldTrackers: ITracker[]
  totalTimer: number;
  today: string;
  alerts: IAlert[]
}