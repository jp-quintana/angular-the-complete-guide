import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

type SelectType = 'student' | 'teacher' | 'employee' | 'founder' | 'other';

const equalValues = (v1: string, v2: string) => {
  return (control: AbstractControl) => {
    const val1 = control.get(v1)?.value;
    const val2 = control.get(v2)?.value;

    if (val1 === val2) {
      return null;
    }

    return { valuesNotEqual: true };
  };
};

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    passwords: new FormGroup(
      {
        password: new FormControl('', {
          validators: [Validators.minLength(6), Validators.required],
        }),
        confirmPassword: new FormControl('', {
          validators: [Validators.minLength(6), Validators.required],
        }),
      },
      { validators: [equalValues('password', 'confirmPassword')] }
    ),
    firstName: new FormControl('', { validators: [Validators.required] }),
    lastName: new FormControl('', { validators: [Validators.required] }),
    address: new FormGroup({
      street: new FormControl('', { validators: [Validators.required] }),
      number: new FormControl('', { validators: [Validators.required] }),
      postalCode: new FormControl('', { validators: [Validators.required] }),
      city: new FormControl('', { validators: [Validators.required] }),
    }),
    role: new FormControl<SelectType>('student', {
      validators: [Validators.required],
    }),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    agree: new FormControl(false, { validators: [Validators.required] }),
  });

  onSubmit() {
    if (this.form.invalid) {
      console.log('invalid form');
      return;
    }
    console.log(this.form.value);
  }

  onReset() {
    this.form.reset();
  }
}
