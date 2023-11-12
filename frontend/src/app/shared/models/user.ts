export class User {
  id: number;
  userId: number = 0;  // Default value, but do reconsider the redundancy with 'id'
  userName: string = '';
  password: string = '';  // Ideally, password should never be sent to frontend. This is just for completeness.
  firstName: string = '';
  lastName: string = '';
  dateOfBirth: Date = new Date();  // Default to current date; adjust if needed
  gender: string = '';
  email: string = '';
  phone: string = '';
  houseNumber: string = '';
  streetName: string = '';
  city: string = '';
  state: string = '';
  zipCode: string = '';
  country: string = '';
  role: number = 2;  // Default role, adjust if needed

  isActive: boolean = false;
}

export enum Roles {
  ADMIN = 'ADMIN',
  BUYER = 'BUYER',
  SELLER = 'SELLER'
}
