import { InjectionToken, Provider } from '@angular/core';

export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

export const TaskStatusOptions: {
  value: 'open' | 'in-progress' | 'done';
  taskStatus: TaskStatus;
  text: string;
}[] = [
  { value: 'open', taskStatus: 'OPEN', text: 'Open' },
  { value: 'in-progress', taskStatus: 'IN_PROGRESS', text: 'In-Progress' },
  { value: 'done', taskStatus: 'DONE', text: 'Completed' },
];

export const TASK_STATUS_OPTIONS = new InjectionToken<typeof TaskStatusOptions>(
  'task-status-options'
);

export const taskStatusOptionsProvider: Provider = {
  provide: TASK_STATUS_OPTIONS,
  useValue: TaskStatusOptions,
};

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
