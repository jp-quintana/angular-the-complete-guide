import { inject, Injectable, signal } from '@angular/core';

import { Task, TaskStatus } from './task.model';
import { LoggingService } from '../logging.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks = signal<Task[]>([]);
  private loggingService = inject(LoggingService);

  allTasks = this.tasks.asReadonly();

  addTask(taskData: { title: string; description: string }) {
    this.tasks.update((value) => [
      ...value,
      { ...taskData, id: Math.random().toString(), status: 'OPEN' },
    ]);

    this.loggingService.log('ADDED TASK WITH TITLE ' + `"${taskData.title}"`);
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    this.tasks.update((value) =>
      value.map((task) => (task.id === id ? { ...task, status } : task))
    );
  }
}
