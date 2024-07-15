import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  private usersService = inject(UsersService);
  // constructor(private usersService: UsersService) {}

  // // new way to access param
  // userId = input.required<string>();

  // username = computed(
  //   () => this.usersService.users.find((u) => u.id === this.userId())?.name
  // );

  // old way to access param
  username = '';
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        this.username =
          this.usersService.users.find((u) => u.id === paramMap.get('userId'))
            ?.name || '';
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
