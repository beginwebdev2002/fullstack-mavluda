import { Schema, email, minLength, required } from "@angular/forms/signals";


export const SIGNIN_FORM_INITIAL_VALUES = {
    email: "",
    password: "",
    rememberMe: false,
}

export const SIGNUP_FORM_INITIAL_VALUES = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "admin@mavluda.beauty",
    password: "password123",
    rememberMe: false,
}


export function signinFormSchema(schema): void{
    required(schema.email);
    email(schema.email);
    required(schema.password);
    minLength(schema.password, 6);
}

export function signupFormSchema(schema): void {
    required(schema.firstName);
    required(schema.lastName);
    required(schema.phone);
    required(schema.email);
    email(schema.email);
    required(schema.password);
    minLength(schema.password, 8);
}

export type SigninFormModel = typeof SIGNIN_FORM_INITIAL_VALUES;
export type SignupFormModel = typeof SIGNUP_FORM_INITIAL_VALUES;