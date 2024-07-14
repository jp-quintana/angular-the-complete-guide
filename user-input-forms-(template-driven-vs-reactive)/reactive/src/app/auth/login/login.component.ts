import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, of } from 'rxjs';

const mustContainQuestionMark = (control: AbstractControl) => {
  if (control.value.includes('?')) return null;

  return { doesNotContainQuestionMark: true };
};

const emailIsUnique = (control: AbstractControl) => {
  if (control.value !== 'test@example.com') return of(null);

  return of({ emailNotUnique: true });
};

// populate w/saved value alt 1
const savedForm = localStorage.getItem('email');
let initialEmailValue = '';

if (savedForm) initialEmailValue = JSON.parse(savedForm).email;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  destroyRef = inject(DestroyRef);

  form = new FormGroup({
    email: new FormControl(initialEmailValue, {
      validators: [Validators.email, Validators.required],
      asyncValidators: [emailIsUnique],
    }),
    password: new FormControl('', {
      validators: [
        Validators.minLength(6),
        Validators.required,
        mustContainQuestionMark,
      ],
    }),
  });

  get emailIsInvalid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }

  get passwordIsInvalid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }

  ngOnInit(): void {
    // populate w/saved value alt 2
    // const savedForm = localStorage.getItem('email');

    // if (savedForm) this.form.patchValue({ email: JSON.parse(savedForm).email });

    const subscription = this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe({
        next: (value) =>
          localStorage.setItem('email', JSON.stringify({ email: value.email })),
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSubmit() {
    console.log(this.form.value.email);
  }
}
