import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class UserRequestDTO {
  registrationForm: FormGroup;
  constructor( private builder: FormBuilder ){
    this.registrationForm = this.builder.group({
      userName: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
      password: this.builder.control('', Validators.compose([Validators.required])),
      firstName: this.builder.control('', Validators.required),
      lastName: this.builder.control('', Validators.required),
      dateOfBirth: this.builder.control('', Validators.required),
      gender: this.builder.control('male'),
      email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
      phone: this.builder.control('', Validators.compose([Validators.required])),
      houseNumber: this.builder.control('', Validators.compose([Validators.required])),
      streetName: this.builder.control('', Validators.compose([Validators.required])),
      city: this.builder.control('', Validators.compose([Validators.required])),
      state: this.builder.control('', Validators.compose([Validators.required])),
      zipCode: this.builder.control('', Validators.compose([Validators.required])),
      country: this.builder.control('', Validators.compose([Validators.required])),
      userCategory: this.builder.control(0),
      isActive: this.builder.control(false),
    });
  }

}
