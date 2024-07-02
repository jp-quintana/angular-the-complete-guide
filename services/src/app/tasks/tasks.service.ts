import { Injectable, signal } from '@angular/core';

import { Task, TaskStatus } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks = signal<Task[]>([]);

  allTasks = this.tasks.asReadonly();

  addTask(taskData: { title: string; description: string }) {
    this.tasks.update((value) => [
      ...value,
      { ...taskData, id: Math.random().toString(), status: 'OPEN' },
    ]);
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    this.tasks.update((value) =>
      value.map((task) => (task.id === id ? { ...task, status } : task))
    );
  }
}
