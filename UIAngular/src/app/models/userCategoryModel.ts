/*userCategoryModel.ts*/

import {User} from "./userModel";

export interface UserCategory {
    id: number;
    userCategoryName: string;
    users: User[]; // This expects an array of User objects
}
