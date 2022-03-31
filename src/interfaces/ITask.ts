import IProject from './IProjects';

export default interface ITask {
  id:string
  timerInSeconds:number,
  description:string,
  project: IProject
}