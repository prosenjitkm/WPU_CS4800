export class User {
  id: number = 0;
  userId: number = 0;
  userName: string = '';
  password: string = ''; // Although it's returned, you'd typically not use this or store it in the frontend after login.
  firstName: string = '';
  lastName: string = '';
  dateOfBirth: string = ''; // You can also use Date type, but then you'd need to convert the string to a Date object.
  gender: string = '';
  email: string = '';
  phone: string = '';
  houseNumber: string = '';
  streetName: string = '';
  city: string = '';
  state: string = '';
  zipCode: string = '';
  country: string = '';
  role: string = '';
  active: boolean = false;
}
