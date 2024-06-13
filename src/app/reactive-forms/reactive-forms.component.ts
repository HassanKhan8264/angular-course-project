import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reactive-forms',

  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {
  genders = ['male', 'female'];
  restrictedNames = ['Leela'];
  signUpForm: UntypedFormGroup;
  constructor() { }

  get hobbyControls() {
    return (<UntypedFormArray>this.signUpForm.get('hobbies')).controls;
  }

  ngOnInit(): void {
    this.signUpForm = new UntypedFormGroup({
      'userData': new UntypedFormGroup({
        'username': new UntypedFormControl(null, [Validators.required, this.isRestrictedNames.bind(this)]),
        'email': new UntypedFormControl(null, [Validators.required, Validators.email], [this.isRestrictedEmails]),
      }),

      'gender': new UntypedFormControl('female'),
      'hobbies': new UntypedFormArray([])
    });

    this.signUpForm.statusChanges.subscribe(value => {
      console.log(value);
    });

    this.signUpForm.patchValue({
      userData: {
        username: 'Hai Leela',
      },
      gender: 'male',
      hobbies: []
    })
  }

  onSubmit() {
    console.log(this.signUpForm);
    this.signUpForm.reset();
  }

  isRestrictedNames(control: UntypedFormControl): { [s: string]: boolean } {
    if (this.restrictedNames.includes(control.value)) {
      return { nameIsRestricted: true };
    }
    return null;
  }

  isRestrictedEmails(control: UntypedFormControl): Promise<any> | Observable<any> {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailIsRestricted: true });
        } else {
          resolve(null);
        }
      }, 2000)
    });
    return promise;

  }



  onAddHobby() {
    const control = new UntypedFormControl(null, [Validators.required]);
    (<UntypedFormArray>this.signUpForm.get('hobbies')).push(control);
  }

}
