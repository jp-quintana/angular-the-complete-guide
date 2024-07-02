import { Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks = signal<Task[]>([]);

  addTask(details: { title: string; description: string }) {
    const t = {
      ...details,
      status: 'OPEN' as TaskStatus,
      id: Math.random().toString(),
    };

    const updatedTasks = this.tasks();
    updatedTasks.push(t);

    this.tasks.set(updatedTasks);
  }

  updateTask(id: string, status: TaskStatus) {
    const updatedTasks = this.tasks().map((task) =>
      task.id === id ? { ...task, status } : task
    );

    this.tasks.set(updatedTasks);
  }
}
