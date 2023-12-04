import {User} from "./userModel";

export interface UserCategory {
    userCategoryId: number;
    categoryName: string;
    users: User[];
}
