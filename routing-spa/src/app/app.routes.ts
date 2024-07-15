import { Routes } from '@angular/router';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { TasksComponent } from './tasks/tasks.component';

export const routes: Routes = [
  { path: '', component: NoTaskComponent },
  {
    path: 'user/:userId',
    component: UserTasksComponent,
    children: [{ path: 'tasks', component: TasksComponent }],
  },
];
