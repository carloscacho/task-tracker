import ITracker from './ITracker';
import IAlert from './IAlert';
import { ProjectState } from './../store/modules/project/index';
import { TaskState } from './../store/modules/task/index';

export default interface State {
  task: TaskState
  project: ProjectState
  OldTrackers: ITracker[]
  totalTimer: number;
  today: string;
  alerts: IAlert[]
}