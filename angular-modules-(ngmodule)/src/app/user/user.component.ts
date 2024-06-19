import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from './user.model';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent {
  // @Input({ required: true }) avatar!: string;
  // @Input({ required: true }) name!: string;
  // @Input({ required: true }) id!: string;
  @Input({ required: true }) user!: User;
  @Input({ required: true }) selected!: boolean;
  @Output() select = new EventEmitter();

  // avatar = input.required<string>();
  // name = input.required<string>();
  // select = output<string>();

  get imagePath() {
    return '/assets/users/' + this.user.avatar;
  }

  // imagePath = computed(() => '/assets/users/' + this.avatar());

  onSelectUser() {
    this.select.emit(this.user.id);
  }
}
