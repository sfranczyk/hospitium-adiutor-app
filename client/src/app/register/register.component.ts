import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserRegister } from '../_models/user-register.model';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();

  registerForm!: FormGroup;

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      profession: ['']
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => 
      control?.value === (control?.parent as FormGroup)?.controls[matchTo].value ? null : { isMatching: true };
  }

  register() {
    console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
      this.toastr.warning('You filled form incorrect', 'Warning');
      return;
    }
    const {confirmPassword, ...user} = this.registerForm.value;
    this.accountService.register(user).subscribe(response => {
      this.toastr.success('Użytkownik został dodany', 'Sukces!');
      this.cancel();
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    })
  }

  cancel() {
    this.registerForm.reset();
    this.cancelRegister.emit(false);
  }

}
