import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-reactive-forms-sample';
  sampleForm: FormGroup;
  userForm: FormGroup;
  formSubmitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.buildForm();
    this.setUserCategoryValidators();
  }

  buildForm() {
    this.userForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      username: [null, [Validators.required]],
      userCategory: ['employee'],
      institution: [null],
      company: [null, [Validators.required]],
      salary: [null, [Validators.required]]
    });
  }

  setUserCategoryValidators() {
    const institutionControl = this.userForm.get('institution');
    const companyControl = this.userForm.get('company');
    const salaryControl = this.userForm.get('salary');

    this.userForm.get('userCategory').valueChanges
      .subscribe(userCategory => {
        if (userCategory === 'student') {
          institutionControl.setValidators([Validators.required]);
          companyControl.setValidators(null);
          salaryControl.setValidators(null);
        }

        if (userCategory === 'employee') {
          institutionControl.setValidators(null);
          companyControl.setValidators([Validators.required]);
          salaryControl.setValidators([Validators.required]);
        }

        institutionControl.updateValueAndValidity();
        companyControl.updateValueAndValidity();
        salaryControl.updateValueAndValidity();
      });
  }

  onSubmit(event) {
    event.preventDefault();
    this.formSubmitted = true;
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.userForm.reset();
    }
  }
}
