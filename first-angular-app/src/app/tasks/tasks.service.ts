import { Injectable } from '@angular/core';
import { DUMMY_TASKS } from '../../data/dummy-tasks';
import { NewTask } from './tasks.model';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks = DUMMY_TASKS;

  getUserTasks(userId: string) {
    return this.tasks.filter((task) => task.userId === userId);
  }

  addTask(taskData: NewTask, userId: string) {
    this.tasks.unshift({
      id: new Date().getTime().toString(),
      userId,
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.date,
    });
    console.log(this.tasks);
  }

  removeTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
