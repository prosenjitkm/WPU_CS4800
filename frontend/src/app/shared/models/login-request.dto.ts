import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class LoginRequestDTO {
  loginForm: FormGroup;
  constructor(
    private builder: FormBuilder
      ){
        this.loginForm = this.builder.group({
        username:this.builder.control('', Validators.required),
        password:this.builder.control('', Validators.required)
      });
    }

}
