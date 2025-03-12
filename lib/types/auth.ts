export type IAuth = {
    id: string;
	access_token: string;
	refresh_token: string;
}

export interface IUserRegister {
    account_type: string,
    name: string;
    email_address: string;
    username: string;
    password: string;
    country: string;
    referral_code: string;
    phone_number: string;
}

export interface IUserLogin {
    email_address: string;
    password: string;
}

export interface IVerifyEmail {
    emailAddress: string;
    code: number;
}

export interface IForgotPassword {
    emailAddress: string;
}

export interface IResetPassword {
    emailAddress: string;
    code: string;
    password: string;
    confirmPassword: string;
}