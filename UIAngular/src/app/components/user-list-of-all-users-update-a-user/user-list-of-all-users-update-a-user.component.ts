/*user-list-of-all-users-update-a-user.component.ts*/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../../service/user/user.service";
import { UserCategory } from '../../models/userCategoryModel';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-list-of-all-users-update-a-user.component.html',
  styleUrls: ['./user-list-of-all-users-update-a-user.component.css']
})
export class UserListOfAllUsersUpdateAUserComponent implements OnInit {
  userCategoryList: UserCategory[] = [];
  updateForm: FormGroup;
  userId!: number;

  constructor(private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
    this.updateForm = this.createFormGroup();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('id')!;
      if (this.userId) {
        this.loadUserData(this.userId);
        this.loadAllUserCategories();
      } else {
        this.toastr.error('Invalid user ID');
        this.router.navigate(['/user']);
      }
    });
  }


  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      userName: ['', Validators.required],
      password: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: [''],
      gender: ['Male'],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      houseNumber: [''],
      streetName: [''],
      city: [''],
      state: [''],
      zipCode: [''],
      country: [''],
      userCategory: [''],
      isActive: [false],
      cart: [''],
      userImageUrl: [''],
      orders: [''],
    });
  }

  private loadUserData(userId: number): void {
    this.userService.getUserByUserId(userId).subscribe(
        response => {
          console.log('User data loaded:', response); // Debugging line

          this.updateForm.setValue({
            id: response.id,
            userName: response.userName,
            password: response.password,
            firstName: response.firstName,
            lastName: response.lastName,
            dateOfBirth: response.dateOfBirth,
            gender: response.gender,
            email: response.email,
            phone: response.phone,
            houseNumber: response.houseNumber,
            streetName: response.streetName,
            city: response.city,
            state: response.state,
            zipCode: response.zipCode,
            country: response.country,
            userCategory: response.userCategory.id,
            isActive: response.isActive,
            cart: response.cart,
            userImageUrl: response.userImageUrl,
            orders: response.orders,
          });
        },
        error => {
          console.error('Error loading user data:', error);
          this.toastr.error('Error loading user data');
        }
    );
  }

  private loadAllUserCategories(): void {
    this.userService.getAllUserCategories().subscribe(
        response => {
          console.log('Received user categories:', response); // Added console log
          this.userCategoryList = response;
        },
        error => {
          console.error('Error fetching user categories:', error);
          this.toastr.error('Error fetching user categories');
        }
    );
  }

  updateUser(): void {
    if (this.updateForm.valid) {
      this.userService.updateUser(this.updateForm.value.id, this.updateForm.value).subscribe(
          response => {
            this.toastr.success('Update Successfully completed.');
          },
          error => {
            console.error('Error updating user:', error);
            this.toastr.error('Error updating user');
          }
      );
    } else {
      this.toastr.warning('Please enter valid data');
    }
  }
}
