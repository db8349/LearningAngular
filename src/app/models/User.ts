export class User {
    email: string;

    constructor(email: string) {
        this.email = email;
    }
}

export class AuthUser extends User {
    password: string;

    constructor(email: string, password: string) {
        super(email);
        
        this.password = password;
    }
}