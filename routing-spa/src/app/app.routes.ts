import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {
  resolveTitle,
  resolveUserName,
  UserTasksComponent,
} from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { routes as userRoutes } from './users/users.routes';
import { inject } from '@angular/core';

const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const shouldGetAccess = Math.random();

  if (shouldGetAccess < 0.5) return true;

  return new RedirectCommand(router.parseUrl('/unauthorized'));
};

export const routes: Routes = [
  // { path: '', redirectTo: 'user/u1', pathMatch: 'full' },
  { path: '', component: NoTaskComponent, title: 'No task selected' },
  {
    path: 'user/:userId',
    component: UserTasksComponent,
    children: userRoutes,
    // guards
    // cuando queres renderizar parent pero no child
    // canActivateChild: [],
    canMatch: [dummyCanMatch],
    data: {
      message: 'Hello',
    },
    resolve: {
      username: resolveUserName,
    },
    title: resolveTitle,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
