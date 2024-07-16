import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { UsersService } from '../users.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  // private usersService = inject(UsersService);
  // constructor(private usersService: UsersService) {}
  // // access param via withComponentInputBinding -------------------------------
  // userId = input.required<string>();
  // username = computed(
  //   () => this.usersService.users.find((u) => u.id === this.userId())?.name
  // );
  // access param via resolvefn -------------------------------
  username = input.required<string>();
  message = input.required<string>();

  // // access param via ActivatedRoute -------------------------------
  // username = '';
  // private activatedRoute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);
  // ngOnInit() {
  //   // no reactive, no corre devuelta si cambia el userId
  //   console.log(this.activatedRoute.snapshot.paramMap.get('userId'));
  //   // reactive
  //   const subscription = this.activatedRoute.paramMap.subscribe({
  //     next: (paramMap) => {
  //       this.username =
  //         this.usersService.users.find((u) => u.id === paramMap.get('userId'))
  //           ?.name || '';
  //     },
  //   });
  //   this.destroyRef.onDestroy(() => subscription.unsubscribe());
  // }

  // access param via ActivatedRoute and activatedRoute -------------------------------
  // ngOnInit(): void {
  //   this.activatedRoute.data.subscribe({
  //     next: (data) => console.log(data),
  //   });
  // }
}

// // access param via resolvefn -------------------------------
// si bien se usan snapshots, la funcion resolve corre si los params cambian. si cambian los query params no, por eso tenes que agregar opcion runGuardsAndResolvers en routes
export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  _routerState: RouterStateSnapshot
) => {
  const usersService = inject(UsersService);
  const username =
    usersService.users.find(
      (u) => u.id === activatedRoute.paramMap.get('userId')
    )?.name || '';

  return username;
};

export const resolveTitle: ResolveFn<string> = (
  activatedRoute,
  _routerState
) => {
  return resolveUserName(activatedRoute, _routerState) + "'s Tasks";
};
