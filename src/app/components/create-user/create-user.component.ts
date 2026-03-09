import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CreateUserDto } from '../../models/create-user.dto';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  form = this.fb.group(
    {
      userAbbr: ['', Validators.required],
      firstname: ['', Validators.required],
      surname: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordRepeat: ['', Validators.required],
    },
    { validators: this.passwordsMatchValidator },
  );

  passwordsMatchValidator(form: any) {
    const password = form.get('password');
    const passwordRepeat = form.get('passwordRepeat');
    return password && passwordRepeat && password.value === passwordRepeat.value
      ? null
      : { passwordsNotMatching: true };
  }

  createUser(): void {
    if (this.form.valid) {
      this.authService
        .createUser(this.form.value as CreateUserDto)
        .subscribe({
          next: (response) => {
            if (response.success) {
              this.router.navigate(['/dashboard']);
            }
          },
          error: (err) => {
            console.error('Create user failed', err);
          },
        });
    }
  }
}
