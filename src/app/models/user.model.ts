/**
* Ionic Full App  (https://store.enappd.com/product/ionic-full-app-ionic-4-full-app)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/
export class UserModel {
    public id: string;
    public email: string;
    public username?: string;

    constructor(id: string, email: string, username?: string) {
        this.id = id;
        this.email = email;
        this.username = username;
    }

    public static fromDto(user: UserDto): UserModel {
        return new UserModel(user.id, user.email, user.username);
    }

    public toDto(): UserDto {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
        };
    }

    public emptyDto(): UserDto {
        return {
            id: null,
            email: null,
            username: null
        }
    }
}

export interface UserDto {
    id: string;
    username?: string;
    email: string;
}